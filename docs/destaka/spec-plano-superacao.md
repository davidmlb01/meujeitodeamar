# Spec: Plano de Superacao

**Projeto:** Destaka
**Autor:** Orion (AIOX Master)
**Data:** 2026-09-28
**Status:** Draft, aguardando aprovacao David
**Depende de:** spec-competitive-optimization (implementada)

---

## 1. Problema

O Destaka ja sabe o score do assinante, conhece os 3 concorrentes, e identifica gaps competitivos. Porem, o profissional recebe tudo isso como informacao avulsa: "seu score e 23", "concorrente tem 45 fotos", "faltam categorias". Nao existe uma resposta para a pergunta mais importante: **"o que eu faco primeiro para superar meus concorrentes?"**

O resultado: o profissional ve os dados, nao sabe por onde comecar, e nao volta ao dashboard.

---

## 2. Solucao

Gerar automaticamente um **Plano de Superacao** com timeline semanal que diz exatamente o que fazer, em que ordem, com ganho estimado por etapa. O plano mistura acoes automaticas (sistema executa) e acoes manuais (profissional faz, sistema cobra).

O profissional abre o dashboard e ve:

```
Plano de Superacao (60 dias)

Seu score: 23/100
Concorrente mais forte: 78/100
Meta: 75/100

Semana 1 ✅  Categorias + descricao + servicos          +15 pts  [automatico]
Semana 2 ✅  Primeiro post semanal publicado             +10 pts  [automatico]
Semana 3 🔵  Adicione 10 fotos do consultorio            +10 pts  [voce]
Semana 4     Responder avaliacoes + pedir novos reviews   +8 pts  [automatico]
Semana 5     Adicionar atributos do estabelecimento       +5 pts  [automatico]
...

Score projetado semana 8: 75/100 (competitivo)
```

---

## 3. Arquitetura

### 3.1 Fluxo

```
scores (DB)                    competitive_analyses (DB)
    |                                  |
    v                                  v
+-----------------------------------------------+
| PlanGenerator                                 |
| (src/lib/plan/plan-generator.ts)              |
| - calcula gap por componente do score          |
| - ordena acoes por impacto/facilidade          |
| - distribui em semanas                         |
| - marca automatico vs manual                   |
+-----------------------------------------------+
    |
    v
surpass_plans (DB, nova tabela)
    |
    v
GET /api/plan/surpass
    |
    v
SurpassPlanCard (UI, dashboard principal)
```

### 3.2 O que muda vs o que existe

| Componente | Estado atual | Mudanca |
|---|---|---|
| `score-calculator.ts` | Calcula score com breakdown por componente | Sem mudanca (ja retorna details por campo) |
| `competitive-analyzer.ts` | Gera gaps competitivos | Sem mudanca (ja retorna gaps com impact_score) |
| `plan-generator.ts` | **NAO EXISTE** | **NOVO**: gera plano semanal |
| `surpass_plans` (DB) | **NAO EXISTE** | **NOVA TABELA**: persiste plano ativo |
| `/api/plan/surpass` | **NAO EXISTE** | **NOVO ENDPOINT** |
| `SurpassPlanCard` | **NAO EXISTE** | **NOVO COMPONENTE** no dashboard |
| `DashboardContent.tsx` | Mostra score, metricas, proximas acoes | Adiciona SurpassPlanCard abaixo do score |
| `gbp-audit.ts` (Inngest) | Roda audit + analise competitiva | Adiciona step: gerar/atualizar plano |

---

## 4. PlanGenerator (componente novo)

### 4.1 Tipos

```typescript
// src/lib/plan/plan-generator.ts

type StepStatus = 'pending' | 'active' | 'done' | 'skipped'
type StepMode = 'auto' | 'manual'

interface PlanStep {
  id: string                    // ex: "week-1-categories"
  week: number                  // semana do plano (1-8)
  title: string                 // texto curto para o usuario
  description: string           // detalhe da acao
  mode: StepMode                // auto = sistema faz, manual = usuario faz
  impact: number                // pontos estimados de ganho
  score_component: string       // qual componente do score impacta
  status: StepStatus
  completed_at: string | null
  action_type: string | null    // tipo de acao no optimizer (se auto)
}

interface SurpassPlan {
  id: string
  organization_id: string
  current_score: number
  competitor_max_score: number
  target_score: number
  steps: PlanStep[]
  created_at: string
  updated_at: string
  expires_at: string            // plano expira em 60 dias
}
```

### 4.2 Logica de geracao

O plano e gerado com base no breakdown do score atual vs o score maximo possivel, priorizando por:

1. **Impacto alto + automatico primeiro** (categorias, descricao, servicos, atributos)
2. **Impacto alto + manual segundo** (fotos)
3. **Impacto medio + automatico** (posts semanais, respostas a reviews)
4. **Impacto medio + manual** (pedir reviews, adicionar site)

#### Matriz de acoes

