---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-02a"]
---

# Story CRM-02b: Prontuario Funcional

## Status

Draft

## Story

**As a** profissional de saude,
**I want** registrar evolucoes clinicas, fazer upload de exames e imprimir o prontuario do paciente,
**so that** eu tenha documentacao clinica suficiente para acompanhar o paciente e cumprir as obrigacoes legais basicas, sem precisar de um sistema externo.

## Acceptance Criteria

1. Evolucao clinica: editor de texto rico (Tiptap) por consulta, com campo de data (default: hoje) e nome do profissional registrado automaticamente via `auth.jwt()`
2. Anamnese inicial: formulario com campos pre-definidos por especialidade (ex: odontologia = queixa principal, historico medico, alergias, medicamentos, habitos) + campos livres adicionaveis pelo profissional
3. Upload de arquivos: PDF, JPG, PNG — maximo 10MB por arquivo, 50MB por organizacao. Armazenados no Supabase Storage bucket `patient-files` com path `{org_id}/{patient_id}/{timestamp}-{nome}`
4. Arquivos uploadados exibidos em lista com nome, data e botao de download/visualizacao
5. Odontograma basico (especialidade odontologia): SVG com 32 dentes (numeracao FDI 11-48), click para marcar dente como "tratado" (cor diferente), estado salvo no banco
6. Historico de procedimentos: lista de `patient_procedures` do paciente com data, tipo de procedimento e valor pago
7. Impressao de prontuario: botao "Imprimir PDF" gera PDF com: dados do paciente, anamnese, todas as evolucoes clinicas em ordem cronologica, lista de procedimentos
8. RLS no Supabase Storage: arquivo de paciente da org A nao pode ser acessado pela org B (URL assinada com expiracao curta para downloads)

## Tasks / Subtasks

- [ ] Task 1 — Migration 008 (AC: 2, 5) **[DEVE RODAR PRIMEIRO]**
  - [ ] Adicionar coluna `anamnese jsonb` em patients
  - [ ] Adicionar coluna `odontograma jsonb` em patients
  - [ ] Aplicar migration no Supabase

- [ ] Task 2 — Editor de evolucao clinica (AC: 1)
  - [ ] Instalar e configurar Tiptap com extensoes basicas (Bold, Italic, BulletList, Heading)
  - [ ] Componente `EvolucaoEditor` com campo de data e submit (`app/components/EvolucaoEditor.tsx`)
  - [ ] POST /api/procedures: INSERT em patient_procedures (type: 'note') com conteudo Tiptap em JSON
  - [ ] Listar evolucoes em ordem cronologica inversa na timeline do paciente

- [ ] Task 3 — Anamnese por especialidade (AC: 2)
  - [ ] Definir campos por especialidade em objeto de configuracao (nao no banco)
  - [ ] Componente `AnamneseForm` que renderiza campos dinamicamente por especialidade da org (`app/components/AnamneseForm.tsx`)
  - [ ] Salvar anamnese em campo JSON no banco (tabela `patients.anamnese jsonb`)

- [ ] Task 4 — Upload de arquivos (AC: 3, 4, 8)
  - [ ] Configurar bucket `patient-files` como privado no Supabase Storage
  - [ ] Aplicar RLS policy no bucket (org_id do path deve bater com org do usuario)
  - [ ] POST /api/patients/[id]/files: upload para Storage com path correto
  - [ ] GET /api/patients/[id]/files: lista arquivos do paciente com URL assinada (60s expiracao)
  - [ ] Frontend: drag-and-drop ou click para upload, preview de nome + tipo
  - [ ] Validar: maximo 10MB por arquivo, tipos aceitos (PDF/JPG/PNG)

- [ ] Task 5 — Odontograma basico (AC: 5)
  - [ ] Criar componente SVG `Odontograma` com 32 dentes (numeracao FDI) (`app/components/Odontograma.tsx`)
  - [ ] Click em dente: toggle estado (normal / tratado / extraido)
  - [ ] Salvar estado do odontograma em `patients.odontograma jsonb`
  - [ ] Exibir odontograma apenas para orgs com especialidade = 'dentist'

- [ ] Task 6 — Impressao PDF (AC: 7)
  - [ ] Instalar react-pdf (@react-pdf/renderer)
  - [ ] Criar template de PDF: cabecalho (nome org + profissional), dados paciente, anamnese, evolucoes, procedimentos
  - [ ] Botao "Imprimir PDF" gera o documento e abre no browser para impressao
  - [ ] Nao usar Puppeteer — react-pdf renderiza client-side

## Dev Notes

### Editor Tiptap
Usar `@tiptap/react` + `@tiptap/starter-kit`. Salvar conteudo como JSON (nao HTML) para facilitar renderizacao futura. Extensoes minimas: Bold, Italic, BulletList, OrderedList, Heading (H2, H3).

### Odontograma SVG
Criar SVG estatico com 32 elementos `<rect>` ou `<path>` representando os dentes. Estado gerenciado em React (useState). On click, toggle entre estados. Salvar apenas no submit (nao a cada click). FDI: quadrante 1 = dentes 11-18, quadrante 2 = 21-28, quadrante 3 = 31-38, quadrante 4 = 41-48.

### Supabase Storage URLs assinadas
Usar `supabase.storage.from('patient-files').createSignedUrl(path, 60)` para gerar URLs temporarias. Nunca expor URLs publicas de arquivos de prontuario.

### react-pdf
Usar `@react-pdf/renderer` com `PDFDownloadLink` ou `PDFViewer`. Renderiza 100% no browser, sem servidor. Adequado para o tamanho de prontuario esperado (< 50 paginas).

### Scope V1 (fora desta story)
- Prescricao digital (MEMED): V1.1
- Assinatura digital ICP-Brasil: V1.1
- Odontograma com evolucao historica por dente: V1.1

## Testing

- Upload de arquivo > 10MB deve ser rejeitado com mensagem clara
- Arquivo de org A nao pode ser baixado por org B (URL assinada invalida cross-org)
- PDF gerado deve conter todos os campos (testar com paciente com anamnese + 3 evolucoes)
- Odontograma: marcar dente, salvar, recarregar pagina — estado deve persistir
- Anamnese: especialidade odontologia exibe campos diferentes de psicologia

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada | River (sm) |
| 2026-07-30 | 1.1 | Migration 008 movida para Task 1 (bloqueante); paths de componentes adicionados | Pax (po) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
