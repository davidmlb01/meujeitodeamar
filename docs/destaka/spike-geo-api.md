# Spike 6.1: Viabilidade GBP API para Dados Geograficos
**Data:** 2026-10-03
**Autor:** Aria (Architect)
**Status:** Concluido

---

## Resultado: VIAVEL com dados reais

A GBP API fornece dados geograficos reais via **Driving Direction Metrics**. Nao precisamos simular.

---

## Fontes de Dados Geograficos Disponiveis

### 1. Driving Direction Metrics (PRINCIPAL)

**API:** `accounts.locations.reportInsights` (GBP API v4)
**Endpoint:** `POST https://mybusinessaccountmanagement.googleapis.com/v1/{name}:reportInsights`

**O que retorna:**
- Top 10 regioes de onde as pessoas pedem direcoes ate o negocio
- Cada regiao inclui: **coordenadas (lat/lng)**, label legivel, contagem de requests
- Periodos: 7, 30 ou 90 dias

**Response shape (TopDirectionSources):**
```json
{
  "locationDrivingDirectionMetrics": [{
    "locationName": "accounts/123/locations/456",
    "topDirectionSources": [{
      "dayCount": 30,
      "regionCounts": [
        {
          "latlng": { "latitude": -19.9245, "longitude": -43.9352 },
          "label": "Savassi, Belo Horizonte",
          "count": 42
        },
        {
          "latlng": { "latitude": -19.9167, "longitude": -43.9345 },
          "label": "Funcionarios, Belo Horizonte",
          "count": 28
        },
        {
          "latlng": { "latitude": -19.8897, "longitude": -43.9610 },
          "label": "Pampulha, Belo Horizonte",
          "count": 8
        }
      ]
    }]
  }]
}
```

**Observacoes:**
- Maximo 10 regioes por consulta (suficiente para heatmap)
- Ordenado por contagem decrescente (mais popular primeiro)
- Coordenadas sao centro da regiao (bairro), nao do usuario individual
- Disponivel com scope `business.manage` (ja temos)

### 2. Coordenadas do Negocio (JA DISPONIVEL)

**Fonte:** Google Places API (ja usada para concorrentes)
- `PlaceResult.geometry.location` retorna lat/lng do negocio
- Coordenadas dos concorrentes tambem disponiveis (mas descartadas hoje)

**Fonte alternativa:** `storefrontAddress` da Business Information API
- Retorna endereco formatado, mas SEM coordenadas
- Precisariamos geocodificar (chamada extra ao Geocoding API)

**Recomendacao:** Usar Places API para obter coordenadas do negocio (textsearch com place_id) e armazenar no banco.

### 3. Search Keywords por Mes (JA IMPLEMENTADO)

**Endpoint:** `locations.searchkeywords.impressions.monthly`
- Retorna keywords + impressoes mensais
- NAO retorna breakdown geografico (apenas agregado)
- Util para o card de keywords (story 6.6-6.9), nao para o mapa

---

## Arquitetura Recomendada para o Mapa

### Dados que precisamos coletar:

| Dado | Fonte | Frequencia |
|---|---|---|
| Coordenadas do negocio (centro do mapa) | Places API (textsearch) | Uma vez (no onboarding) |
| Top 10 regioes de demanda | reportInsights (driving directions) | Semanal (Inngest cron) |
| Coordenadas dos concorrentes | Places API (nearbySearch) | Ja coletado, so persistir |

### Logica do heatmap:

```
1. Centro: coordenadas do negocio (fixo)
2. Zonas VERDES: regioes com alta contagem de driving directions (top 3)
3. Zonas AMARELAS: regioes com contagem media (posicoes 4-7)
4. Zonas VERMELHAS: ausencia de dados = area descoberta
   - Calcular: bairros dentro de raio de 5km que NAO aparecem no top 10
5. Raio de alcance: distancia ate a regiao mais distante no top 10
```

### Limitacao importante:

O reportInsights (v4) esta na API v4 que esta em processo de depreciacao. A nova Business Profile Performance API (v1) que ja usamos para metricas e keywords **NAO inclui driving direction metrics ainda**.

**Opcoes:**
- **Opcao A (recomendada):** Usar API v4 para driving directions enquanto disponivel. Migrar quando v1 adicionar equivalente.
- **Opcao B:** Simular geograficamente usando raio estimado por categoria + coordenadas do negocio + coordenadas dos concorrentes. Menos preciso, mas nao depende de API v4.

**Recomendacao:** Opcao A com fallback para Opcao B. Implementar abstracoes que permitam trocar a fonte de dados sem mudar o frontend.

---

## Impacto na Story 6.2 (Migration + Backend)

