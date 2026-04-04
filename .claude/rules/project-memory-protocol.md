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

## Processo de Fim de Sessão (TODOS os projetos)

Ao fim de qualquer sessão de trabalho:

1. Listar todos os projetos tocados na sessão
2. Para cada projeto: atualizar `project_{nome}_complete.md` com decisões novas e estado atual
3. Atualizar MEMORY.md se necessário (nova entrada ou descrição desatualizada)
4. Commit + push dos MASTER-BACKUPs modificados

## Projetos Ativos Conhecidos (atualizar conforme crescem)

| Projeto | MASTER-BACKUP | Arquivo Memória |
|---------|--------------|-----------------|
| Freud (meujeitodeamar) | `docs/MASTER-BACKUP.md` | `project_freud_complete.md` |
| EasySite | `docs/easysite/MASTER-BACKUP.md` | `project_easysite_complete.md` |
| GMM | — | `project_gmm_complete.md` |
| UNLMTD | — | `project_unlmtd_brandbook.md` |
