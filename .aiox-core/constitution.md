# Synkra AIOX Constitution

> **Version:** 1.1.0 | **Ratified:** 2025-01-30 | **Last Amended:** 2026-07-09
> **Amendments:** Articles XI-XII (CORE-SUPER-UPDATE Wave E; hub lineage, OSS-safe)

Este documento define os principios fundamentais e inegociaveis do Synkra AIOX. Todos os agentes, tasks, e workflows DEVEM respeitar estes principios. Violacoes sao bloqueadas automaticamente via gates.

---

## Core Principles

### I. CLI First (NON-NEGOTIABLE)

O CLI e a fonte da verdade onde toda inteligencia, execucao, e automacao vivem.

**Regras:**
- MUST: Toda funcionalidade nova DEVE funcionar 100% via CLI antes de qualquer UI
- MUST: Dashboards apenas observam, NUNCA controlam ou tomam decisoes
- MUST: A UI NUNCA e requisito para operacao do sistema
- MUST: Ao decidir onde implementar, sempre CLI > Observability > UI

**Hierarquia:**
```
CLI (Maxima) → Observability (Secundaria) → UI (Terciaria)
```

**Gate:** `dev-develop-story.md` - WARN se UI criada antes de CLI funcional

---

### II. Agent Authority (NON-NEGOTIABLE)

Cada agente tem autoridades exclusivas que nao podem ser violadas.

**Regras:**
- MUST: Apenas @devops pode executar `git push` para remote
- MUST: Apenas @devops pode criar Pull Requests
- MUST: Apenas @devops pode criar releases e tags
- MUST: Agentes DEVEM delegar para o agente apropriado quando fora de seu escopo
- MUST: Nenhum agente pode assumir autoridade de outro

**Exclusividades:**

| Autoridade | Agente Exclusivo |
|------------|------------------|
| git push | @devops |
| PR creation | @devops |
| Release/Tag | @devops |
| Story creation | @sm, @po |
| Architecture decisions | @architect |
| Quality verdicts | @qa |

**Gate:** Implementado via definicao de agentes (nao requer gate adicional)

---

### III. Story-Driven Development (MUST)

Todo desenvolvimento comeca e termina com uma story.

**Regras:**
- MUST: Nenhum codigo e escrito sem uma story associada
- MUST: Stories DEVEM ter acceptance criteria claros antes de implementacao
- MUST: Progresso DEVE ser rastreado via checkboxes na story
- MUST: File List DEVE ser mantida atualizada na story
- SHOULD: Stories seguem o workflow: @po/@sm cria → @dev implementa → @qa valida → @devops push

**Gate:** `dev-develop-story.md` - BLOCK se nao houver story valida

---

### IV. No Invention (MUST)

Especificacoes nao inventam - apenas derivam dos requisitos.

**Regras:**
- MUST: Todo statement em spec.md DEVE rastrear para:
  - Um requisito funcional (FR-*)
  - Um requisito nao-funcional (NFR-*)
  - Uma constraint (CON-*)
  - Um finding de research (verificado e documentado)
- MUST NOT: Adicionar features nao presentes nos requisitos
- MUST NOT: Assumir detalhes de implementacao nao pesquisados
- MUST NOT: Especificar tecnologias nao validadas

**Gate:** `spec-write-spec.md` - BLOCK se spec contiver invencoes

---

### V. Quality First (MUST)

Qualidade nao e negociavel. Todo codigo passa por multiplos gates antes de merge.

**Regras:**
- MUST: `npm run lint` passa sem erros
- MUST: `npm run typecheck` passa sem erros
- MUST: `npm test` passa sem falhas
- MUST: `npm run build` completa com sucesso
- MUST: CodeRabbit nao reporta issues CRITICAL
- MUST: Story status e "Done" ou "Ready for Review"
- SHOULD: Cobertura de testes nao diminui

**Gate:** `pre-push.md` - BLOCK se qualquer check falhar

---

### VI. Absolute Imports (SHOULD)

Imports relativos criam acoplamento e dificultam refatoracao.

**Regras:**
- SHOULD: Sempre usar imports absolutos com alias `@/`
- SHOULD NOT: Usar imports relativos (`../../../`)
- EXCEPTION: Imports dentro do mesmo modulo/feature podem ser relativos

**Exemplo:**
```typescript
// CORRETO
import { useStore } from '@/stores/feature/store'

// INCORRETO
import { useStore } from '../../../stores/feature/store'
```

**Gate:** ESLint rule (ja implementado)

---

### XI. Squad-First Portability (NON-NEGOTIABLE)

`squads/` is the source of truth for executable squad artifacts. Runtime projections (`.claude/`, `.codex/`, `.gemini/`, `.grok/`) are **derived**, never canonical.

