# Destaka: Revisão C-Level do Plano Multi-Vertical
**Data:** 2026-05-07
**Base:** Pesquisa de mercado com dados reais (concorrentes, pricing, compliance, APIs)
**Status:** Aguardando decisões de David

---

## VEREDICTO EXECUTIVO

| Vertical | Gap de mercado? | Pricing validado? | Compliance mapeado? | GO? |
|---|---|---|---|---|
| **Saúde** | SIM. Ninguém faz GMB automatizado SaaS para saúde no BR | SIM. R$197 é sweet spot (5-25x mais barato que agências) | SIM. Documento completo (CFM, CFO, COFFITO, CFP, CFN, LGPD) | ✅ GO (já está live) |
| **Pet** | SIM. Ninguém faz GMB automatizado SaaS para vet no BR | SIM. Mercado comporta R$197-297. Vets já pagam R$200-400 em ERP + R$500-3k em marketing | PARCIAL. CRMV ainda não mapeado | ✅ GO (após Saúde atingir R$25k MRR) |
| **Jurídico** | SIM. Ninguém faz GMB automatizado SaaS para advogados no BR | SIM. R$397 base é justificável (1 caso = 7x-37x ROI) | PARCIAL. OAB pesquisado, mas bot WhatsApp precisa ser REATIVO | ✅ GO CONDICIONAL (redesenhar killer feature) |

---

## 1. SAÚDE: Validação Completa

### Concorrentes mapeados

| Concorrente | O que faz | Pricing | Faz GMB auto? | Ameaça |
|---|---|---|---|---|
| **Doctoralia** | Marketplace saúde #1 BR (570k perfis) | R$399/mês | NÃO | ALTA (posicionamento diferente: marketplace vs Google) |
| **Simples Dental** | Software odonto + módulo marketing | ~R$200/mês | NÃO | MÉDIA-ALTA (100k dentistas, poderia expandir) |
| **Clinicorp** | Gestão odonto, 25k clínicas | R$149/mês | NÃO | MÉDIA |
| **Cloudia** | Chatbot IA WhatsApp clínicas | ~R$200/mês | NÃO | BAIXA (complementar) |
| **GMBMantra** | IA para GBP (mais próximo do modelo Destaka no mundo) | Grátis a US$25/loc/mês | SIM, mas genérico, sem BR | MÉDIA (benchmark funcional) |
| **Agências** (WTA3, E-Clínica, Odonto Results) | GMB manual + Ads + social | R$1.500-8.000/mês | SIM, manual | MÉDIA |

### Conclusão Saúde
**Nenhum SaaS brasileiro faz GMB automatizado para saúde.** Doctoralia é a ameaça por base instalada, mas faz marketplace, não otimização de Google. Destaka está criando categoria.

**Pricing R$197/mês VALIDADO:** entre CRM barato (R$67-149) e agência cara (R$1.500-8.000). Sweet spot confirmado.

**Risco a monitorar:** Doctoralia ou Simples Dental adicionarem módulo GMB. Janela estimada: 12-18 meses.

---

## 2. PET: Validação Completa

### Tamanho do mercado
- **77.287 estabelecimentos veterinários** no Brasil (CFMV, mar/2025)
- Faturamento mercado pet: R$77,96 bilhões (2025), projeção R$80+ bi (2026)
- Fatia clínicas/hospitais: ~18% (~R$13,9 bi)
- Brasil é 3o maior mercado pet do mundo

### Concorrentes mapeados

| Concorrente | O que faz | Pricing | Calendário vacinal? | GMB auto? | Ameaça |
|---|---|---|---|---|---|
| **SimplesVet** | ERP vet líder, 10k+ clínicas | R$220/mês+ | SIM (WhatsApp/SMS/email) | NÃO | MÉDIA (se expandir para marketing = crítico) |
| **Vetus** (Petlove) | ERP vet | R$199-249/mês | SIM (SMS) | NÃO | MÉDIA |
| **Peti9** | ERP + Nina IA, 12k+ users | Não divulgado | SIM (WhatsApp) | NÃO | MÉDIA |
| **Fly Vet** | Agência vet #1 BR, 400+ clientes | R$2.000+/mês (serviço) | NÃO | SIM (manual) | ALTA (se produtizar = crítico) |
| **Chat Inteligente** | IA WhatsApp vet, calcula próxima vacina | Não divulgado | SIM (IA) | NÃO | MÉDIA-ALTA |
| **SocialHub** | CRM genérico com vertical vet | R$99-399/mês | SIM (lembretes) | NÃO | MÉDIA |

