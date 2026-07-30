---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-02a"]
---

# Story CRM-05: Import de Pacientes via CSV

## Status

Draft

## Story

**As a** profissional de saude,
**I want** importar minha base de pacientes de outros sistemas via CSV,
**so that** eu nao precise cadastrar centenas de pacientes manualmente e possa comecar a usar o CRM com minha base real desde o primeiro dia.

## Acceptance Criteria

1. Pagina `/import` com template CSV disponivel para download (campos: nome, telefone, email, data_nascimento, ultima_visita, especialidade)
2. Upload de arquivo CSV: drag-and-drop ou click, aceita apenas .csv, maximo 5MB
3. Validacao pre-import com preview antes de confirmar:
   - Linha por linha classificada em: Valido / Invalido / Duplicata
   - Invalido: nome vazio, telefone invalido (nao E.164 ou nao conversivel)
   - Duplicata: telefone ja existe para a mesma org em `patients`
   - Preview exibe as primeiras 10 linhas + contagem total de cada categoria
4. Import confirmado: apenas linhas Validas sao inseridas (batch INSERT em `patients`)
   - Duplicatas sao ignoradas silenciosamente (nao sobrescreve dados existentes)
   - Linhas invalidas sao ignoradas com log de quais linhas falharam
5. Relatorio pos-import exibido ao usuario: X pacientes importados, Y duplicatas ignoradas, Z linhas com erro (com lista das linhas de erro e motivo)
6. Pacientes importados recebem `acquisition_source = 'import'` e `lgpd_whatsapp = false` por padrao (consentimento precisa ser coletado individualmente)
7. Conversao de telefone: numeros em formato nacional brasileiro (ex: 11999999999) sao convertidos para E.164 (+5511999999999) automaticamente antes da validacao
8. Teste de compatibilidade: import funciona com arquivo exportado do iClinic e do Simples Dental (formatos reais testados pelo @qa)

## Tasks / Subtasks

- [ ] Task 1 — Template CSV e pagina (AC: 1, 2)
  - [ ] Criar pagina /import com instrucoes e download do template
  - [ ] Template CSV: arquivo estatico com cabecalhos corretos e 2 linhas de exemplo
  - [ ] Componente de upload com drag-and-drop (usar `react-dropzone` ou nativo)
  - [ ] Validar: apenas .csv aceito, maximo 5MB

- [ ] Task 2 — Parser e validacao (AC: 3, 7)
  - [ ] Instalar `papaparse` para parse de CSV no servidor
  - [ ] Criar `/api/import/route.ts` com endpoint POST
  - [ ] Logica de validacao por linha: nome (obrigatorio), telefone (conversao E.164 + validacao)
  - [ ] Deteccao de duplicatas: query em `patients` por telefone dentro da org
  - [ ] Retornar preview: { valid: [], invalid: [{row, reason}], duplicate: [{row}] }

- [ ] Task 3 — Preview e confirmacao (AC: 3)
  - [ ] Apos upload e parse: exibir tabela de preview com 3 categorias
  - [ ] Contadores: "X validos, Y duplicatas, Z invalidos"
  - [ ] Botao "Confirmar import" (so aparece se houver ao menos 1 valido)
  - [ ] Botao "Cancelar" descarta o parse e volta ao upload

- [ ] Task 4 — Import e relatorio (AC: 4, 5, 6)
  - [ ] POST /api/import/confirm: recebe array de linhas validas, INSERT em batch
  - [ ] `acquisition_source = 'import'`, `lgpd_whatsapp = false` em todos os importados
  - [ ] Retornar relatorio: { imported, duplicates_skipped, errors: [{row, reason}] }
  - [ ] Exibir relatorio na pagina com opcao de download (texto simples)

## Dev Notes

### Papaparse
Usar `papaparse` no servidor (Node.js). Configurar com `header: true` para usar os nomes das colunas. Tratar BOM (byte order mark) que alguns sistemas exportam: `skipEmptyLines: true`.

### Conversao de telefone para E.164
Logica simples para Brasil:
1. Remover tudo que nao e digito
2. Se comecar com 55 e tiver 12-13 digitos: adicionar +
3. Se tiver 10-11 digitos: adicionar +55
4. Validar resultado: deve comecar com +55 e ter 12-13 caracteres
Usar `libphonenumber-js` como fallback para casos ambiguos.

### Batch INSERT
Usar `supabase.from('patients').insert([...rows])` com array de ate 500 rows por vez. Para arquivos maiores, processar em batches de 500.

### Arquivos de teste necessarios
Para o AC 8, o @qa precisa obter exports reais:
- iClinic: Menu Relatorios -> Exportar Pacientes -> CSV
- Simples Dental: Configuracoes -> Exportar -> Pacientes -> CSV
O formato pode variar — o parser deve ser tolerante a colunas extras (ignorar) e colunas faltando (usar defaults).

### LGPD no import
Todos os pacientes importados ficam com `lgpd_whatsapp = false`. O profissional e responsavel por obter consentimento de seus pacientes (template de mensagem LGPD fornecido no onboarding do beta). Apos obter consentimento, o profissional atualiza cada paciente individualmente no perfil.

## Testing

- Upload de arquivo .xlsx: deve rejeitar com mensagem "Apenas CSV aceito"
- Upload de CSV com 1000 linhas: deve processar sem timeout (< 10s)
- Telefone "11999999999" deve ser convertido para "+5511999999999"
- Paciente com telefone ja existente na org: deve aparecer como duplicata, nao ser inserido
- Testar com export real do iClinic: verificar taxa de sucesso
- Testar com export real do Simples Dental: verificar taxa de sucesso
- Relatorio deve mostrar contagem exata (sem divergencia entre preview e import final)

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada | River (sm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
