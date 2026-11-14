# Quality Gates — Regras Consolidadas

## Gate 1: Copy (antes de implementar)

- Tom coerente com o projeto
- Portugues perfeito (acentos, concordancia, crase)
- Zero travessao (regra absoluta)
- CTAs claros
- Sem frases truncadas ou placeholders

## Gate 2: Design (antes de implementar entregaveis visuais)

- Contraste >= 4.5:1 (WCAG AA)
- Touch targets >= 44x44px
- Keyboard navigation funcional
- Cor nunca e unico indicador de significado
- Body text >= 16px, line-height >= 1.5
- Zero horizontal scroll em mobile (320px)
- Spacing no grid 8px

Referencia completa: `docs/reference/design-quality-gate.md`

## Gate 3: Codigo (antes de entregar)

- Sem erros de sintaxe
- Logica funciona para o caso principal
- Sem vulnerabilidades obvias (injecao, XSS)
- Segue padroes do projeto existente
- Nao inventa features alem do solicitado (Art. IV)

## Gate 4: Entrega Final (antes de mostrar ao David)

- Todos os gates anteriores passaram
- Output alinhado com o que foi pedido
- Sem TODOs ou placeholders
- Revisao ortografica feita

## Regra

- Nenhum gate e pulado "para economizar tempo"
- Erros encontrados: retorna ao executor, nao ao David
- Max 2 ciclos de correcao. Depois: escalar para Orion com diagnostico
