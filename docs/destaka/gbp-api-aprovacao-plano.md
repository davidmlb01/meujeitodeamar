# GBP API — Plano de Acao para Aprovacao
**Criado:** 2026-06-26 por Orion (AIOX Master)
**Contexto:** Ticket anterior 0-2582000041216 nunca processado. Ticket atual 4-9265000041644 submetido 02/06. Este plano prepara a proxima solicitacao para ser aprovada sem margem de erro.

---

## 1. O QUE O GOOGLE VERIFICA (fontes oficiais + comunidade)

O Google nao aprova API access de forma automatica. Cada solicitacao passa por revisao manual com os seguintes criterios:

| Criterio | Detalhe | Status Destaka |
|----------|---------|----------------|
| GBP verificado e ativo 60+ dias | Perfil `app@destaka.com.br` deve ser verified | Verificar |
| Website live com privacy policy | `destaka.com.br` com `/privacy` acessivel | Verificar |
| Dominio do email = dominio do site | `@destaka.com.br` deve bater com `destaka.com.br` | OK |
| Solicitante = owner do GBP | Nao manager, owner | Verificar |
| OAuth consent screen configurado | Campos completos, dominio verificado | Verificar |
| Descricao do caso de uso detalhada | Especifica, operacional, sem jargao de marketing | CRIAR |
| Scope correto | Apenas `business.manage` — nenhum scope extra | Verificar |
| Project ID correto no formulario | Alphanumerico, nao o nome nem o numero | 248596818772 |

---

## 2. CHECKLIST PRE-SOLICITACAO (executar ANTES de reabrir ticket)

### 2.1 Conta Google / GBP

- [ ] Confirmar que `app@destaka.com.br` e o OWNER (nao manager) do Google Business Profile
- [ ] Confirmar que o perfil GBP esta verificado (selo verde no painel)
- [ ] Confirmar que o perfil existe ha 60+ dias (criado antes de 26/04/2026)
- [ ] Perfil 100% preenchido: nome, endereco, telefone, categoria, descricao, horario, fotos

### 2.2 Google Cloud Project (projeto 248596818772)

- [ ] Acessar: console.cloud.google.com > selecionar projeto 248596818772
- [ ] APIs ativas: `Business Profile API` + `My Business Business Information API` + `My Business Account Management API`
- [ ] Checar quota atual: se ainda 0 QPM = nao aprovado. 300 QPM = aprovado
- [ ] OAuth consent screen: status deve ser "In production" ou "Testing" com todos os campos preenchidos
- [ ] Dominio `destaka.com.br` verificado na aba "Domain verification" do GCP

### 2.3 OAuth Consent Screen (CRITICO)

Acessar: APIs & Services > OAuth consent screen

Campos obrigatorios:
- [ ] App name: `Destaka`
- [ ] User support email: `app@destaka.com.br`
- [ ] App logo: uploadado (formato PNG/JPG, min 120x120)
- [ ] App home page: `https://destaka.com.br`
- [ ] App privacy policy: `https://destaka.com.br/privacy` (pagina DEVE existir e estar acessivel)
- [ ] App terms of service: `https://destaka.com.br/termos` (pagina DEVE existir)
- [ ] Authorized domains: `destaka.com.br` verificado via Search Console
- [ ] Developer contact email: `app@destaka.com.br`
- [ ] Scopes declarados: apenas `https://www.googleapis.com/auth/business.manage`

### 2.4 Site destaka.com.br

- [ ] `/privacy` ou `/politica-de-privacidade`: pagina acessivel, completa, menciona dados coletados via Google Business Profile
- [ ] `/termos`: pagina acessivel com termos de uso do servico
- [ ] Footer do site: link visivel para Privacy Policy e Termos
- [ ] Site com HTTPS ativo (sem warnings de certificado)
- [ ] Google Search Console: sitemap submetido, dominio verificado com a mesma conta GCP

---

## 3. FORMULARIO DE SOLICITACAO — CAMPO A CAMPO

**URL do formulario:** support.google.com/business/contact/api_default
**Dropdown a selecionar:** "Application for Basic API Access"

### Campo: Google Cloud Project ID
```
Usar o ID alfanumerico do projeto, nao o numero nem o nome.
Verificar em: console.cloud.google.com > Settings > Project ID
Exemplo: destaka-prod (ou o ID configurado)
ATENCAO: projeto 248596818772 e o Project Number. O Project ID e diferente.
```

### Campo: Entity Type
```
Selecionar: "Software developer building a platform"
```

### Campo: Company Website URL
```
https://destaka.com.br
```

### Campo: Number of Locations
```
Estimar conservadoramente: 30 a 100 no primeiro ano
(piloto com 30 dentistas + crescimento projetado)
```

### Campo: Intended Use Case (COPIAR E ADAPTAR)