### Achado crítico: Calendário Vacinal já existe
SimplesVet, Vetus, Peti9, Chat Inteligente e VetSoft já fazem lembrete vacinal via WhatsApp. **A killer feature proposta não é diferencial isolado.**

**O que NINGUÉM faz:** unir calendário vacinal + GMB automatizado + reviews + posts + Score numa plataforma única. Esse é o gap real.

### Conclusão Pet
- Gap de GMB automatizado confirmado (igual a Saúde)
- Killer feature precisa ser "calendário vacinal QUE ALIMENTA conteúdo público no GMB" (ex: postar automaticamente "Temporada V10, agende pelo link")
- Não é o calendário vacinal sozinho (isso já existe)
- R$197/mês é viável e competitivo
- Ameaça principal: SimplesVet ou Fly Vet (janela 12-18 meses)

---

## 3. JURÍDICO: Validação Completa

### Concorrentes mapeados

| Concorrente | O que faz | Pricing | GMB auto? | Ameaça |
|---|---|---|---|---|
| **SabioAdv** | IA WhatsApp + CRM + monitoramento processos | Não divulgado | NÃO | ALTA (mais próximo do modelo) |
| **Causi** | CRM + IA atendimento leads | R$77-237/mês | NÃO | ALTA (CRM+IA acessível) |
| **JusLead** | CRM jurídico | R$169/mês+ | NÃO | MÉDIA |
| **Jusbrasil Pro** | Visibilidade + jurisprudência | ~R$49/mês | NÃO | MÉDIA (passivo) |
| **Agências** (Juri Digital, Gandini, Conversão Jurídica) | Marketing manual | R$2.000-15.000/mês | SIM (manual) | MÉDIA |
| **Lead Jurídico/LeadAdv** | Marketplace de leads | Por lead | NÃO | MÉDIA (modelo diferente) |

### Ticket médio por área (validação do R$397/mês)

| Área | Honorários por caso | ROI com 1 cliente/mês |
|---|---|---|
| Trabalhista | R$3.000-15.000 | 7x-37x |
| Previdenciário | R$6.000-24.000 | 15x-60x |
| Família | R$2.000-6.000 | 5x-15x |
| Consumidor | R$1.500-4.500 | 4x-11x |

**R$397/mês amplamente justificado.** Um caso por mês paga 7x-37x o investimento.

### Compliance OAB: Tabela Definitiva

| Feature | Status OAB | Risco |
|---|---|---|
| Otimização GMB / SEO | ✅ PERMITIDO (publicidade passiva) | MÍNIMO |
| Posts com IA (informativos) | ✅ PERMITIDO | BAIXO |
| Google Ads | ✅ PERMITIDO | BAIXO |
| Solicitar reviews genéricos | ✅ PERMITIDO (zona cinza aceitável) | BAIXO-MÉDIO |
| IA para gerar conteúdo jurídico | ✅ PERMITIDO com cautela | MÉDIO |
| Bot WhatsApp REATIVO (responder quem veio) | ⚠️ ZONA CINZA | ALTO |
| Bot WhatsApp ATIVO (enviar mensagem primeiro) | ❌ PROIBIDO | CRÍTICO |
| WhatsApp broadcast | ❌ PROIBIDO | CRÍTICO |
| Exibir resultados de casos | ❌ PROIBIDO | CRÍTICO |
| Mencionar valores de honorários | ❌ PROIBIDO | CRÍTICO |
| Comparação com outros advogados | ❌ PROIBIDO | CRÍTICO |

### Achado crítico: Killer feature precisa ser redesenhada

O plano propunha: "Bot qualifica lead via WhatsApp de forma estruturada."

**Problema:** Se o bot ENVIA mensagem primeiro = captação ativa = PROIBIDO pela OAB. Se o bot RESPONDE quem veio até ele = zona cinza aceitável.

**Redesign necessário:** A killer feature não é "captura de lead via WhatsApp". É "qualificação inteligente de quem JÁ entrou em contato". O bot é um filtro, não um captador.

Fluxo correto:
```
Cliente busca no Google > Clica no GMB > Manda mensagem no WhatsApp
> Bot qualifica (tipo de causa, urgência, expectativa) > Agenda consulta paga
> Advogado recebe resumo antes de atender
```

Isso é permitido porque o CLIENTE iniciou o contato.

### Novo Provimento OAB (em fase final)
Tendência de mais permissividade com ferramentas digitais. Favorece o modelo Destaka.

---

## 4. VIABILIDADE TÉCNICA: APIs e Integrações

