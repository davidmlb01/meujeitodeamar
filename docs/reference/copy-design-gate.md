# Copy & Design Gate: Entregaveis Voltados ao Usuario

## Regra Central

**Nenhum texto ou visual voltado ao usuario final chega ao @dev sem passar pelos gates obrigatorios.** @dev implementa, nao escreve copy nem decide design.

## Escopo: O Que Conta Como "Voltado ao Usuario"

| Tipo | Exemplos |
|------|----------|
| Email | Onboarding, transacional, marketing, notificacao, relatorio |
| Notificacao | Push, in-app, SMS, WhatsApp |
| Landing page | Hero, features, FAQ, pricing, CTA |
| UI copy | Modais, empty states, mensagens de erro, tooltips, onboarding steps |
| Social/Ads | Posts, criativos, copy de anuncio |

## Gate 1: Copy (OBRIGATORIO)

**Responsavel:** Squad de copy (ativar via kickoff flow etapa 5, @copy-chief)

**Checklist:**
- [ ] Tom coerente com o projeto (brand voice)
- [ ] Portugues correto (acentos, concordancia, genero da marca)
- [ ] Zero travessao (regra absoluta)
- [ ] CTAs claros e orientados a acao
- [ ] Sem mencoes a IA em copy voltada ao cliente (quando aplicavel)
- [ ] Sem frases truncadas, placeholders ou TODOs

**Output:** Texto final aprovado em documento (Google Doc, Markdown, ou nota no vault)

## Gate 2: Design (OBRIGATORIO para entregaveis visuais)

**Responsavel:** @ux-design-expert (UMA) + @qa (Quinn)

**Fluxo:**
1. UMA cria design brief (cores, espacamento, tipografia, layout)
2. Quinn roda Design Quality Gate (contraste WCAG, touch targets, tipografia, spacing)
3. Se PASS, @dev implementa
4. Se FAIL/CONCERNS, volta para UMA

**Referencia:** `rules/design-quality-gate.md`

## Gate 3: QA Final (OBRIGATORIO)

**Responsavel:** @qa (Quinn)

Apos @dev implementar, Quinn valida:
- [ ] Copy implementada e identica a aprovada (zero desvios)
- [ ] Design implementado conforme brief
- [ ] Sem regressoes visuais

## Fluxo Canonico

```
Requisito identificado (email, landing, modal, etc.)
  |
  v
Copy squad escreve e aprova textos (Gate 1)
  |
  v
UMA cria design brief (Gate 2a)
  |
  v
Quinn roda Design Quality Gate (Gate 2b)
  |
  v
@dev implementa HTML/componente (so agora)
  |
  v
Quinn roda QA final (Gate 3)
  |
  v
Entrega ao David
```

## Proibicoes

- @dev NAO escreve copy. Implementa copy ja aprovada.
- @dev NAO decide cores, espacamento ou tipografia. Segue design brief.
- Nenhum gate pode ser pulado "para economizar tempo".
- "Copy provisoria" nao existe. Ou esta aprovada ou nao vai para codigo.

## Excecoes

- **Bug fix em texto existente** (typo, acento errado): @dev corrige direto, Quinn valida
- **Placeholder tecnico** (ex: `{firstName}`): permitido, copy squad define o texto ao redor

## Origem

Regra criada apos auditoria dos email templates do Destaka (EPIC-004, outubro 2026).
5 templates de email foram implementados direto pelo @dev sem copy review nem design brief.
Resultado: inconsistencias visuais (3 headers diferentes, 3 cores de CTA, 2 footers), erros de genero da marca ("A Destaka" vs "O Destaka"), e URLs incorretas.

---

**Versao:** 1.0
**Criado:** 2026-10-10 por Orion (AIOX Master)