| Acao | Componente score | Max pts | Modo | Semana sugerida | Condicao de inclusao |
|---|---|---|---|---|---|
| Otimizar categorias | gmb_completude.categorias | 5 | auto | 1 | categoryCount < 3 |
| Reescrever descricao | gmb_completude.descricao | 6 | auto | 1 | !hasDescription ou gap competitivo |
| Listar servicos | gmb_completude (via optimizer) | 5 | auto | 1 | servicesCount < 3 |
| Adicionar atributos | gmb_completude.atributos | 4 | auto | 2 | attributeCount < 5 |
| Definir horarios | gmb_completude.horarios | 3 | auto | 2 | !hasHours |
| Ativar posts semanais | gmb_completude.posts_recentes | 2 | auto | 2 | recentPostCount < 2 |
| Adicionar fotos | gmb_completude.fotos | 5 | manual | 3 | photoCount < 10 |
| Responder reviews | reputacao.taxa_resposta | 5 | auto | 3 | responseRate < 0.8 |
| Pedir avaliacoes (email) | reputacao.volume_reviews | 8 | manual | 4 | reviewCount < 50 |
| Vincular website | gmb_completude (via optimizer) | 3 | manual | 5 | !hasWebsite |

#### Algoritmo

```
1. Calcular score atual com breakdown.details
2. Para cada acao na matriz:
   a. Verificar condicao de inclusao
   b. Calcular gap real (max_pts - pts_atual)
   c. Se gap > 0, incluir no plano
3. Ordenar por: modo (auto primeiro) > impacto (maior primeiro)
4. Distribuir em semanas:
   - Semana 1: todas as acoes auto de impacto >= 5 pts
   - Semana 2: acoes auto restantes
   - Semana 3: primeira acao manual (fotos)
   - Semana 4+: acoes manuais restantes, 1 por semana
5. Calcular target_score = min(100, current + soma dos impacts)
6. Buscar score mais alto entre concorrentes para comparacao
```

### 4.3 Regras

- **Maximo 8 semanas** (plano mais longo perde engajamento)
- **Maximo 2 acoes por semana** (nao sobrecarregar)
- **Meta realista:** target nao precisa ser 100, precisa ser >= score do concorrente mais forte
- **Semana 1 sempre automatica:** usuario ve resultado imediato sem esforco
- **Acoes manuais nunca na semana 1:** profissional precisa ver valor antes de investir tempo

---

## 5. Progressao automatica

### 5.1 Como um step vira "done"

| Modo | Como detecta conclusao |
|---|---|
| auto (categorias, descricao, servicos, atributos) | Proximo score-calculator detecta campo preenchido |
| auto (posts) | post_count > 0 nos ultimos 7 dias |
| auto (respostas reviews) | responseRate >= 0.8 |
| manual (fotos) | photoCount >= threshold do step |
| manual (reviews) | reviewCount >= threshold do step |
| manual (website) | hasWebsite = true no proximo audit |

### 5.2 Cron de atualizacao (Inngest)

O score-calculator ja roda diario. Apos calcular o score, adicionar step:

```
step.run('update-surpass-plan')
```

Que:
1. Busca plano ativo da organizacao
2. Para cada step pendente/ativo, verifica se a condicao foi atingida
3. Marca como `done` com `completed_at`
4. Avanca o proximo step pendente para `active`
5. Se todos os steps estao done, marca plano como completo

### 5.3 Notificacoes

| Evento | Canal | Mensagem |
|---|---|---|
| Step automatico concluido | Dashboard (inline) | "Descricao otimizada! +6 pontos" |
| Step manual proximo | Email (Resend) | "Seu plano para superar os concorrentes: semana 3, adicione fotos" |
| Plano 50% concluido | Dashboard (celebration) | "Voce ja subiu X pontos! Mais Y para alcancar o lider da regiao" |
| Plano concluido | Email + Dashboard | "Parabens! Seu perfil agora e competitivo com os melhores da regiao" |

---

## 6. Banco de dados

### 6.1 Tabela `surpass_plans` (nova)

```sql
CREATE TABLE surpass_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  current_score integer NOT NULL,
  competitor_max_score integer,
  target_score integer NOT NULL,
  steps jsonb NOT NULL DEFAULT '[]',
  status text NOT NULL DEFAULT 'active',  -- active | completed | expired
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '60 days')
);

CREATE INDEX idx_surpass_plans_org_active
  ON surpass_plans(organization_id) WHERE status = 'active';

ALTER TABLE surpass_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own surpass plans"
  ON surpass_plans FOR SELECT
  USING (organization_id IN (
    SELECT p.organization_id FROM professionals p WHERE p.user_id = auth.uid()
  ));
```

### 6.2 Porque jsonb para steps

Os steps sao um array ordenado com status mutavel. Usar jsonb evita uma tabela de join e simplifica queries. O plano inteiro e um documento unico por organizacao, atualizado pelo cron.

---

## 7. API

### 7.1 GET /api/plan/surpass

Retorna o plano ativo do usuario ou null.

```typescript
// Response
{
  plan: {
    id: string
    current_score: number
    competitor_max_score: number
    target_score: number
    status: 'active' | 'completed' | 'expired'
    progress: {
      total_steps: number
      completed_steps: number
      percentage: number
      points_gained: number
      points_remaining: number
    }
    steps: PlanStep[]
    created_at: string
    expires_at: string
    days_remaining: number
  } | null
}
```