```
UNLMTD is a software company building Destaka (destaka.com.br), a SaaS
platform that automates Google Business Profile management for independent
healthcare professionals in Brazil, starting with dentists and physicians.

Our platform provides the following capabilities via the Business Profile API:

1. Review monitoring and response: we poll new reviews via
   accounts.locations.reviews.list and generate AI-assisted draft responses
   tailored to each provider's specialty. The healthcare professional
   reviews and approves each draft before it is published via
   accounts.locations.reviews.updateReply. We never auto-publish responses.

2. Post publishing: we create 3 educational posts per week per location
   using accounts.locations.localPosts.create. Content is generated per
   provider specialty and validated for compliance with Brazilian healthcare
   regulations (CFM Resolution 1974/2011, CRO 196/2019) before publishing.

3. Profile completeness audit: we read location data via
   accounts.locations.get to calculate a completeness score and surface
   specific recommendations to the business owner through our dashboard.

4. Performance reporting: we read insights via the Business Profile
   Performance API to generate monthly reports delivered to each provider.

Authentication flow: each healthcare professional authenticates their own
Google Business Profile via OAuth 2.0 (scope: business.manage). Destaka
stores the access token server-side (Supabase with Row Level Security) and
acts strictly on behalf of the authenticated user. We never access profiles
the user has not explicitly authorized.

Our platform is live and fully functional at https://destaka.com.br with
OAuth 2.0 integration already deployed in production. We are requesting API
access to replace the current manual workflow, where our team performs these
operations on behalf of clients without programmatic access.

We are in the pre-commercial launch phase, onboarding our first healthcare
practices as pilot users in Q3 2026, with projected growth to 50-100
locations by end of 2026.
```

---

## 4. O QUE NAO FAZER (erros que causam rejeicao)

| Erro | Por que rejeita | Correto |
|------|----------------|---------|
| Descricao vaga: "gerenciar presenca digital" | Nao demonstra uso tecnico da API | Nomear endpoints especificos |
| Jargao de marketing: "plataforma omnichannel IA" | Google nao consegue mapear ao uso real | Linguagem operacional e tecnica |
| Solicitar scopes extras | Levanta suspeita de coleta excessiva | Apenas `business.manage` |
| Submeter como manager do GBP | Rejeicao automatica | Owner do perfil |
| Site sem privacy policy | Violacao de politica OAuth | Criar `/privacy` antes de submeter |
| Project ID errado (usar numero ao inves de ID) | Form invalido | ID alfanumerico do projeto |
| Modificar o projeto GCP enquanto o ticket esta aberto | Invalida a revisao em andamento | Nao alterar nada durante revisao |

---

## 5. ORDEM DE EXECUCAO (sequencia correta)

```
SEMANA 1 — Pre-requisitos
  Dia 1: Verificar status do GBP (owner, verified, 60+ dias)
  Dia 1: Criar /privacy e /termos no destaka.com.br se nao existirem
  Dia 2: Configurar OAuth consent screen completo no GCP
  Dia 2: Verificar dominio destaka.com.br no GCP via Search Console
  Dia 3: Submeter sitemap no Search Console (destaka.com.br/sitemap.xml)
  Dia 3: Revisar texto do caso de uso (adaptar para PT-BR se quiser, mas EN tem melhores resultados)
  Dia 4: Revisao final do checklist completo (TODOS os itens marcados)
  Dia 5: Submeter nova solicitacao

DURANTE A REVISAO (7-14 dias uteis)
  NAO alterar configuracoes do GCP
  NAO alterar OAuth consent screen
  Aguardar email de confirmacao com case number
  Se nao chegar confirmacao em 3 dias: verificar spam

POS-APROVACAO
  Checar quota: deve mudar de 0 QPM para 300 QPM
  Integrar hasLgpdConsentForAi() no review-monitor.ts
  Ativar review monitoring + post generation automatico
```

---

## 6. STATUS REAL DOS TICKETS (verificado via Gmail em agosto 2026)

| Ticket | Submetido | Status | Evidencia no Gmail |
|--------|-----------|--------|-------------------|
| 0-2582000041216 | Mai/2026 | REJEITADO em 08/06/2026 | Email de rejeicao recebido em `david@unlmtd.etc.br` |
| 4-9265000041644 | 02/06/2026 | NUNCA PROCESSADO | Zero emails para esse numero no Gmail |
| **2-9359000041841** | **16/08/2026** | **SUBMETIDO — aguardando revisao** | **Formulario chegou a 100%, ID gerado imediatamente** |

**Prazo de revisao:** 7 a 10 dias uteis a partir de 16/08/2026.
**Verificar:** inbox de `david@unlmtd.etc.br` por email de confirmacao com o numero 2-9359000041841.

---

## 7. FALLBACK — OPCAO B ENQUANTO AGUARDA

Enquanto o ticket esta em revisao, o produto pode funcionar via Opcao B:

- Cliente adiciona `app@destaka.com.br` como gerente no proprio GMN (Google My Business)
- Destaka acessa o perfil usando a conta `app@destaka.com.br` diretamente (sem API publica)
- Esta opcao funciona HOJE, sem aprovacao de API
- Limitacao: nao escala para 100+ clientes (gerenciamento manual de convites)
- Prazo: valido para piloto de 30 clientes

**Story pendente:** criar UI para guiar o cliente no passo de adicionar o gerente.

---

## 8. REFERENCIAS

- Prerequisites oficiais: https://developers.google.com/my-business/content/prereqs
- Formulario de solicitacao: https://support.google.com/business/contact/api_default
- FAQ oficial: https://developers.google.com/my-business/content/faq
- Guia de aprovacao (Xovion Labs): https://xovionlabs.com/blog/google-business-profile-api-hidden-gate/
- Preenchimento campo a campo (LegalClarity): https://legalclarity.org/how-to-complete-the-google-business-profile-api-access-request-form/
- OAuth consent screen: https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification
