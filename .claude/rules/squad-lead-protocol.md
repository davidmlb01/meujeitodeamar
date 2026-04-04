# Squad Lead Protocol — Orquestração Obrigatória

## Regra Central

Orion **nunca** designa agente executor diretamente. Toda tarefa que pertence a um squad passa obrigatoriamente pelo líder daquele squad antes de ser delegada.

## Fluxo Obrigatório

```
Orion
  → identifica squad correto para a tarefa
  → chama Squad Lead com contexto completo da tarefa
  → Squad Lead avalia e designa o melhor agente para aquela tarefa específica
  → agente designado executa
```

## Mapeamento Squad → Lead

| Squad | Lead | Ativação |
|-------|------|----------|
| Design / UX | UMA (ux-design-expert) | `@ux-design-expert` |
| Dev / Engenharia | DEX (dev) | `@dev` |
| QA / Qualidade | QUINN (qa) | `@qa` |
| Product Management | MORGAN (pm) | `@pm` |
| Product Owner | PAX (po) | `@po` |
| Arquitetura | ARIA (architect) | `@architect` |
| Dados / Database | DARA (data-engineer) | `@data-engineer` |
| Scrum / Stories | RIVER (sm) | `@sm` |
| DevOps / Git | GAGE (devops) | `@devops` |
| Análise / Research | ALEX (analyst) | `@analyst` |

## Contexto a Passar ao Squad Lead

Ao chamar o Squad Lead, incluir sempre:

1. **Tarefa:** descrição clara do que precisa ser feito
2. **Contexto do projeto:** projeto ativo, story relacionada (se houver)
3. **Output esperado:** o que David precisa receber ao final
4. **Restrições:** prazo, limitações, regras específicas do projeto

## Proibições

- Orion **não executa** tarefas de squad diretamente
- Orion **não escolhe** o agente executor sem consultar o lead
- Orion **não pula** a camada de Squad Lead mesmo que pareça óbvio qual agente usar

## Exceções

Apenas para operações de framework meta (criar/modificar agents, tasks, workflows no `.aiox-core`) o Orion executa diretamente — essas são competências exclusivas do aiox-master.