### Schema recomendado:

```sql
CREATE TABLE geo_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES gmb_profiles(id) ON DELETE CASCADE,
  center_lat double precision NOT NULL,
  center_lng double precision NOT NULL,
  radius_km double precision,
  regions jsonb NOT NULL DEFAULT '[]',
  -- regions: [{ lat, lng, label, count, status: 'strong'|'medium'|'weak' }]
  day_count integer DEFAULT 30,
  week_start date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_geo_snapshots_org_week ON geo_snapshots(org_id, week_start DESC);

-- RLS
ALTER TABLE geo_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own org geo" ON geo_snapshots
  FOR SELECT USING (org_id IN (
    SELECT org_id FROM professionals WHERE user_id = auth.uid()
  ));
```

### Mudancas no gmb_profiles (persistir coordenadas):

```sql
ALTER TABLE gmb_profiles
  ADD COLUMN latitude double precision,
  ADD COLUMN longitude double precision;
```

---

## Impacto na Story 6.3 (Inngest Function)

### Fluxo da function geo-collector:

```
1. Buscar todos os perfis com subscription ativa
2. Para cada perfil:
   a. Se nao tem lat/lng: buscar via Places API (textsearch com place_id) e salvar
   b. Chamar reportInsights com DRIVING_DIRECTION_METRICS (30 dias)
   c. Classificar regioes: top 3 = strong, 4-7 = medium
   d. Salvar snapshot em geo_snapshots
3. Logar resultados
```

### API v4 call:

```typescript
const response = await fetch(
  `https://mybusiness.googleapis.com/v4/${locationName}:reportInsights`,
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      locationNames: [locationName],
      basicRequest: {
        metricRequests: [{ metric: 'QUERIES_DIRECT', options: ['AGGREGATED_DAILY'] }],
        timeRange: { startTime: thirtyDaysAgo, endTime: today }
      },
      drivingDirectionsRequest: {
        numDays: 'THIRTY'
      }
    })
  }
)
```

---

## Impacto na Story 6.4 (Frontend MapCard)

### Stack confirmado:
- **react-leaflet** + **leaflet** (SSR-safe com dynamic import)
- **Tiles:** CartoDB dark_all (dark theme, gratuito)
- **Marcadores:** Circulos coloridos com raio proporcional a contagem
- **Centro:** Marcador especial (pin do negocio)

### Visualizacao:
- Circulos verdes (strong): opacity 0.6, raio proporcional
- Circulos amarelos (medium): opacity 0.4
- Area geral sem dados: nao renderizar nada (ausencia visual = area fraca)
- Raio do mapa: auto-fit baseado no ponto mais distante

---

## Complexidade Atualizada

| Story | Complexidade Original | Complexidade Revisada | Motivo |
|---|---|---|---|
| 6.2 | Media | Media | Schema claro, endpoint direto |
| 6.3 | Media | **Media-Alta** | Precisa chamar API v4 (endpoint diferente do v1 que ja usamos) + persistir coordenadas |
| 6.4 | Media | Media | Leaflet e bem documentado, dados simples |
| 6.5 | Baixa | Baixa | Padrao ja existe (blur + isSubscriber) |

---

## Riscos Atualizados

| Risco | Probabilidade | Mitigacao |
|---|---|---|
| API v4 reportInsights ser descontinuada | Media (sem data anunciada) | Abstracoes no backend, fallback para simulacao |
| Negocio novo sem driving direction data | Alta (primeiras semanas) | Fallback: mostrar so coordenadas do negocio + concorrentes como referencia |
| Rate limit na API v4 | Baixa (300 QPM, 1 call/perfil/semana) | Cron semanal, nao diario |

---

## Conclusao

**Spike concluido.** A GBP API v4 fornece dados geograficos reais (driving directions por regiao com lat/lng). O Destaka pode construir o mapa com dados reais, nao simulados. A abordagem recomendada e usar API v4 com abstracoes que permitam migrar para v1 quando disponivel.

**Proximo passo:** Story 6.2 (migration + backend) pode comecar imediatamente.

---

*Fontes:*
- [reportInsights API](https://developers.google.com/my-business/reference/rest/v4/accounts.locations/reportInsights)
- [Retrieve location insights](https://developers.google.com/my-business/content/insight-data)
- [Driving Direction Metrics](https://developers.google.com/my-business/reference/rest/v4/Metric)
- [Business Profile Performance API](https://developers.google.com/my-business/reference/performance/rest)
- [Search Keywords Impressions](https://developers.google.com/my-business/reference/performance/rest/v1/locations.searchkeywords.impressions.monthly/list)

— Aria, arquitetando o futuro 🏗️
