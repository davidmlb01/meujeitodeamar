# Model Routing Protocol — Otimizacao de Tokens por Camada

## Regra Central

**Nem toda tarefa precisa do modelo mais caro.** O Opus e o cirurgiao. O Sonnet e o clinico geral. O Haiku e o enfermeiro. ChatGPT e o freelancer de copy. Cada um no seu escopo.

## Camadas de Roteamento

### Camada 1: OPUS (estrategia + decisao + complexidade alta)

**Quando usar:** Tarefas que exigem raciocinio profundo, decisoes arquiteturais, debugging nao-trivial, ou orquestracao multi-agente.

| Tarefa | Justificativa |
|--------|--------------|
| Orion (aiox-master) orquestrando | Precisa entender contexto completo |
| Debugging de bugs em producao | Raciocinio causal complexo |
| Decisoes de arquitetura (@architect) | Trade-offs com impacto de longo prazo |
| Auditoria de seguranca | Nao pode errar |
| Analise de produto / estrategia | Requer julgamento fino |
| Code review de logica critica | Pagamento, auth, dados sensiveis |
| Refatoracao de sistemas complexos | Precisa manter invariantes |
| Sessoes com David (conversa principal) | Contexto acumulado, decisoes em tempo real |

**Regra:** A conversa principal com David SEMPRE roda no Opus. E o unico modelo que mantem o contexto estrategico completo.

---

### Camada 2: SONNET (execucao qualificada)

**Quando usar:** Implementacao de features, codigo padrao, testes, tasks bem definidas com escopo claro.

**Parametro no Agent tool:** `model: "sonnet"`

| Tarefa | Justificativa |
|--------|--------------|
| @dev implementando stories | Codigo com spec clara |
| @qa rodando QA gate | Checklist definido |
| Criar componentes React/Next.js | Padrao, nao inventivo |
| Escrever testes unitarios | Mecanico com spec |
| Implementar APIs/endpoints | CRUD, integracao |
| Migrations de banco | DDL com schema definido |
| Fix de bugs simples (typo, path, config) | Nao precisa raciocinio profundo |
| Gerar documentacao tecnica | Descrever o que ja existe |
| Story creation (@sm) | Template-driven |

**Economia vs Opus:** ~60-70% menos custo por token

---

### Camada 3: HAIKU (operacional + coleta)

**Quando usar:** Tarefas bracais, coleta de informacao, formatacao, busca em codebase, resumos.

**Parametro no Agent tool:** `model: "haiku"`

| Tarefa | Justificativa |
|--------|--------------|
| Subagents de exploracao (Explore) | So leem e reportam |
| Ler e resumir MOCs/MASTER-BACKUPs | Extracao, nao analise |
| Buscar arquivos no codebase (Glob/Grep wrappers) | Mecanico |
| Formatar markdown, tables, listas | Zero raciocinio |
| Gerar git diff summaries | Descritivo |
| Listar dependencias, imports | Mecanico |
| Validar syntax (lint-like) | Checklist binario |
| Indexar documentacao | Parse + estrutura |

**Economia vs Opus:** ~90-95% menos custo por token

---

### Camada 4: ChatGPT (budget alternativo)

**Quando usar:** Tarefas de copy, conteudo, pesquisa de mercado que nao precisam de acesso ao codebase.

**Como usar:** David executa no ChatGPT separadamente, ou via API se integrado.

| Tarefa | Modelo sugerido |
|--------|----------------|
| Copy de landing page | GPT-4o |
| Posts para redes sociais | GPT-4o |
| Email sequences (onboarding, marketing) | GPT-4o |
| Pesquisa de mercado / concorrentes | GPT-4o |
| Brainstorming de naming / taglines | GPT-4o |
| Traducoes | GPT-4o mini |
| Reformulacao de texto | GPT-4o mini |

**Economia vs Opus:** ~95% (budget separado, nao consome Claude tokens)

---

## Regras de Escalacao

