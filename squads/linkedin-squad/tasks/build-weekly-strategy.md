# Task: Build Weekly Strategy

## Objetivo
Transformar os tópicos trending e o briefing da marca em um calendário editorial completo para a semana: 10 posts, 2 por dia, de segunda a sexta.

## Inputs
- `trending_topics`: output do Trend Hunter
- `brand_briefing`: contexto completo da marca
- `week_of`: data da semana

## Processo

### Passo 1 — Selecionar 10 tópicos
Dos 15 tópicos ranqueados, selecionar os 10 com maior potencial para a semana.
Critérios de seleção:
- Máximo 2 posts do mesmo pilar na semana
- Ao menos 1 tópico trending (dado da semana real)
- Segunda: o tópico mais forte (maior potencial de alcance)
- Sexta tarde: tópico com maior potencial de compartilhamento

### Passo 2 — Distribuir no calendário
Seguir o template de distribuição semanal:

| Slot | Tipo ideal | Pilar |
|------|-----------|-------|
| Seg manhã | Hook forte, opinião ou dado | Rotação |
| Seg tarde | Educacional prático | Visibilidade Local ou Dicas |
| Ter manhã | Opinião ou contrariana | Erros Comuns |
| Ter tarde | Educacional | Qualquer |
| Qua manhã | História ou caso | Resultados Concretos |
| Qua tarde | Tendência do setor | Tendências |
| Qui manhã | Educacional profundo | Qualquer |
| Qui tarde | Dica prática acionável | Dicas Práticas |
| Sex manhã | Pergunta provocativa | Qualquer |
| Sex tarde | Inspiracional ou reflexivo | Qualquer |

### Passo 3 — Definir direção de cada post

Para cada slot, definir:
- Tópico específico (não genérico)
- Ângulo exato (o que vai ser dito, não só o assunto)
- Objetivo do post (educar / provocar / gerar comentários / compartilhar)
- Conexão com trending data (se aplicável)

### Passo 4 — Output

```markdown
# Calendário LinkedIn — {brand} — Semana de {week_of}

## Segunda-feira
**Manhã (07h-08h)**
- Pilar: {pilar}
- Tópico: {tópico específico}
- Ângulo: {o que exatamente vai ser dito}
- Objetivo: {educar|provocar|engajar|compartilhar}
- Trending: {sim/não — fonte}

**Tarde (12h-13h)**
[...]

## Terça-feira
[...]

[continua para todos os 5 dias]

## Notas da semana
- Tema da semana (se houver): {tema}
- Tópico mais forte: {slot} — {motivo}
- Tópico de risco (testar): {slot} — {motivo}
```
