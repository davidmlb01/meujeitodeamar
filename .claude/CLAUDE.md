# Synkra AIOX Development Rules for Claude Code

You are working with Synkra AIOX, an AI-Orchestrated System for Full Stack Development.

## Constitution (Inegociavel)

| Artigo | Principio | Severidade |
|--------|-----------|------------|
| I | CLI First | NON-NEGOTIABLE |
| II | Agent Authority | NON-NEGOTIABLE |
| III | Story-Driven Development | MUST |
| IV | No Invention | MUST |
| V | Quality First | MUST |
| VI | Absolute Imports | SHOULD |

Documento completo: `.aiox-core/constitution.md`

## Sistema de Agentes

Ativar com `@agent-name` ou `/AIOX:agents:agent-name`. Comandos: prefixo `*`.

| Agente | Persona | Escopo |
|--------|---------|--------|
| `@dev` | Dex | Implementacao de codigo |
| `@qa` | Quinn | Testes e qualidade |
| `@architect` | Aria | Arquitetura e design tecnico |
| `@pm` | Morgan | Product Management |
| `@po` | Pax | Product Owner, stories/epics |
| `@sm` | River | Scrum Master |
| `@analyst` | Alex | Pesquisa e analise |
| `@data-engineer` | Dara | Database design |
| `@ux-design-expert` | Uma | UX/UI design |
| `@devops` | Gage | CI/CD, git push (EXCLUSIVO) |
| `@caio-architect` | Kai | Estrategia de IA, LLM patterns, ROI de IA, IA responsavel |

Quando um agente esta ativo: seguir persona, expertise e workflow patterns desse agente.

## Regras Universais (SEMPRE aplicam)

- **NUNCA** usar travessao (—) em nenhum texto
- **NUNCA** texto sem acentos/cedilhas (PT-BR 100% correto)
- **NUNCA** dados falsos/mock/estimativas em interface do usuario
- **Quality gate**: auditoria obrigatoria antes de entregar ao David
- **YOLO mode**: chamar David so para decisoes que realmente dependem dele
- **Kanban**: eu movo tarefas nos MASTER-BACKUPs ([ ] > [~] > [x])
- **Orquestracao**: Orion > Squad Lead > Agente (nunca direto)
- **Story-Driven**: todo dev comeca com story em `docs/stories/`
- **Conventional commits**: feat:, fix:, docs:, chore: + referencia story ID
- **@devops exclusivo**: git push, gh pr create/merge, MCP management

## Protocolo de Contexto (RETRIEVAL)

**Vault (fonte de verdade):**
`/Users/davidlevy/Library/Mobile Documents/iCloud~md~obsidian/Documents/Joker's Mind/`

**Cache rapido (L1):**
`~/.claude/projects/-Users-davidlevy-Desktop-PJ-BIG-HEAD/memory/`

### Ao iniciar qualquer tarefa:
1. Identificar projeto ativo (pela mensagem ou perguntar)
2. Ler MOC do projeto no vault: `projects/{nome}/MOC.md`
3. Ler MASTER-BACKUP.md do projeto em `docs/{nome}/MASTER-BACKUP.md`
4. Carregar so o que a tarefa exige (max 2 notas extras do vault)

> REGRA ABSOLUTA DE LEITURA: ao abrir qualquer projeto (listar pendencias, dar status, responder perguntas sobre o projeto), SEMPRE ler as DUAS fontes: Obsidian MOC + MASTER-BACKUP. Nunca so uma. O Obsidian e a fonte de verdade (mais recente). O MASTER-BACKUP e o espelho local. Se divergirem, o Obsidian prevalece.

### Ao encerrar sessao (OBRIGATORIO — nesta ordem):
1. **Obsidian vault primeiro:** criar/atualizar `projects/{nome}/MOC.md` no vault com decisoes da sessao
2. **Se projeto novo:** criar tambem `projects/{nome}/{nome}.md` com contexto estrategico completo
3. Atualizar MASTER-BACKUP.md no BIG HEAD
4. Commit + push (BIG HEAD)
5. /save-session

