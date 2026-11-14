# Project Memory Protocol — Persistência Obrigatória de Contexto

## Regra Central

Todo projeto ativo que possua um `MASTER-BACKUP.md` **deve ter** um arquivo de memória correspondente em `~/.claude/projects/.../memory/project_{nome}_complete.md` e uma entrada no `MEMORY.md`.

Se não existir, criar **antes de fazer qualquer outra coisa** naquela sessão.

## Gatilho: Quando Criar/Atualizar Memória

| Evento | Ação obrigatória |
|--------|-----------------|
| Início de sessão tocando projeto sem memória | Criar `project_{nome}_complete.md` + entrada no MEMORY.md |
| Fim de sessão com qualquer projeto tocado | Atualizar memória de todos os projetos trabalhados |
| Criação de novo projeto (nova pasta + MASTER-BACKUP.md) | Criar memória imediatamente |
| Decisão importante tomada em qualquer projeto | Atualizar memória do projeto |
| Antes de compactação de contexto | Salvar estado atual na memória |

## Como Detectar Projetos Ativos

Projetos ativos neste repo estão em subdiretórios com MASTER-BACKUP.md:

```bash
find docs/ -name "MASTER-BACKUP.md" -maxdepth 3
```

Cada um desses projetos precisa de entrada correspondente no MEMORY.md.

## Estrutura Mínima do Arquivo de Memória

```markdown
---
name: project_{nome}_complete
description: {Projeto}: {descrição uma linha}, estado atual, roadmap
type: project
---

# {Projeto} — Contexto Estratégico Completo

## Visão
## Modelo de Negócio / Objetivo
## Estado Atual (data)
## Decisões Tomadas
## Roadmap
## Arquivos Principais (paths diretos)

**Why:** ...
**How to apply:** Ao perguntar sobre {projeto}, ler este arquivo antes de qualquer resposta.
```

## Processo de Fim de Sessao — INGEST (obrigatorio)

Ao fim de qualquer sessao de trabalho, aplicar o INGEST do wiki (ver `WIKI-SCHEMA.md` no vault):

1. Atualizar MOC do projeto no Obsidian
2. Para cada decisao tomada: criar/atualizar pagina em `decisions/`
3. Para cada bug/erro encontrado: criar pagina em `learnings/`
4. Para cada pattern reutilizavel: criar em `patterns/`
5. Para cada entidade nova: criar/atualizar em `entities/`
6. Atualizar MASTER-BACKUP no BIG HEAD
7. Commit + push

## Processo de Inicio de Sessao — QUERY (obrigatorio)

Antes de comecar qualquer tarefa tecnica:

1. Consultar `patterns/` por padroes relevantes ao que vai ser feito
2. Consultar `learnings/` por erros passados no mesmo dominio
3. Consultar `entities/` da ferramenta/servico envolvido

## Vault Wiki Structure

```
Joker's Mind/
  projects/     # MOC por projeto (status, decisoes, links)
  entities/     # Pessoas, empresas, ferramentas, servicos
  patterns/     # Padroes reutilizaveis entre projetos
  decisions/    # ADRs (por que escolhemos X em vez de Y)
  learnings/    # Erros, bugs, fixes, o que aprendemos
  reference/    # Protocolos, workflows, brandbooks
```

Schema completo: `WIKI-SCHEMA.md` no vault
