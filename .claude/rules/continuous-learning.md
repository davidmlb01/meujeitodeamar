# Aprendizado Continuo por Sessao

## Regra Central

**Ao final de cada sessao que envolva bugs, erros ou problemas em producao, os aprendizados DEVEM ser registrados E aplicados preventivamente para que o mesmo erro NUNCA aconteca com o proximo usuario.**

## Protocolo Obrigatorio

### 1. Registro (ao encerrar sessao com bugs)

Documentar no MASTER-BACKUP do projeto:
- O que falhou e por que
- A causa raiz (nao apenas o sintoma)
- O fix aplicado
- A regra preventiva para novos usuarios

### 2. Prevencao Automatica (codigo)

Para cada bug encontrado, verificar:
- Existe validacao que impede o mesmo erro para o proximo usuario?
- O fluxo automatico cobre o cenario que falhou?
- Os dados do onboarding sao preservados em todas as etapas?

Se a resposta for NAO a qualquer uma, criar o fix preventivo ANTES de fechar a sessao.

### 3. Checklist Pre-Deploy de Feature Nova

Antes de considerar qualquer feature "pronta":

- [ ] Testada com dados reais (nao mock)
- [ ] Fluxo end-to-end verificado (onboarding -> collectors -> dashboard -> usuario ve resultado)
- [ ] Inngest functions disparam no momento certo (nao apenas via cron)
- [ ] Dados do onboarding nao sao sobrescritos por sync posterior
- [ ] CHECK constraints do banco acompanham mudancas de logica
- [ ] Cache invalidado apos atualizacoes de dados
- [ ] Mensagens de erro sao descritivas (nao genericas)
- [ ] Fallbacks nao escondem falhas silenciosamente

### 4. Checklist Novo Usuario (apos assinatura)

Verificar que o produto entrega valor IMEDIATAMENTE:

- [ ] Todos os collectors dispararam (audit, score, geo, reviews, competitors, keywords, performance)
- [ ] gbp_location_id e location name valido (formato accounts/*/locations/*)
- [ ] Score reflete dados reais do perfil (fotos, descricao, horarios, atributos)
- [ ] Optimization report gerado com sugestoes personalizadas
- [ ] Checklist auto-detecta itens ja feitos (fotos, logo, capa)
- [ ] Mapa aparece no diagnostico (fallback de coordenadas se geo_snapshots vazio)
- [ ] Dados do onboarding (services, attributes, differentials) persistem apos audit

## Erros Historicos (referencia)

### Sessao 2026-10-22/23: Paula Bacellar (1a cliente paga)

| Erro | Causa | Fix | Regra Preventiva |
|------|-------|-----|-------------------|
| Nenhum collector rodou na assinatura | Webhook so enviava 1 evento | onboarding-data-bootstrap.ts | subscription.activated DEVE disparar todos os collectors |
| Score 29 com perfil completo | CHECK constraints limitavam gmb_completude a 25 | Constraints removidos | Ao rebalancear scorer, atualizar constraints |
| Attributes do onboarding apagados | gbp-audit sobrescrevia com arrays vazios | Merge inteligente | Nunca sobrescrever dados existentes com arrays vazios |
| gbp_location_id era Place ID | Auth callback salvava Place ID | gbp-audit valida formato | Validar formato accounts/*/* antes de usar |
| Optimizer nao gerava sugestoes | audit_report com formato {issues} vs {gaps} | Normaliza formato | Padronizar formato de audit report |
| Checklist manual, nao auto-detect | API so lia checklist_progress | API cruza com gbp_profiles | Sempre auto-detectar o que ja esta feito |
| Mapa nao aparecia | Dependia de geo_snapshots (vazio) | Fallback com coordenadas | Sempre ter fallback visual |
| Erro generico "Execute diagnostico" | API retornava 404, client mostrava mensagem fixa | Mostrar erro real | Nunca usar mensagens de erro genericas |
| 12 env vars com `\n` no Vercel | Valores colados com newline no terminal | Removidas e re-adicionadas | Auditar env vars com `vercel env pull` e verificar trailing chars |
| Claude API "model not found" | API key so acessa Haiku 4.5, nao Sonnet/Opus | Modelo atualizado para haiku | Testar API key com curl antes de assumir que funciona |
| Optimizer caindo em fallback | Modelo indisponivel + audit format incompativel | Modelo + normaliza format | Sempre logar o motivo do fallback, nunca falhar silenciosamente |
| Reviews = 0 com 168 reviews reais | GBP Business API nao retornava, Places API sim | Inserir via Places API | Usar Places API como fallback quando GBP API nao retorna reviews |
| Post pending 23 dias sem notificacao | Modo manual sem email de aviso | Email ao owner | SEMPRE notificar o usuario quando ha acao pendente |