| Item | API existe? | Viável MVP? | Custo | Ação |
|---|---|---|---|---|
| Doctoralia | Sim (restrita a parceiros) | NÃO | Negociação | Scraping dados públicos no MVP, parceria V2 |
| BoaConsulta | NÃO | NÃO | N/A | Descartado |
| Ranking local | SIM (GeoGrid, DataForSEO) | SIM | $49/mês (GeoGrid) | Integrar no MVP como diferencial |
| WhatsApp Business API | SIM (Cloud API) | SIM | R$0,04/msg (utility), R$0,35/msg (marketing) | Cloud API oficial, setup 3-7 dias |
| SimplesVet | NÃO confirmado | PARCIAL (CSV) | Zero | CSV no MVP, parceria V2 |
| Vetus | NÃO confirmado | NÃO | N/A | Parceria com Petlove |
| Jusbrasil | SIM (robusta) | SIM | Enterprise (negociar) | Enriquecer perfil advogado |

---

## 5. DECISÕES NECESSÁRIAS

### DECISÃO 1: Pricing definitivo

| Vertical | Proposta original | Plano novo | Recomendação C-Level (com dados) | Justificativa |
|---|---|---|---|---|
| Saúde Básico | R$297 | R$197 | **R$197** (manter Stripe atual) | Já está live. Mudar agora é retrabalho. Testar R$297 no Q3. |
| Saúde Pro | R$597 | R$397 | **R$497** | GTM v2 já planejou teste A/B. R$497 é meio-termo, distância saudável do Jurídico. |
| Saúde Premium | R$997 | R$697 | **R$797** | Reduz barreira vs R$997 mas mantém margem alta. |
| Pet Básico | - | R$197 | **R$197** | Igual Saúde. Simplifica operação. |
| Pet Pro | - | R$397 | **R$397** | Mercado paga. |
| Pet Premium | - | R$697 | **R$697** | Ok. |
| Jurídico Básico | - | R$397 | **R$397** | 1 caso = 7x-37x ROI. Validado. |
| Jurídico Pro | - | R$597 | **R$597** | Ok. |
| Jurídico Premium | - | R$897 | **R$897** | Ticket jurídico justifica. |

### DECISÃO 2: Ranking local e Doctoralia entram no Core ou Roadmap?

| Feature | Recomendação | Razão |
|---|---|---|
| Monitoramento ranking local | **CORE (V2)** | GeoGrid API $49/mês, diferencial real, viável tecnicamente |
| Integração Doctoralia | **ROADMAP V3+** | API restrita a parceiros, complexidade alta, baixo ROI imediato |
| Integração BoaConsulta | **DESCARTADO** | Sem API, sistema fechado |
| Integração Simples Vet | **ROADMAP V2** (via CSV/Excel) | Sem API pública, mas importação manual é viável |
| Integração Jusbrasil | **CORE Jurídico** | API robusta, enriquece perfil do advogado |

### DECISÃO 3: Stage-gates com métricas concretas

| Vertical | Gatilho para lançar | Timeline estimada |
|---|---|---|
| Saúde | JÁ LIVE | Agora (resolver 3 blockers + primeiro cliente) |
| Pet | Saúde em R$25k MRR (~127 clientes) | Mês 5-6 (se atingir meta) |
| Jurídico | Pet em R$15k MRR (~76 clientes) + compliance OAB revisado | Mês 8-10 |

### DECISÃO 4: Killer features redesenhadas

| Vertical | Killer feature original | Killer feature VALIDADA | Mudança |
|---|---|---|---|
| **Saúde** | Reativação paciente via WhatsApp | Igual (sem mudança, depende de WhatsApp API V2) | Nenhuma |
| **Pet** | Calendário vacinal inteligente | Calendário vacinal QUE ALIMENTA conteúdo GMB (não só lembrete, que já existe) | Foco no diferencial: vacina > post no Google |
| **Jurídico** | Captura e qualificação de lead via WhatsApp | Qualificação REATIVA de quem já entrou em contato (bot não pode iniciar conversa) | Redesign arquitetural: bot é filtro, não captador |

---

## 6. PLANO CORRIGIDO: O QUE EXISTE vs ROADMAP vs VISÃO

### LIVE HOJE (vende agora, Saúde apenas)

- Otimização completa de GMB (categorias, atributos, descrição, serviços)
- Posts semanais automatizados via IA (Claude)
- Captura e resposta automatizada a reviews
- Score Destaka (0-100)
- Dashboard com métricas (visualizações, cliques, ligações, direções)
- Análise competitiva local
- Relatório mensal via email
- Lead magnet: diagnóstico público gratuito

