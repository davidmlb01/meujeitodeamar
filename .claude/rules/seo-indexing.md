# SEO e Indexacao — Requisitos Obrigatorios para Todo Site

**Aplicacao:** Todo projeto web novo ou existente antes de ir para producao.
**Responsavel:** @dev implementa, @qa valida antes de entregar.

---

## Regra Central

Nenhum site vai a producao sem os 5 requisitos abaixo implementados e validados.
O Google nao indexa o que nao e declarado corretamente.

---

## 5 Requisitos Obrigatorios

### REQ-01: Tag Canonical em Todas as Paginas

**Regra:** Toda pagina publica deve declarar sua URL canonica.

**Next.js (App Router):**
```tsx
// layout.tsx — metadataBase obrigatorio na raiz
export const metadata: Metadata = {
  metadataBase: new URL('https://seudominio.com.br'),
}

// Cada page.tsx publica
export const metadata = {
  alternates: { canonical: 'https://seudominio.com.br/caminho' },
}
```

**HTML estatico:**
```html
<link rel="canonical" href="https://seudominio.com.br/caminho" />
```

**Regras de formacao da URL canonical:**
- Sempre `https://` (nunca `http://`)
- Sempre sem `www` (ou sempre com — escolher um e ser consistente em 100% das paginas)
- Nunca terminar com `/index.html`
- Consistente com o dominio primario configurado no Vercel

---

### REQ-02: robots.txt com Sitemap Declarado

**Regra:** Todo site deve ter robots.txt acessivel em `/robots.txt`, bloqueando rotas privadas.

**Next.js (App Router) — criar `src/app/robots.ts`:**
```ts
import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/', '/auth/'],
      },
    ],
    sitemap: 'https://seudominio.com.br/sitemap.xml',
  }
}
```

**HTML estatico — criar `robots.txt`:**
```
User-agent: *
Allow: /

Sitemap: https://seudominio.com.br/sitemap.xml
```

---

### REQ-03: Sitemap com URLs Canonicas

**Regra:** O sitemap deve conter apenas URLs finais — sem redirecionamentos, sem www, sem http.

**Next.js (App Router) — `src/app/sitemap.ts`:**
```ts
import { type MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://seudominio.com.br'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/pagina`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
```

**Checklist do sitemap:**
- [ ] Todas as URLs usam `https://`
- [ ] Nenhuma URL tem `www` (a menos que o dominio primario use www)
- [ ] Nenhuma URL termina em `/index.html`
- [ ] Apenas paginas publicas indexaveis (nao incluir /admin, /dashboard, /api)
- [ ] `lastModified` com data real (nao estatica para paginas que mudam)

---

### REQ-04: Redirect www → Non-www (ou vice-versa)

**Regra:** O dominio deve ter redirecionamento 301 permanente para consolidar a versao canonica.
Escolher uma versao (com ou sem www) e redirecionar a outra para ela.

**Next.js — `next.config.ts`:**
```ts
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.seudominio.com.br' }],
        destination: 'https://seudominio.com.br/:path*',
        permanent: true,
      },
    ]
  },
}
```

**HTML estatico — `vercel.json`:**
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.seudominio.com.br" }],
      "destination": "https://seudominio.com.br/$1",
      "permanent": true
    }
  ]
}
```

---

### REQ-05: Rotas Privadas Bloqueadas para Crawlers

**Regra:** Rotas de admin, dashboard, api e autenticacao nao devem ser indexadas.

Implementar em dois lugares:
1. `robots.txt` / `robots.ts` com `disallow` para essas rotas (REQ-02)
2. Em cada layout de rota privada, adicionar metadado `noindex`:

**Next.js:**
```tsx
// src/app/(admin)/layout.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

---

## Checklist de Entrega (Pre-Deploy)

Antes de qualquer deploy em producao, validar:

```
- [ ] REQ-01: Canonical presente em TODAS as paginas publicas
- [ ] REQ-01: metadataBase definido no root layout (Next.js)
- [ ] REQ-02: robots.txt/robots.ts existe e aponta para o sitemap
- [ ] REQ-02: Rotas privadas no disallow do robots
- [ ] REQ-03: sitemap.xml existe e todas as URLs sao canonicas
- [ ] REQ-03: Sitemap sem URLs de admin/api/dashboard
- [ ] REQ-04: Redirect www → non-www (ou non-www → www) configurado
- [ ] REQ-05: Layouts de rotas privadas com robots noindex
- [ ] Validar: acessar /robots.txt e /sitemap.xml em producao para confirmar
- [ ] Validar: inspecionar URL no Search Console apos deploy
```

---

## Aprendizado de Origem

Regra criada apos correcao nos sites destaka.com.br e unlmtd.etc.br (agosto 2026).
Motivos reportados pelo Google Search Console:
- "Pagina com redirecionamento" — ausencia do redirect www e URLs nao-canonicas
- "Pagina alternativa com tag canonica adequada" — falta de canonical em sub-paginas
- "Nao encontrado (404)" — URLs indexadas anteriormente que sumiram sem redirect

---

**Versao:** 1.0 — 2026-08-19
**Proxima revisao:** Quando novo motivo de nao-indexacao for identificado em producao
