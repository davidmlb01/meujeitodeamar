# Quality Gate — Auditoria Obrigatória Antes de Entregar ao David

## Regra Central

**Nenhuma entrega chega ao David com erros.** Todo output de qualquer agente passa por auditoria antes de subir. Se houver qualquer problema, retorna ao executor para corrigir. David só recebe quando aprovado.

## Fluxo de Entrega

```
Agente executa tarefa
  → Auditoria obrigatória (ver checklist abaixo)
  → Erros encontrados?
      SIM → Lista específica de problemas → retorna ao agente executor → agente corrige → nova auditoria
      NAO → Aprovado → entrega ao David
```

## Checklist de Auditoria

### Copy e Texto
- [ ] Nenhum travessão (—) em nenhum trecho — regra absoluta
- [ ] Português correto, sem erros de grafia
- [ ] Tom coerente com o briefing do projeto
- [ ] CTAs presentes onde necessário
- [ ] Sem frases truncadas ou incompletas

### Código
- [ ] Sem erros de sintaxe
- [ ] Lógica funciona para o caso principal
- [ ] Sem vulnerabilidades óbvias (injeção, XSS, etc.)
- [ ] Segue padrões do projeto existente

### Estrutura e Formato
- [ ] Markdown renderiza corretamente (se aplicável)
- [ ] Seções completas — nenhum placeholder ou "TODO" deixado
- [ ] Coerência com o que foi pedido no briefing

### Coerência com o Projeto
- [ ] Output está alinhado com o story/task ativa
- [ ] Não inventa features além do solicitado (Art. IV — No Invention)
- [ ] Referencia arquivos/dados corretos do projeto

## Responsabilidade da Auditoria

- Para outputs de **copy, brand, social:** auditado pelo próprio Squad Lead antes de subir
- Para outputs de **código:** Quinn (@qa) audita antes de subir
- Para outputs de **documentos estratégicos:** Orion valida coerência com contexto do projeto

## Proibições

- Nenhum agente entrega output diretamente ao David sem passar pela auditoria
- Auditoria não pode ser pulada "para economizar tempo" — erros custam mais caro
- Não usar "aproximadamente correto" como critério — tem que estar correto

## Limite de Iterações

Se após **2 ciclos** de correção o output ainda apresentar problemas, escalar para Orion com:
1. O output atual
2. Os erros identificados
3. O que o agente tentou corrigir e não conseguiu