### ROADMAP V2 (Q3 2026, após 30 clientes Saúde)

- Monitoramento de ranking local via GeoGrid API
- WhatsApp Business API (review pós-consulta, relatório mensal)
- Reativação de paciente inativo (killer feature Saúde)
- Lançamento Pet (GMB + calendário vacinal integrado ao conteúdo)
- Importação de base via CSV (SimplesVet, Vetus)
- Google Ads automatizado (Tier Crescimento)

### ROADMAP V3 (Q4 2026, após 150 clientes)

- Lançamento Jurídico (GMB + bot reativo de qualificação)
- Integração Jusbrasil (enriquecimento perfil advogado)
- CRM de pacientes + automações WhatsApp
- Gestão reputação multi-plataforma (Doctoralia como leitura, não escrita)
- Bot triagem WhatsApp (Saúde e Pet)
- Conteúdo blog/Instagram automatizado

### VISÃO V4+ (2027)

- Parceria API Doctoralia (sincronização bidirecional)
- Parceria SimplesVet/Vetus (integração direta)
- Verticais adicionais: Contábil, Imóveis
- CRM com prontuário (lock-in máximo)
- Expansion revenue via sinais do GMB

---

## 7. CANAL B2B2C: COMO SE APLICA A CADA VERTICAL

| Vertical | Canal B2B2C via escritórios contábeis | Viável? |
|---|---|---|
| **Saúde** | Escritórios especializados em saúde indicam médicos/dentistas | SIM (já aprovado, modelo bilateral) |
| **Pet** | Escritórios que atendem clínicas vet | SIM (mesmo modelo, escala menor) |
| **Jurídico** | Escritórios contábeis que atendem escritórios de advocacia | PARCIAL (advogados grandes têm contabilidade interna) |

**Canais adicionais por vertical:**

| Vertical | Canal alternativo | Potencial |
|---|---|---|
| Saúde | Distribuidores de insumos médicos/odontológicos | ALTO (visitam consultórios mensalmente) |
| Pet | Distribuidores de ração/insumos vet | ALTO (mesma lógica) |
| Jurídico | Associações de advogados por especialidade | MÉDIO (OAB seccional, congressos) |

---

## 8. RISCOS E AMEAÇAS POR VERTICAL

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Doctoralia adiciona módulo GMB | Média | CRÍTICO | Velocidade de execução + lock-in via Score + dados |
| SimplesVet expande para marketing | Média | ALTO (Pet) | Lançar Pet antes, criar dados proprietários |
| Fly Vet produtiza como SaaS | Média-Alta | ALTO (Pet) | Ser mais barato (R$197 vs R$2k+) e self-service |
| SabioAdv adiciona GMB (Jurídico) | Média | ALTO | Lançar com compliance OAB como diferencial |
| OAB restringe marketing digital | Baixa | ALTO | Novo Provimento tende a ser MAIS permissivo |
| WhatsApp API demora para aprovar | Média | MÉDIO | MVP com email (já funciona), WhatsApp na V2 |

---

## FONTES DA PESQUISA

### Saúde
- Doctoralia Pro (pro.doctoralia.com.br)
- Simples Dental (simplesdental.com)
- Clinicorp (clinicorp.com)
- Cloudia (cloudia.com.br)
- GMBMantra (gmbmantra.ai)
- BrightLocal, Whitespark, Local Viking, Birdeye, Podium, Yext, Uberall

### Pet
- CFMV dados estatísticos (cfmv.gov.br)
- ABINPET (abinpet.org.br)
- SimplesVet (simples.vet)
- Vetus/Petlove (vetus.com.br)
- Peti9 (peti9.com)
- Fly Vet (flyvet.com.br)
- Chat Inteligente (chatinteligente.com.br)
- SocialHub (socialhub.pro)

### Jurídico
- Provimento 205/2021 OAB (oab.org.br)
- SabioAdv (sabioadv.com.br)
- Causi CRM (causi.com.br)
- JusLead (juslead.com)
- Jusbrasil API (api.jusbrasil.com.br)
- Migalhas, Conjur, OAB/RS, Desmistificando

### APIs
- Docplanner Integrations API (integrations.docplanner.com)
- GeoGrid API (geogrid.dev)
- DataForSEO (dataforseo.com)
- Meta WhatsApp Business (developers.facebook.com)
- Z-API (z-api.io)
- Evolution API

---

*Documento gerado em 2026-05-07. Base: 4 pesquisas de mercado independentes com fontes verificáveis.*
*Próxima revisão: após decisões de David sobre pricing, stage-gates e killer features.*
