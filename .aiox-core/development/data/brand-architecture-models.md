# Modelos de Arquitetura de Marca

## Referencia rapida para decisoes de arquitetura de marca

### 1. Branded House

**Estrutura:** Uma marca-mae forte + extensoes funcionais
**Exemplo real:** Google (Search, Maps, Drive, Photos), FedEx (Express, Ground, Freight)
**Exemplo AIOX:** Destaka (Saude, Pet, Juridico, Contabil, Imoveis)

| Vantagem | Desvantagem |
|----------|------------|
| Maximo equity transferido | Risco de contaminacao cruzada |
| Custo de marketing menor | Menos flexibilidade por vertical |
| Reconhecimento instantaneo | Dificil reposicionar uma vertical |

**Quando usar:**
- Marca-mae tem reputacao forte
- Verticais compartilham publico similar
- Quer escalar rapido com custo baixo de branding

**Regras de naming:**
- [Marca] + [Funcao em portugues]
- Nunca ingles, nunca siglas, nunca nomes criativos
- Exemplo: Destaka Saude (nao "Destaka Health", nao "DestakaRx")

### 2. House of Brands

**Estrutura:** Portfolio de marcas independentes sob holding invisivel
**Exemplo real:** P&G (Tide, Pampers, Gillette), LVMH (Louis Vuitton, Dior, Fendi)

| Vantagem | Desvantagem |
|----------|------------|
| Zero contaminacao cruzada | Custo alto de branding por marca |
| Posicionamento livre por marca | Sem sinergia de reconhecimento |
| Pode vender marcas individualmente | Cada marca precisa construir equity do zero |

**Quando usar:**
- Verticais tem publicos MUITO diferentes
- Risco reputacional alto em alguma vertical
- Portfolio de aquisicoes com marcas ja conhecidas

### 3. Endorsed Brands

**Estrutura:** Marcas semi-independentes com selo da mae
**Exemplo real:** Marriott (Courtyard by Marriott, Ritz-Carlton, A Marriott Hotel)

| Vantagem | Desvantagem |
|----------|------------|
| Credibilidade herdada | Complexidade de gestao |
| Flexibilidade razoavel | Endorsement pode diluir |
| Permite aquisicoes | Hierarquia visual complexa |

**Quando usar:**
- Quer herdar credibilidade sem perder identidade propria
- Marcas adquiridas com equity existente
- Verticais premium vs economy no mesmo portfolio

### 4. Hybrid

**Estrutura:** Mix de modelos conforme portfolio cresce
**Exemplo real:** Amazon (Amazon loja + AWS + Alexa + Twitch + MGM)

| Vantagem | Desvantagem |
|----------|------------|
| Flexibilidade maxima | Complexidade maxima de gestao |
| Cada marca com modelo ideal | Dificil manter coerencia |
| Escala para portfolios grandes | Requer brand team dedicado |

## Framework de Decisao

```
O publico e o MESMO em todas as verticais?
  SIM -> Branded House (ex: Destaka)
  NAO -> As verticais competem entre si?
    SIM -> House of Brands
    NAO -> Quer herdar credibilidade da mae?
      SIM -> Endorsed Brands
      NAO -> House of Brands
```

## Aplicacao Especifica: Destaka

**Modelo escolhido:** Branded House Funcional (aprovado 05/05/2026)

**Naming system:**
- Destaka (hub institucional)
- Destaka Saude (profissionais de saude)
- Destaka Pet (veterinarios, pet shops)
- Destaka Juridico (advogados consumidor)
- Destaka Contabil (escritorios contabeis)
- Destaka Imoveis (corretores)

**Cor por vertical:**
- Hub: #0F2A1F (dark green proprietario)
- Saude: #0EA5E9 (sky blue clinico)
- Pet: #22C55E (verde vida)
- Juridico: #1E3A5F (navy sobriedade)
- Contabil: #7C3AED (roxo precisao)
- Imoveis: #D97706 (amber solidez)

**Invariantes (o que NUNCA muda):**
- Nome "Destaka" sempre presente
- Tipografia Inter
- Modo dark como padrao
- Icones SVG monocromaticos
- Voz: senior, clinica, precisa

**Variaveis (o que se adapta):**
- Cor de acento por vertical
- Jargao especifico por vertical
- Imagens/fotografia por contexto profissional
- Tagline por vertical
