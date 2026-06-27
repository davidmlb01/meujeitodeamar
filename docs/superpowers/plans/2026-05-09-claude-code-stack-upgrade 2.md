# Claude Code Stack Upgrade — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instalar e integrar 4 ferramentas do ecossistema Claude Code que ampliam a capacidade operacional do AIOX: multiplexer de terminais (paralelismo real), browser automation MCP (EasySite), monitoramento de agentes (openlogs.dev) e Supabase MCP (Destaka + GMM).

**Architecture:** Cada fase é independente e autocontida. A ordem recomendada é por impacto decrescente: multiplexer primeiro (afeta todos os projetos), browser MCP segundo (desbloqueia EasySite), monitoramento terceiro (observabilidade em YOLO mode), Supabase MCP quarto (habilita @data-engineer autônomo).

**Tech Stack:** Claude Code, gmux.sh, Playwright MCP (@playwright/mcp), openlogs.dev, @supabase/mcp-server-supabase, settings.json do Claude Code (~/.claude/settings.json)

---

## Mapa de Arquivos

| Arquivo | Ação | Responsabilidade |
|---------|------|-----------------|
| `~/.claude/settings.json` | Modificar | Registrar MCPs instalados |
| `~/.claude/CLAUDE.md` | Modificar (se necessário) | Documentar MCPs disponíveis para agentes |
| `docs/easysite/MASTER-BACKUP.md` | Modificar | Atualizar task do prospector com novo MCP |
| `docs/destaka/MASTER-BACKUP.md` | Modificar | Registrar Supabase MCP disponível |
| `docs/gmm/MASTER-BACKUP.md` | Modificar | Registrar Supabase MCP disponível |
| `.aiox-core/data/tool-registry.yaml` | Modificar | Registrar novas ferramentas no registry AIOX |

---

## FASE 1: Multiplexer de Terminais (gmux.sh)

**Objetivo:** Rodar squads AIOX em terminais paralelos na mesma sessão, eliminando o gargalo de sequencialidade entre projetos.

**Critério de sucesso:** Dois agentes AIOX em projetos diferentes executando tarefas simultaneamente em terminais separados.

---

### Task 1.1: Investigar e instalar gmux.sh

**Files:**
- Nenhum arquivo de código. Operação de terminal.

- [ ] **Step 1: Verificar baseline (confirmar que não está instalado)**

```bash
which gmux && gmux --version || echo "gmux NÃO instalado"
```

Esperado: `gmux NÃO instalado`

- [ ] **Step 2: Acessar o repositório oficial e ler o README**

```bash
open https://gmux.sh
```

Ou diretamente:

```bash
curl -s https://raw.githubusercontent.com/gmux-sh/gmux/main/README.md 2>/dev/null | head -80
```

Anotar: método de instalação exato (brew, curl, npm) antes de prosseguir.

- [ ] **Step 3: Instalar via método identificado no README**

Se for Homebrew (mais provável para macOS):

```bash
brew install gmux
```

Se for via curl (alternativa):

```bash
curl -fsSL https://gmux.sh/install.sh | bash
```

- [ ] **Step 4: Verificar instalação**

```bash
gmux --version
```

Esperado: número de versão sem erro.

- [ ] **Step 5: Ler documentação de uso básico**

```bash
gmux --help
```

Anotar: como criar sessão, como nomear janelas, como enviar comandos para janelas específicas.

---

### Task 1.2: Criar workflow de sessão paralela AIOX

**Files:**
- Criar: `bin/aiox-parallel.sh`

- [ ] **Step 1: Definir o que uma sessão paralela AIOX precisa**

Sessão padrão deve ter:
- Janela 1: projeto principal (ex: Destaka)
- Janela 2: projeto secundário (ex: GMM)
- Janela 3: orquestração Orion

- [ ] **Step 2: Criar o script de inicialização**

Conteúdo de `bin/aiox-parallel.sh`:

```bash
#!/bin/bash
# AIOX Parallel Session — inicia sessão multi-projeto no gmux
# Uso: ./bin/aiox-parallel.sh [projeto1] [projeto2]
# Exemplo: ./bin/aiox-parallel.sh destaka gmm

PROJECT1=${1:-"destaka"}
PROJECT2=${2:-"gmm"}
SESSION="aiox-$(date +%H%M)"

gmux new-session -s "$SESSION" -d
gmux new-window -t "$SESSION:0" -n "$PROJECT1"
gmux new-window -t "$SESSION:1" -n "$PROJECT2"
gmux new-window -t "$SESSION:2" -n "orion"

gmux send-keys -t "$SESSION:0" "cd /Users/davidlevy/Desktop/PJ/BIG\ HEAD && echo 'Projeto: $PROJECT1'" Enter
gmux send-keys -t "$SESSION:1" "cd /Users/davidlevy/Desktop/PJ/BIG\ HEAD && echo 'Projeto: $PROJECT2'" Enter
gmux send-keys -t "$SESSION:2" "cd /Users/davidlevy/Desktop/PJ/BIG\ HEAD && echo 'Orion — orquestrador'" Enter

gmux attach-session -t "$SESSION"
```

