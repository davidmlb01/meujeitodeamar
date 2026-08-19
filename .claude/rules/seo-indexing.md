# SEO e Indexacao — Requisitos Obrigatorios para Todo Site

**Aplicacao:** Todo projeto web novo ou existente antes de ir para producao.
**Responsavel:** @dev implementa, @qa valida antes de entregar.

---

## Regra Central

Nenhum site vai a producao sem os 6 requisitos abaixo implementados e validados.
O Google nao indexa o que nao e declarado corretamente.

---

## 6 Requisitos Obrigatorios

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

### REQ-06: Pagina 404 Customizada

**Regra:** Todo site deve ter uma pagina 404 customizada, no estilo visual da marca, com `noindex` e link de volta ao inicio.

**Por que importa para SEO:**
- Sem 404 customizada, o Google recebe resposta ambigua e continua tentando rastrear URLs mortas
- Com 404 clara (status HTTP 404 correto + visual da marca), o Google entende e para de tentar
- O usuario nao abandona o site — ve mensagem util e volta ao inicio
- Evita que o Search Console acumule erros de "Nao encontrado (404)"

**Next.js (App Router) — criar `src/app/not-found.tsx`:**
```tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina nao encontrada | Nome do Site',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold mb-6">404</p>
        <h1 className="text-xl font-semibold mb-2">Pagina nao encontrada</h1>
        <p className="text-muted mb-8">
          Essa URL nao existe ou foi removida.
        </p>
        <Link href="/" className="btn-primary">
          Voltar ao inicio
        </Link>
      </div>
    </main>
  )
}
```

**HTML estatico — criar `404.html`** (Vercel serve automaticamente quando o arquivo existe):
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pagina nao encontrada | Nome do Site</title>
  <meta name="robots" content="noindex, nofollow" />
  <!-- estilos da marca -->
</head>
<body>
  <!-- layout 404 no visual da marca, com link href="/" -->
</body>
</html>
```

**Requisitos da pagina 404:**
- [ ] Status HTTP 404 correto (Next.js e Vercel garantem automaticamente)
- [ ] `noindex, nofollow` para nao indexar a propria pagina de erro
- [ ] Visual no estilo da marca (nao pagina generica do servidor)
- [ ] Link de volta ao inicio (`href="/"`)
- [ ] Sem canonical tag (nao e uma pagina para indexar)

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
- [ ] REQ-06: Pagina 404 customizada existe (not-found.tsx ou 404.html)
- [ ] REQ-06: Pagina 404 tem noindex e link de volta ao inicio
- [ ] REQ-06: Visual da 404 e consistente com a identidade da marca
- [ ] Validar: acessar /robots.txt e /sitemap.xml em producao para confirmar
- [ ] Validar: acessar /url-que-nao-existe e confirmar que aparece a 404 customizada
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

**Versao:** 1.1 — 2026-08-19
**Proxima revisao:** Quando novo motivo de nao-indexacao for identificado em producao
