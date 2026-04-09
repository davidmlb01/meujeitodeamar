# LinkedIn Squad

Máquina de conteúdo para LinkedIn — estratégia semanal + 10 posts prontos para publicar, baseados em tendências reais do nicho.

## Quick Start

```
@linkedin-chief *run-week destaka
```

Executa o pipeline completo: busca trends → estratégia → 10 posts prontos para a semana.

## Agentes (5)

| Agente | Função |
|--------|--------|
| **linkedin-chief** | Orquestrador — ativa e coordena todo o squad |
| **trend-hunter** | Busca tendências via Apify MCP |
| **strategy-architect** | Desenha o calendário editorial da semana |
| **voice-analyst** | Aplica frameworks dos top voices a cada post |
| **content-writer** | Escreve os 10 posts prontos para publicar |

## Top Voices de Referência

| Voice | Estilo | Melhor para |
|-------|--------|------------|
| Justin Welsh | Curto, punch, clareza brutal | Opiniões, contrarianas, lições |
| Jasmin Alić | Storytelling, narrativa com tensão | Histórias, casos, resultados |
| Matt Barker | Simplicidade extrema | Dicas práticas, engajamento |
| Lara Acosta | Autoridade de nicho, fala direto com o ICP | Educacional, autoridade |
| Richard van der Blom | Data-driven, mecanismo do LinkedIn | Tendências, dados do setor |

## Calendário Padrão

**2 posts por dia, segunda a sexta = 10 posts/semana**

| Dia | Manhã (07-08h) | Tarde (12-13h) |
|-----|---------------|---------------|
| Segunda | Hook forte da semana | Educacional prático |
| Terça | Opinião/contrariando | Educacional |
| Quarta | História/caso | Tendência do setor |
| Quinta | Educacional profundo | Dica prática |
| Sexta | Pergunta provocativa | Inspiracional/reflexivo |

## Pilares de Conteúdo (Destaka)

1. **Visibilidade Local** — por que o Google importa para profissionais de saúde
2. **Erros Comuns** — o que dentistas fazem errado na presença digital
3. **Resultados Concretos** — provas do mecanismo (antes/depois de scores)
4. **Tendências do Setor** — o que está mudando em saúde + digital
5. **Dicas Práticas** — ações que o leitor pode tomar hoje

## Comandos

```
@linkedin-chief *run-week {brand}     # Pipeline completo — 10 posts prontos
@linkedin-chief *run-strategy {brand} # Só estratégia — sem escrever ainda
@linkedin-chief *run-posts {strategy} # Só escrita — estratégia já existe
@linkedin-chief *run-single {topic}   # Um post específico
@linkedin-chief *audit-post {text}    # Auditoria de post existente
@trend-hunter *hunt {brand}           # Só busca de trends
```

## Regras Inegociáveis

- Posts prontos para publicar — sem placeholders, sem aprovação
- Nunca inventar tendências — sempre baseado em dados do Apify
- Nunca usar prova social falsa
- Vocabulário proibido: otimizar, algoritmo, SEO, expertise, soluções
- Vocabulário da marca: consultório, pacientes, aparecer, cuidar, resolver

## Componentes

- **5 agentes**, **3 tasks**, **1 checklist**
- Integração: Apify MCP (via docker-gateway)
- Output: 10 posts por semana, prontos para copiar e publicar
