# BRIEFING: Logo Destaka — Sistema Completo

## Contexto

Destaka e uma plataforma SaaS de presenca digital para profissionais liberais (medico, veterinario, advogado, contador, corretor). O produto otimiza o Google Perfil de Empresa no piloto automatico. Modelo Branded House: marca-mae "Destaka" + verticais (Destaka Saude, Destaka Pet, Destaka Juridico, etc.)

## O que preciso

Um sistema de marca com 2 marks + wordmark, em SVG vetorial limpo e profissional.

---

## 1. MARK PRINCIPAL: Pin + Olho (Hibrido)

**Conceito:** "Visibilidade local. Ser visto onde voce esta."

**Composicao:**
- Forma externa: silhueta de pin de localizacao (organico, nao geometrico duro como Google Maps)
- Elemento interno: um olho estilizado dentro do pin (iris/pupila como ponto focal)
- O ponto central (pupila) representa o profissional
- A forma do olho representa "ser visto"
- A forma do pin representa "busca local"

**Requisitos tecnicos:**
- Proporcoes baseadas em golden ratio
- Funcionar de 16px (favicon) ate qualquer tamanho
- Versao simplificada para 16-24px (so pin + ponto central, sem detalhe do olho)
- Versao completa para 32px+ (pin + olho + pupila)
- Stroke-based (contorno), nao fill (preenchimento solido)
- Stroke width consistente em toda a forma

**Estilo:**
- Linhas limpas, curvas suaves
- Nao literal/realista — abstraido e geometrico com cantos arredondados
- Premium, contemporaneo, tech
- Evitar: parecer com Google Maps pin, parecer logo de startup generica

---

## 2. MARK COMPACTO: Monograma "D"

**Conceito:** "A marca reduzida a essencia"

**Composicao:**
- Letra "D" geometrica dentro de container quadrado com cantos arredondados (superellipse/squircle)
- A curva do D deve ter tensao com o container (proximo das bordas mas sem tocar)
- Linha vertical do D alinhada a esquerda
- Arco do D como elemento dominante

**Requisitos tecnicos:**
- Perfeito como app icon (iOS/Android)
- Funcionar em 16px como favicon
- Duas versoes: outline (stroke) e solid (fill invertido)
- Na versao solid: fundo verde com D negativo (branco/escuro)

**Estilo:**
- Minimalista, bold
- Mesma linguagem visual do mark principal (mesmo peso de linha, mesmos raios de curva)

---

## 3. WORDMARK

**Fonte:** Outfit 700 (Google Fonts)
**Texto:** "Destaka"
**Letter-spacing:** -0.5px (levemente apertado)

**Lockup com vertical:**
- "Destaka" em Outfit 700 (bold, branco/escuro)
- Nome do vertical em Outfit 300 (light, opacidade 50%) logo ao lado
- Exemplo: **Destaka** Saude

---

## 4. SISTEMA DE CORES

| Elemento | Cor | Hex |
|----------|-----|-----|
| Fundo primario (marca-mae) | Verde-escuro profundo | #0F2A1F |
| Accent / marca highlight | Verde vibrante | #4ade80 |
| Texto sobre verde | Branco | #FFFFFF |
| Aplicacao em fundo branco | Verde-escuro | #0F2A1F |

**Cores por vertical (usadas no ponto central do Pin+Olho e no fundo do Monograma D):**
- Saude: #0EA5E9 (azul)
- Pet: #22C55E (verde)
- Juridico: #1E3A5F (azul-marinho)
- Contabil: #7C3AED (roxo)
- Imoveis: #D97706 (ambar)

---

## 5. ENTREGAS NECESSARIAS (todas em SVG)

### Mark Principal (Pin+Olho):
1. Versao completa — fundo verde (#0F2A1F), stroke branco, pupila #4ade80
2. Versao completa — fundo branco, stroke #0F2A1F, pupila #0F2A1F
3. Versao completa — fundo preto (#0a0a0a), stroke #4ade80, pupila #4ade80
4. Versao simplificada (16-24px) — mesmas 3 variantes de cor
5. Versao com cor de vertical (pupila na cor do vertical)

### Monograma D:
1. Outline — fundo verde, stroke branco
2. Solid — fundo #4ade80, D em #0F2A1F (negativo)
3. Outline — fundo branco, stroke #0F2A1F
4. Solid — fundo #0F2A1F, D em #4ade80
5. Com cor de vertical (fundo na cor do vertical, D branco)

### Lockups:
1. Mark + Wordmark horizontal (marca-mae)
2. Mark + Wordmark horizontal (cada vertical, com nome em light)
3. Wordmark sozinho (sem mark)
4. Mark sozinho (sem wordmark)

---

## 6. GRID DE CONSTRUCAO

Incluir um SVG mostrando:
- O grid de construcao do mark principal (circulos guia, proporcoes, alinhamentos)
- Area de respiro minima (clear space) ao redor do mark
- Proporcao mark:wordmark no lockup

---

## 7. REFERENCIAS VISUAIS (estilo desejado)

- Linear (app) — limpeza, geometria, premium
- Vercel — minimalismo, dark mode, tech
- Stripe — proporcoes perfeitas, profissionalismo
- Calm (app) — organicidade nas curvas

**NAO quero parecer com:**
- Google Maps (pin generico)
- Startups de growth marketing (setas pra cima genericas)
- CBS/AOL (olho literal demais)
- Clinicas medicas genericas (cruz, coracao)

---

## 8. INSTRUCOES TECNICAS SVG

- ViewBox padronizado (0 0 72 72 para marks quadrados, 0 0 72 84 para pin vertical)
- Paths otimizados (minimo de pontos de ancora)
- Sem transforms desnecessarios
- Sem elementos de texto (converter pra paths no wordmark se necessario)
- Cores como fill/stroke direto, nao como CSS externo
- Cada entrega como SVG independente e limpo

---

## Resumo em uma frase

Marca premium tech para plataforma B2B de presenca digital: pin de localizacao com olho embutido (principal) + monograma D geometrico (compacto), verde-escuro profundo, fonte Outfit bold, estetica Linear/Vercel.