### 7.2 POST /api/plan/surpass/generate

Forca regeneracao do plano (chamado pelo botao ou pelo audit). Dispara evento Inngest.

---

## 8. UI

### 8.1 SurpassPlanCard (dashboard principal)

Posicao: abaixo do ScoreGauge, acima das metricas. Ocupa a largura toda.

```
+---------------------------------------------------------------+
| Plano de Superacao                              Meta: 75/100  |
|                                                               |
| [============================>                     ] 52%      |
| 23 pts →→→ 47 pts agora →→→ 75 pts meta                      |
|                                                               |
| Semana 1 ✅ Categorias + descricao otimizadas        +15 pts  |
| Semana 2 ✅ Posts semanais ativados                   +10 pts  |
| Semana 3 🔵 Adicione 10 fotos do consultorio          +10 pts |
|            "Seus concorrentes tem 5x mais fotos"              |
|            [Ver dicas de fotos]                                |
| Semana 4    Peca avaliacoes aos pacientes              +8 pts |
| Semana 5    Adicionar atributos                        +5 pts |
|                                                               |
| Projetado para 8 semanas | Expira em 47 dias                 |
+---------------------------------------------------------------+
```

**Visual:**
- Progress bar com gradiente (vermelho > amarelo > verde conforme avanca)
- Steps concluidos: fundo verde sutil, icone check
- Step ativo: fundo azul sutil, borda azul, badge "Esta semana"
- Steps futuros: opacidade 0.4
- Steps manuais: icone de mao, badge "Voce"
- Steps automaticos: icone de raio, badge "Automatico"

### 8.2 Integracao com DashboardContent

```tsx
// DashboardContent.tsx - apos ScoreGauge
<SurpassPlanCard />
```

O card se auto-alimenta via hook `useSurpassPlan()` que faz fetch de `/api/plan/surpass`.

### 8.3 Estados

| Estado | Renderizacao |
|---|---|
| Sem plano | "Gere seu plano de superacao" [botao] |
| Plano ativo, < 50% | Card com progress bar + proxima acao destacada |
| Plano ativo, >= 50% | Card com celebracao parcial + restante |
| Plano completo | Card com confete + "Seu perfil agora e competitivo!" |
| Plano expirado | "Seu plano expirou. Gere um novo." [botao] |

---

## 9. Custos

**Zero custo adicional.** O plano e gerado com logica pura (sem Claude), usando dados que ja existem no banco (score breakdown + competitive analysis). A unica chamada de IA e a que ja existe na descricao/servicos (optimizer).

---

## 10. O que NAO esta neste scope

| Item | Motivo | Quando |
|---|---|---|
| Plano para multiplos verticais | MVP e Saude, regras iguais para todos | V2 se necessario |
| Gamificacao (badges, streaks) | Over-engineering para MVP | V2 se engajamento precisar |
| Notificacao push mobile | Sem app nativo | Nunca (web only) |
| Comparacao historica com concorrentes | Complexidade de tracking temporal | V2 |
| Meta personalizada pelo usuario | Sistema calcula automaticamente | V2 se houver demanda |

---

## 11. Criterios de sucesso

1. **Engajamento:** 70%+ dos usuarios com plano ativo visitam o dashboard pelo menos 1x/semana
2. **Completude:** 50%+ dos usuarios completam pelo menos a semana 1 (acoes automaticas)
3. **Score:** media de ganho de 20+ pts nos primeiros 30 dias entre usuarios com plano ativo
4. **Retencao:** churn rate de usuarios com plano ativo 30% menor que usuarios sem plano

---

## 12. Plano de implementacao

| Fase | Escopo | Depende de |
|---|---|---|
| 1 | Migration DB (`surpass_plans`) + `plan-generator.ts` | Nenhuma |
| 2 | `/api/plan/surpass` (GET + POST generate) | Fase 1 |
| 3 | Step `update-surpass-plan` no score-calculator Inngest | Fase 1 |
| 4 | Step `generate-surpass-plan` no gbp-audit Inngest | Fase 1 |
| 5 | `SurpassPlanCard` + `useSurpassPlan` hook | Fase 2 |
| 6 | Integracao no `DashboardContent.tsx` | Fase 5 |
| 7 | Email de notificacao de step manual (Resend) | Fase 3 |

---

## 13. Riscos

| Risco | Mitigacao |
|---|---|
| Score nao sobe mesmo apos acoes automaticas | Recalcular imediatamente apos execucao (ja funciona via evento Inngest) |
| Profissional ignora acoes manuais | Email semanal lembrando, com contexto competitivo ("seus concorrentes tem X, voce tem Y") |
| Plano fica obsoleto (concorrente muda) | Plano regenera apos cada analise competitiva semanal |
| Muitos steps parecem overwhelming | Maximo 2 por semana, semana 1 sempre automatica |

---

*Spec gerada por Orion (AIOX Master) em 2026-09-28*
*Complementa spec-competitive-optimization.md (implementada)*