**Rules:**
- MUST: Scripts, templates, data, and checklists that belong to a squad live under `squads/{squad}/`
- MUST: IDE projections (e.g. `.claude/skills/`) contain frontmatter + instructions only, **not** hidden executable SOT logic for squad-owned skills
- MUST: Sync direction is always `squads/` → runtime projection, never the reverse for squad-owned artifacts
- MUST: Executable artifacts must work regardless of which runtime invokes them (Claude, Codex, Gemini, Grok, or future hosts)
- SHOULD: Standalone skills without a squad owner may live directly in a projection

**Portability hierarchy:**
```
squads/{squad}/ (SOT) → .claude/skills/ (Claude projection)
                      → .codex/ (Codex projection)
                      → .gemini/ (Gemini projection)
                      → .grok/ (Grok projection)
                      → future runtimes
```

**Gate:** skill/IDE sync validators, WARN if executable SOT is only inside a runtime projection for a squad-owned skill

**Rationale:** Artifacts that live only under one IDE folder are host-locked. AIOX is runtime-agnostic by design, value is in the process, not the IDE.

**OSS note:** Framework core agents live under `.aiox-core/development/`; squad expansions use `squads/`. Both remain portable across IDEs via sync scripts.

---

### XII. Model Governance (MUST)

Automated or agent-dispatched model access MUST respect budget ceilings, routing authority, story traceability, and intent security scanning.

**Rationale:** Unbounded model loops create cost risk, config drift, and injection surface not covered by Articles I-XI alone.

**Rules:**

**XII-A. Budget Ceilings (NON-NEGOTIABLE when auto-dispatch is used):**
- MUST: Any auto-dispatch / multi-model loop MUST declare a budget ceiling before the first model call (config key e.g. `model_routing.budget_ceiling_usd` or env override)
- MUST: Routing SHOULD degrade model tier as budget pressure rises (soft guidance: >50% pressure prefer lighter tiers; 100% → hard stop + human escalate)
- MUST NOT: A dispatch loop may not silently ignore a declared ceiling

**XII-B. Routing Authority (NON-NEGOTIABLE):**
- MUST: Model routing configuration in `core-config.yaml` (e.g. `model_routing.*`) is owned exclusively by **@devops** for deployment changes
- MUST: Threshold / policy changes require **@architect** review (PR)
- MUST NOT: Other agents may not unilaterally change production routing config

**XII-C. Story Binding (NON-NEGOTIABLE for auto-dispatch):**
- MUST: Auto-dispatched implementation work MUST bind to a valid story id/path
- MUST NOT: Anonymous auto-dispatch of product code without a story (shadow work)

**XII-D. Intent / Injection Scan (NON-NEGOTIABLE for automated intents):**
- MUST: Intents entering via automation (cron, webhook, programmatic dispatch) MUST be scanned for prompt injection before processing
- MUST: Scans SHOULD cover invisible unicode, system-prompt override attempts, path traversal in intent strings, and obvious code-injection payloads (align with `prompt-guard` / permissions guards)
- MUST: Failed scans are rejected, logged, and never executed

**Gate:** Prefer existing quality / permissions / pre-dispatch gates, BLOCK on XII-A/B/C/D violations when auto-dispatch is active. Manual interactive agent sessions follow I-VI primarily; XII still applies when automation or multi-model routing is engaged.

**OSS strip (do not reintroduce):** product-only chiefs, multi-BU workspace bus as constitutional MUST, tribunal harnesses, hard-coded product deploy hosts.

---

## Governance

### Amendment Process

1. Proposta de mudanca documentada com justificativa
2. Review por @architect e @po
3. Aprovacao requer consenso
4. Mudanca implementada com atualizacao de versao
5. Propagacao para templates e tasks dependentes

### Versioning

- **MAJOR:** Remocao ou redefinicao incompativel de principio
- **MINOR:** Novo principio ou expansao significativa
- **PATCH:** Clarificacoes, correcoes de texto, refinamentos

### Compliance

- Todos os PRs DEVEM verificar compliance com Constitution
- Gates automaticos BLOQUEIAM violacoes de principios NON-NEGOTIABLE
- Gates automaticos ALERTAM violacoes de principios MUST
- Violacoes de SHOULD sao reportadas mas nao bloqueiam

### Gate Severity Levels

| Severidade | Comportamento | Uso |
|------------|---------------|-----|
| BLOCK | Impede execucao, requer correcao | NON-NEGOTIABLE, MUST criticos |
| WARN | Permite continuar com alerta | MUST nao-criticos |
| INFO | Apenas reporta | SHOULD |

---

## References

- **Principios derivados de:** `.claude/CLAUDE.md`
- **Inspirado por:** GitHub Spec-Kit Constitution System
- **Gates implementados em:** `.aiox-core/development/tasks/`
- **Checklists relacionados:** `.aiox-core/product/checklists/`

---

*Synkra AIOX Constitution v1.1.0*
*CLI First | Agent-Driven | Quality First | Squad-First Portability | Model Governance*