**Nota:** Ajustar comandos `gmux` conforme sintaxe real identificada no Step 1.2.5 da task anterior. Se a sintaxe for diferente de tmux, adaptar `new-session`, `new-window`, `send-keys`.

- [ ] **Step 3: Tornar o script executável**

```bash
chmod +x /Users/davidlevy/Desktop/PJ/BIG\ HEAD/bin/aiox-parallel.sh
```

- [ ] **Step 4: Testar o script**

```bash
./bin/aiox-parallel.sh destaka gmm
```

Esperado: 3 janelas abertas, cada uma no diretório correto.

- [ ] **Step 5: Commit**

```bash
git add bin/aiox-parallel.sh
git commit -m "feat: script de sessão paralela AIOX com gmux"
```

---

## FASE 2: Browser Automation MCP (EasySite)

**Objetivo:** Integrar Playwright MCP ao Claude Code para automatizar prospecção de leads no EasySite, substituindo o `prospector.py` manual.

**Critério de sucesso:** Agente AIOX consegue navegar em sites via MCP, identificar sites desatualizados e extrair dados de contato sem intervenção humana.

---

### Task 2.1: Instalar Playwright MCP

**Files:**
- Modificar: `~/.claude/settings.json`

- [ ] **Step 1: Verificar se já existe algum browser MCP instalado**

```bash
cat ~/.claude/settings.json | grep -i "browser\|playwright\|puppeteer" || echo "Nenhum browser MCP encontrado"
```

Esperado: `Nenhum browser MCP encontrado`

- [ ] **Step 2: Instalar o pacote Playwright MCP globalmente**

```bash
npm install -g @playwright/mcp
```

- [ ] **Step 3: Instalar dependências do Playwright (browsers)**

```bash
npx playwright install chromium
```

Esperado: download e instalação do Chromium. Pode levar 2-3 minutos.

- [ ] **Step 4: Verificar instalação**

```bash
npx @playwright/mcp --version
```

Esperado: número de versão.

- [ ] **Step 5: Registrar o MCP no settings.json do Claude Code**

Abrir `~/.claude/settings.json`. Adicionar dentro de `"mcpServers"`:

```json
"playwright": {
  "command": "npx",
  "args": ["@playwright/mcp@latest"],
  "env": {}
}
```

Se `"mcpServers"` não existir, criar o bloco:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {}
    }
  }
}
```

- [ ] **Step 6: Reiniciar o Claude Code e verificar que o MCP aparece**

Fechar e abrir o Claude Code. Digitar `/mcp` e verificar que "playwright" aparece na lista.

---

### Task 2.2: Integrar browser MCP ao workflow EasySite

**Files:**
- Criar: `agente_tiktok/prospector_mcp.md` (instrução de uso para @analyst)
- Modificar: `docs/easysite/MASTER-BACKUP.md`

- [ ] **Step 1: Documentar o padrão de uso do Playwright MCP para prospecção**

Criar `agente_tiktok/prospector_mcp.md` com o seguinte conteúdo:

```markdown
# Playwright MCP — Prospecção EasySite

## Uso via AIOX (@analyst)

O Playwright MCP permite ao @analyst automatizar a busca de leads PMEs
com sites desatualizados.

## Padrão de Prospecção

