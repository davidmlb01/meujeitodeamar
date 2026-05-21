# Playwright MCP — Prospecção EasySite

## Uso via AIOX (@analyst)

O Playwright MCP permite ao @analyst automatizar a busca de leads PMEs com sites desatualizados, substituindo o `prospector.py` manual.

## Padrão de Prospecção

1. Acessar lista de categorias no Google Maps para uma cidade-alvo
2. Para cada resultado: acessar o site vinculado
3. Verificar indicadores de site desatualizado:
   - Copyright year < 2023
   - Ausência de SSL (http://)
   - Ausência de viewport meta tag (não responsivo)
   - Tecnologia detectada: Flash, jQuery < 2.0
4. Extrair: nome do negócio, telefone, email (se visível), URL

## Capacidades do MCP

Nome no .mcp.json: `playwright`
Versão: 0.0.75

Operações suportadas:
- Navegação a URLs
- Screenshots de páginas
- Extração de texto e HTML
- Clique em elementos
- Preenchimento de formulários
- Análise de page source (verificar tecnologia)
- Avaliação de JavaScript (DOM inspection)

## Configuração

O MCP está registrado em `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

## Próximas Etapas (Fase 3 em andamento)

- [ ] Criar task AIOX @analyst: "Rodar prospecção automática com Playwright MCP"
- [ ] Integrar resultados com o bot v2.0 do EasySite
- [ ] Monitoramento de leads frescos via openlogs.dev

---

*Documentação criada em 2026-05-09 | Parte do Upgrade Claude Code Stack*
