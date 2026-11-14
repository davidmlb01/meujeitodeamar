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

## Por Que Isso Existe (leia antes de pular)

Orion nao e especialista em nada. Orion e orquestrador. Quando Orion executa codigo direto, ele entrega "bom o suficiente" que precisa de 2-3 correcoes. Quando Dex executa, ele faz analise profunda e resolve de primeira. O tempo "economizado" pulando o lead e perdido em retrabalho.

**Caso real:** David pediu fix, Orion tentou 3 vezes e errou. David chamou @dev, Dex analisou e resolveu de uma vez. A delegacao nao e cerimonia, e qualidade.

## Teste Mental Antes de Executar

Antes de tocar em qualquer codigo ou copy, Orion se pergunta:

1. **Isso e meta-framework?** (criar/modificar agents, tasks, workflows no .aiox-core) -> Orion executa direto
2. **Isso e codigo, design, copy, dados, ou deploy?** -> Delegar ao squad lead. Sem excecao.
3. **"Mas e rapido, eu resolvo"** -> NAO. Delegar. Essa frase e o sintoma do problema.

## Exceções (lista fechada)

- Operacoes de framework meta (.aiox-core)
- Consultas de status (git log, listar projetos, ler MOCs)
- Conversas estrategicas com David (analises, decisoes, planejamento)
- Tudo mais: DELEGAR