```
Haiku tenta a tarefa
  -> Resultado suficiente? DONE
  -> Resultado insuficiente? Escala para Sonnet

Sonnet tenta a tarefa
  -> Resultado suficiente? DONE
  -> Precisa de decisao arquitetural ou estrategica? Escala para Opus

Opus decide e delega execucao de volta para Sonnet/Haiku
```

**Nunca escalar sem motivo.** Se o Haiku resolveu, nao confirmar com Sonnet "so para ter certeza". Confianca no resultado do modelo adequado.

---

## Aplicacao por Agente AIOX

| Agente | Modelo padrao | Escala para Opus quando |
|--------|--------------|------------------------|
| @dev (Dex) | **sonnet** | Bug em logica de pagamento, auth, ou dados sensiveis |
| @qa (Quinn) | **sonnet** | Auditoria de seguranca, QA de fluxo financeiro |
| @architect (Aria) | **opus** | Sempre (decisoes arquiteturais sao estrategicas) |
| @pm (Morgan) | **sonnet** | Decisao de roadmap, priorizacao com trade-offs |
| @po (Pax) | **sonnet** | Validacao com ambiguidade nos acceptance criteria |
| @sm (River) | **sonnet** | Sempre sonnet (story creation e template-driven) |
| @analyst (Alex) | **sonnet** | Pesquisa que exige sintese estrategica |
| @data-engineer (Dara) | **sonnet** | Schema com RLS complexo ou migration destrutiva |
| @ux-design-expert (Uma) | **sonnet** | Sempre sonnet (design e visual, nao raciocinio profundo) |
| @devops (Gage) | **sonnet** | CI/CD com impacto em producao |
| @caio-architect (Kai) | **opus** | Sempre (estrategia de IA e LLM) |
| Subagents (Explore) | **haiku** | Nunca (se precisa de mais, nao e um subagent) |

---

## Aplicacao Pratica no Claude Code

### Ao despachar subagents:

```
# Exploracao de codebase -> Haiku
Agent(model: "haiku", subagent_type: "Explore", ...)

# Implementacao de feature -> Sonnet
Agent(model: "sonnet", prompt: "Implementar ...", ...)

# Code review critico -> Opus (omitir model, herda do pai)
Agent(prompt: "Revisar seguranca de ...", ...)
```

### Na conversa principal:

A conversa com David roda SEMPRE no Opus (e o modelo da sessao). O roteamento acontece nos subagents despachados via Agent tool.

---

## Metricas de Sucesso

| Metrica | Baseline (tudo Opus) | Target (com routing) |
|---------|---------------------|---------------------|
| Tokens Opus por sessao | ~100% | ~20-30% |
| Tokens Sonnet por sessao | 0% | ~50-60% |
| Tokens Haiku por sessao | 0% | ~15-20% |
| Custo medio por sessao | 1x | ~0.3-0.4x |
| Qualidade de output | baseline | igual ou melhor (modelo certo para a tarefa) |

---

## Anti-patterns (NAO fazer)

- NAO usar Haiku para decisoes de arquitetura ou debugging complexo
- NAO usar Opus para ler 50 arquivos e coletar contexto (despachar Haiku para isso)
- NAO escalar para Opus "por precaucao" se Sonnet resolveu
- NAO misturar modelos dentro de uma unica tarefa atomica (decidir o modelo ANTES de comecar)
- NAO usar ChatGPT para tarefas que precisam de acesso ao codebase local

---

## Quando Revisar Este Protocolo

- Se novos modelos forem lancados (ex: Claude 5, GPT-5)
- Se os precos mudarem significativamente
- Se a qualidade do Haiku/Sonnet se mostrar insuficiente para alguma categoria
- A cada 30 dias, revisar as metricas de uso real vs expectativa

---

**Versao:** 1.0
**Criado:** 2026-11-14 por Orion (AIOX Master)
**Motivacao:** Tokens de Claude Code acabando rapido demais. 70-80% do trabalho nao precisa do modelo mais caro.