1. Acessar lista de categorias no Google Maps para uma cidade-alvo
2. Para cada resultado: acessar o site vinculado
3. Verificar indicadores de site desatualizado:
   - Copyright year < 2023
   - Ausência de SSL (http://)
   - Ausência de viewport meta tag (não responsivo)
   - Tecnologia detectada: Flash, jQuery < 2.0
4. Extrair: nome do negócio, telefone, email (se visível), URL

## Ferramenta MCP disponível

Nome no settings.json: `playwright`
Capacidades: navegação, screenshot, extração de texto, clique, formulários
```

- [ ] **Step 2: Atualizar MASTER-BACKUP do EasySite**

Adicionar em `docs/easysite/MASTER-BACKUP.md` na seção de infraestrutura:

```
[x] Playwright MCP instalado — prospecção automática disponível para @analyst
```

- [ ] **Step 3: Testar com um comando simples no Claude Code**

No Claude Code, digitar:

```
Use the playwright MCP to navigate to https://example.com and return the page title
```

Esperado: título "Example Domain" retornado sem erro.

- [ ] **Step 4: Commit**

```bash
git add agente_tiktok/prospector_mcp.md docs/easysite/MASTER-BACKUP.md
git commit -m "feat(easysite): integração Playwright MCP para prospecção automática"
```

---

## FASE 3: Monitoramento de Agentes (openlogs.dev)

**Objetivo:** Ter observabilidade das sessões AIOX em YOLO mode. Saber o que cada agente executou, onde falhou e quais decisões tomou.

**Critério de sucesso:** Dashboard no openlogs.dev mostrando logs de pelo menos uma sessão AIOX completa.

---

### Task 3.1: Configurar openlogs.dev

**Files:**
- Modificar: `~/.claude/settings.json`

- [ ] **Step 1: Criar conta no openlogs.dev**

```bash
open https://openlogs.dev
```

Criar conta. Anotar: API key gerada após signup.

- [ ] **Step 2: Verificar método de integração com Claude Code**

Na documentação do openlogs.dev, identificar se a integração é via:
- MCP server (registrar em settings.json)
- Hook de PostToolUse (registrar em settings.json hooks)
- CLI wrapper

Seguir o método documentado. Os passos abaixo assumem integração via MCP (mais provável):

- [ ] **Step 3: Instalar o agente openlogs (se existir pacote npm)**

```bash
npm install -g @openlogs/mcp
```

Se o pacote não existir com esse nome, verificar no dashboard do openlogs.dev o comando exato de instalação.

- [ ] **Step 4: Registrar em settings.json**

Adicionar em `~/.claude/settings.json` dentro de `"mcpServers"`:

```json
"openlogs": {
  "command": "npx",
  "args": ["@openlogs/mcp@latest"],
  "env": {
    "OPENLOGS_API_KEY": "SUA_API_KEY_AQUI"
  }
}
```

Substituir `SUA_API_KEY_AQUI` pela chave gerada no Step 3.1.1.

- [ ] **Step 5: Reiniciar Claude Code e verificar que o MCP aparece**

Digitar `/mcp` e confirmar "openlogs" na lista.

- [ ] **Step 6: Executar uma sessão de teste e verificar logs no dashboard**

Executar qualquer comando simples no Claude Code (ler um arquivo, por exemplo). Acessar o dashboard do openlogs.dev e confirmar que a ação aparece nos logs.

---

## FASE 4: Supabase MCP (Destaka + GMM)

**Objetivo:** Habilitar o @data-engineer (Dara) a executar migrations, verificar RLS policies e otimizar queries diretamente via MCP, sem precisar abrir o dashboard Supabase manualmente.

**Critério de sucesso:** @data-engineer consegue listar tabelas, criar migration e verificar RLS policy via MCP no Claude Code.

---

### Task 4.1: Instalar Supabase MCP

**Files:**
- Modificar: `~/.claude/settings.json`

- [ ] **Step 1: Verificar credenciais Supabase disponíveis**

Identificar para cada projeto:
- Destaka: `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (verificar em Vercel env ou `.env.local`)
- GMM: mesmo processo

```bash
cat /Users/davidlevy/Desktop/PJ/BIG\ HEAD/docs/destaka/.env.local 2>/dev/null | grep SUPABASE || echo "Verificar Vercel dashboard"
```

**Atenção:** Não commitar chaves. Usar apenas em environment variables locais.

- [ ] **Step 2: Instalar o pacote MCP do Supabase**

```bash
npm install -g @supabase/mcp-server-supabase
```

- [ ] **Step 3: Verificar instalação**

```bash
npx @supabase/mcp-server-supabase --help
```

Esperado: lista de opções de configuração sem erro.

- [ ] **Step 4: Registrar em settings.json com configuração para Destaka**

Adicionar em `~/.claude/settings.json` dentro de `"mcpServers"`:

```json
"supabase-destaka": {
  "command": "npx",
  "args": ["@supabase/mcp-server-supabase@latest"],
  "env": {
    "SUPABASE_URL": "URL_DO_DESTAKA",
    "SUPABASE_SERVICE_ROLE_KEY": "CHAVE_SERVICE_ROLE_DESTAKA"
  }
},
"supabase-gmm": {
  "command": "npx",
  "args": ["@supabase/mcp-server-supabase@latest"],
  "env": {
    "SUPABASE_URL": "URL_DO_GMM",
    "SUPABASE_SERVICE_ROLE_KEY": "CHAVE_SERVICE_ROLE_GMM"
  }
}
```

Substituir os placeholders pelas chaves reais identificadas no Step 4.1.1.

- [ ] **Step 5: Reiniciar Claude Code e verificar os dois MCPs**

Digitar `/mcp` e confirmar "supabase-destaka" e "supabase-gmm" na lista.

---

### Task 4.2: Validar capacidades do @data-engineer com o MCP

**Files:**
- Modificar: `docs/destaka/MASTER-BACKUP.md`
- Modificar: `docs/gmm/MASTER-BACKUP.md`

- [ ] **Step 1: Testar listagem de tabelas via MCP**

No Claude Code:

```
Use the supabase-destaka MCP to list all tables in the database
```

Esperado: lista de tabelas do Destaka sem erro.

- [ ] **Step 2: Testar leitura de RLS policies**

```
Use the supabase-destaka MCP to show all RLS policies for the leads table
```

Esperado: políticas RLS retornadas. Isso resolve a pendência de segurança identificada na auditoria de maio/2026.

- [ ] **Step 3: Atualizar MASTER-BACKUPs**

Em `docs/destaka/MASTER-BACKUP.md` e `docs/gmm/MASTER-BACKUP.md`, adicionar na seção de infraestrutura:

```
[x] Supabase MCP instalado — @data-engineer pode executar queries, migrations e auditar RLS via Claude Code
```

- [ ] **Step 4: Commit final da fase**

```bash
git add docs/destaka/MASTER-BACKUP.md docs/gmm/MASTER-BACKUP.md ~/.claude/settings.json
git commit -m "feat(infra): Supabase MCP configurado para Destaka e GMM"
```

---

## FASE 5: Registro no AIOX Tool Registry

**Objetivo:** Garantir que os 4 novos recursos aparecem no IDS entity registry para que os agentes possam descobri-los via `*ids check`.

**Files:**
- Modificar: `.aiox-core/data/tool-registry.yaml`

- [ ] **Step 1: Abrir o tool registry atual**

```bash
cat .aiox-core/data/tool-registry.yaml | head -50
```

Identificar o formato de entrada existente.

- [ ] **Step 2: Adicionar os 4 novos recursos**

Adicionar ao final do `.aiox-core/data/tool-registry.yaml` seguindo o formato identificado:

```yaml
- id: tool/gmux
  name: gmux.sh
  type: terminal-multiplexer
  description: Sessões paralelas de agentes AIOX. Rodar múltiplos projetos simultaneamente.
  usedBy: [aiox-master, dev, sm, analyst]
  script: bin/aiox-parallel.sh
  status: active

- id: tool/playwright-mcp
  name: Playwright MCP
  type: mcp-browser
  description: Browser automation para prospecção EasySite e testes E2E.
  usedBy: [analyst, qa]
  mcpKey: playwright
  status: active

- id: tool/openlogs
  name: openlogs.dev
  type: mcp-monitoring
  description: Observabilidade de sessões AIOX. Logs de todos os agentes em YOLO mode.
  usedBy: [aiox-master]
  mcpKey: openlogs
  status: active

- id: tool/supabase-mcp
  name: Supabase MCP
  type: mcp-database
  description: Acesso direto ao banco para @data-engineer. Migrations, RLS, queries.
  usedBy: [data-engineer, architect]
  mcpKeys: [supabase-destaka, supabase-gmm]
  status: active
```

- [ ] **Step 3: Validar YAML**

```bash
python3 -c "import yaml; yaml.safe_load(open('.aiox-core/data/tool-registry.yaml'))" && echo "YAML válido" || echo "ERRO no YAML"
```

Esperado: `YAML válido`

- [ ] **Step 4: Commit final**

```bash
git add .aiox-core/data/tool-registry.yaml
git commit -m "chore(aiox): registrar gmux, playwright-mcp, openlogs e supabase-mcp no tool-registry"
```

---

## Revisão do Plano

### Cobertura dos requisitos

| Item do Tier 1/2 | Task |
|-----------------|------|
| gmux.sh (paralelismo) | Fase 1 |
| Browser MCP EasySite | Fase 2 |
| openlogs.dev (monitoramento) | Fase 3 |
| Supabase MCP Destaka+GMM | Fase 4 |
| Registro AIOX | Fase 5 |
| ecc.tools (revisão mensal) | Não incluso. Ação manual: agendar revisão mensal de 30 min. |
| Vercel Workflow | Não incluso. Relevante somente quando dev de Destaka/GMM iniciar. Criar plano separado nesse momento. |

### Scan de placeholders

Todos os steps com valores desconhecidos usam linguagem explícita de investigação ("verificar no dashboard", "anotar o comando exato") com passo de investigação como Step real, não como placeholder.

### Consistência de tipos

Todos os scripts e configurações usam `npx` como executor de MCP. `settings.json` mantém estrutura consistente de `"command": "npx"` + `"args"` em todos os 4 MCPs.

---

*Plano criado em 2026-05-09 por Orion (aiox-master)*