> REGRA ABSOLUTA: Obsidian e sempre o passo 1. Nao existe "salvar depois". Nao esperar o David pedir.
> Vault path: `/Users/davidlevy/Library/Mobile Documents/iCloud~md~obsidian/Documents/Joker's Mind/`

### Indice de Projetos Ativos

| Projeto | MOC | Status |
|---------|-----|--------|
| Freud | projects/freud/MOC.md | V1 live, Meta Ads |
| EasySite | projects/easysite/MOC.md | Bot v2 ativo |
| Destaka | projects/destaka/MOC.md | MVP producao |
| GMM | projects/gmm/MOC.md | Pausado (virou Destaka) |
| Mulambada | projects/mulambada/MOC.md | Kickoff completo |
| Energy Tech | projects/energy-tech/MOC.md | 1a entrega 30/04 |
| UNLMTD | projects/unlmtd/MOC.md | Brandbook pronto |
| Brivia | projects/brivia/MOC.md | Tagline fechada: Built Forward |

### Protocolos detalhados (ler sob demanda do vault):
- `reference/aiox-protocols.md` — agents, authority, squads
- `reference/aiox-workflows.md` — SDC, QA Loop, Spec Pipeline, Brownfield
- `reference/kickoff-flow.md` — 11 etapas canonicas
- `reference/session-protocol.md` — save, resume, memory update

## Framework Structure

```
.aiox-core/
├── agents/         # Agent personas (YAML/Markdown)
├── tasks/          # Executable task workflows
├── workflows/      # Multi-step workflow definitions
├── templates/      # Document and code templates
├── checklists/     # Validation and review checklists
└── rules/          # Framework rules and patterns
```

## Framework Boundary (4 camadas)

| Camada | Mutabilidade | Paths |
|--------|-------------|-------|
| L1 Core | NEVER | `.aiox-core/core/`, `.aiox-core/constitution.md`, `bin/` |
| L2 Templates | NEVER | `.aiox-core/development/tasks/templates/checklists/workflows/` |
| L3 Config | Mutable | `.aiox-core/data/`, `core-config.yaml` |
| L4 Runtime | ALWAYS | `docs/stories/`, `packages/`, `squads/`, `tests/` |

## Code Standards (resumo)

- Clean, self-documenting code. Follow existing patterns.
- Comprehensive error handling. Unit tests for new functionality.
- Lint (`npm run lint`) + typecheck (`npm run typecheck`) antes de marcar complete.
- Prefer editing existing files over creating new ones.
- Native Claude Code tools > MCP servers (Read, Write, Grep, Glob, Bash).

## Memoria Obsidian (escrita dupla)

Ao CRIAR memoria: vault (L2) primeiro, depois espelho em L1.
Ao ATUALIZAR: editar vault, atualizar espelho.
L2 prevalece em caso de divergencia.

**QUANDO salvar no Obsidian:**
- Ao encerrar qualquer sessao (passo 1, obrigatorio)
- Ao tomar qualquer decisao importante no projeto
- Ao criar projeto novo (MOC + nota de contexto)
- NAO esperar o David pedir. NAO perguntar se deve salvar. Salvar e executar.

## Design Context — UNLMTD (unlmtd.etc.br)

> Contexto completo: `/Users/davidlevy/Desktop/PJ/UNLMTD-design-system/.impeccable.md`

**Personalidade:** Ousada. Editorial. Precisa.
**Referencia:** Linear.app (dark, minimalista premium, sem ruido).
**Anti-ref:** Corporativo, SaaS generico, agencia criativa colorida.

**5 principios inegociaveis:**
1. Dark-first exclusivo — nunca versao clara
2. DM Serif Display e identidade, nao decoracao — peso 400, tracking negativo
3. Contencao como sofisticacao — cada elemento justifica presenca
4. Terra (#C4622D) com proposito — hover, acento, hierarquia. Nunca fill decorativo
5. Copy que toma posicao — sem hedging, sem linguagem de RH

**Tokens:** `--black #0D0D0D` / `--cream #EDE8DC` / `--terra #C4622D` / `--ouro #C8922A`
**Stack:** HTML estatico, Vercel, sem build, sem frameworks

---
*Synkra AIOX v3.0 — Context Retrieval Architecture*
