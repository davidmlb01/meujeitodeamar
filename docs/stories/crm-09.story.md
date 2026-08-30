---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-02a"]
note: "Conteudo original da CRM-05 v1.0 (Import CSV), movido para abrir espaco no roadmap"
---

# Story CRM-09: Import de Pacientes via CSV

## Status

Draft

## Story

**As a** profissional de saude,
**I want** importar minha base de pacientes de outros sistemas via CSV,
**so that** eu nao precise cadastrar centenas de pacientes manualmente e possa comecar a usar o CRM com minha base real desde o primeiro dia.

## Acceptance Criteria

1. Pagina `/import` com template CSV disponivel para download
2. Upload de arquivo CSV: drag-and-drop ou click, apenas .csv, maximo 5MB
3. Validacao pre-import com preview (Valido / Invalido / Duplicata)
4. Import confirmado: apenas linhas validas inseridas em batch
5. Relatorio pos-import: X importados, Y duplicatas, Z erros
6. Pacientes importados recebem `acquisition_source = 'import'` e `lgpd_whatsapp = false`
7. Conversao automatica de telefone nacional para E.164
8. Compatibilidade com exports do iClinic e Simples Dental

## Dev Notes

Conteudo tecnico completo preservado da CRM-05 v1.0. Consultar historico git para detalhes de tasks e subtasks.

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada como CRM-05 | River (sm) |
| 2026-08-30 | 2.0 | Movida para CRM-09, conteudo resumido | Morgan (pm) |
