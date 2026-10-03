# Debug: geo-collector e keyword-snapshot nao inserem dados
**Data:** 2026-10-03
**Status:** Aberto. Precisa deep dive com @architect + @dev + @data-engineer

---

## Problema
As functions geo-collector e keyword-snapshot completam no Inngest sem erros mas nao inserem dados nas tabelas geo_snapshots e keyword_snapshots.

## Erros encontrados (em ordem cronologica)

| # | Erro | Fix aplicado | Status |
|---|---|---|---|
| 1 | orgId = undefined (event.data vazio) | Fallback para buscar todos orgs | Corrigido (commit 98059066) |
| 2 | "sem token Google" | Fix auth callback para preservar refresh_token | Corrigido (commit bb2467fe) |
| 3 | "sem perfil GBP" (gmb_profiles nao tem organization_id) | Buscar via professionals.user_id | Corrigido (commit c70b665e) |
| 4 | "sem coordenadas" (lat/lng null) | SET manual no banco (-23.55, -46.63) | Workaround |
| 5 | "gbp_location_id formato invalido" | Regex ja corrigido (commit c12b7778) mas deploy parece nao propagar | **ABERTO** |

## Erro atual (19:05 UTC)
```json
{
  "error": "gbp_location_id formato invalido",
  "org_id": "4c0c87e6-e1ed-47bc-a79b-1e8f073af6d8",
  "status": "skip"
}
```

O gbp_location_id da UNLMTD e "locations/18295123579187724104".
O regex no codigo (commit c12b7778) e: /^(accounts\/\d+\/)?locations\/\d+$/
Isso DEVERIA passar. O deploy mostra "Ready" no Vercel mas a function continua rejeitando.

## Hipoteses para investigar

1. **Inngest cacheia a function**: O Inngest pode estar usando uma versao compilada anterior da function. Testar: PUT /api/inngest para forcar re-sync
2. **O gbp_location_id na tabela organizations e diferente do gmb_profiles**: A function busca de organizations.gbp_location_id. Verificar valor exato
3. **API v4 depreciada**: Mesmo que o regex passe, a chamada a mybusiness.googleapis.com/v4 pode retornar 403/404. A GBP API v4 reportInsights pode nao estar mais disponivel
4. **getSearchKeywords() falhando**: O keyword-snapshot usa GBPClient.getSearchKeywords() que chama a Performance API v1. Pode estar falhando silenciosamente
5. **Token encryption**: getValidTokenForOrg pode falhar no decrypt e cair no fallback plaintext que tambem falha

## Dados do banco

| Tabela | Campo | Valor |
|---|---|---|
| organizations (UNLMTD) | id | 4c0c87e6-e1ed-47bc-a79b-1e8f073af6d8 |
| organizations (UNLMTD) | gbp_location_id | locations/18295123579187724104 |
| gmb_profiles (UNLMTD) | id | 04081c16-2d91-485f-b975-b2f5ccabf796 |
| gmb_profiles (UNLMTD) | user_id | 2bc8bb9a-0435-452f-b006-2cd12d8950b7 |
| gmb_profiles (UNLMTD) | latitude | -23.5505 (set manualmente) |
| gmb_profiles (UNLMTD) | longitude | -46.6333 (set manualmente) |
| google_tokens (UNLMTD) | updated_at | 2026-10-03 21:09:42 (fresco) |
| organizations (Bacellar) | id | f6c6416f-3c34-4bea-b75e-bb8c1056369e |
| gmb_profiles (Bacellar) | (nao existe) | - |

## Commits de fix nesta sessao
- c12b7778: regex aceita locations/ID sem accounts/
- bb2467fe: auth callback preserva refresh_token
- 98059066: resolve-orgs fallback para todos
- c70b665e: gmb_profiles via user_id

## Acao recomendada para proxima sessao

1. @architect: verificar se GBP API v4 reportInsights ainda funciona (testar com curl direto)
2. @dev: adicionar logs detalhados em cada step da function (antes do regex, depois do token, antes da API call)
3. @data-engineer: verificar schema real vs esperado em todas as tabelas envolvidas
4. Considerar migrar geo-collector para usar a Performance API v1 em vez da v4 (se v4 estiver morta)
5. Testar keyword-snapshot isoladamente (usa v1, deveria funcionar se token OK)
