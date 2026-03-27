# External Integrations

**Analysis Date:** 2026-03-26

## APIs & External Services

**E-commerce Payment:**
- Kiwify - Primary payment processor for quiz product and upsells
  - Service: Payment gateway and digital product delivery
  - Integration: Direct checkout URL redirects to Kiwify payment pages
  - URLs handled in: `src/pages/Checkout.jsx`, `src/pages/Obrigado.jsx`
  - Product IDs: Multiple checkout paths for base product, order bumps (OB1, OB2), and upsell combos

**Analytics & Marketing Pixels:**
- Google Analytics 4 (GA4) - Web analytics and user behavior tracking
  - SDK: Google Tag Manager script injection
  - Configuration: `VITE_GA4_ID` environment variable
  - Implementation: `src/components/Analytics/Analytics.jsx`
  - Tracks: Page views, custom events, user conversions

- TikTok Pixel - Conversion tracking for TikTok ads
  - Service: TikTok advertising and retargeting pixel
  - Configuration: `VITE_TIKTOK_PIXEL_ID` environment variable
  - Implementation: Inline script injection in `src/components/Analytics/Analytics.jsx`
  - Tracks: Product views, conversions, user actions

- Microsoft Clarity - Session recording and heatmaps
  - Service: User behavior analysis via session replays
  - Configuration: `VITE_CLARITY_ID` environment variable
  - Implementation: Inline script injection in `src/components/Analytics/Analytics.jsx`
  - Tracks: Session recordings, heatmaps, user interactions

## Data Storage

**Databases:**
- Not detected in current codebase

**File Storage:**
- Kiwify - Handles digital product delivery (PDFs/documents)
- Local filesystem only for development assets

**Caching:**
- Browser caching only (Vite-built static assets with cache busting)

## Authentication & Identity

**Auth Provider:**
- None detected in current implementation
- Kiwify handles customer authentication during checkout

**Email Delivery:**
- Kiwify - Automatic email delivery of purchased products post-checkout

## Monitoring & Observability

**Error Tracking:**
- Not detected (no Sentry or similar configured)

**Logs:**
- Browser console only
- Analytics via GA4, TikTok Pixel, Clarity (user interaction logs)

## CI/CD & Deployment

**Hosting:**
- Vercel - Static hosting for React SPA
- Configuration: `vercel.json` with SPA rewrite rules
- Build command: `npm run build`
- Output directory: `dist/`

**CI Pipeline:**
- Not detected (GitHub Actions not configured)

## Environment Configuration

**Required env vars:**

Frontend-facing (prefixed with `VITE_`):
- `VITE_GA4_ID` - Google Analytics 4 measurement ID
- `VITE_TIKTOK_PIXEL_ID` - TikTok Pixel ID
- `VITE_CLARITY_ID` - Microsoft Clarity project ID
- `VITE_KIWIFY_PRODUCT_ID` - Base product ID for Kiwify
- `VITE_KIWIFY_OB1_ID` - Order Bump 1 product ID
- `VITE_KIWIFY_OB2_ID` - Order Bump 2 product ID
- `VITE_KIWIFY_UPSELL_ID` - Upsell combo product ID

Build environment:
- `NODE_ENV` - Set to 'development' or 'production'

**Secrets location:**
- `.env` file - Local development (DO NOT COMMIT)
- `.env.local` file - Local development overrides
- `.env.example` - Public template with empty values
- Vercel dashboard - Production environment variables (recommended for secrets)

## Webhooks & Callbacks

**Incoming:**
- Kiwify → Automatic email delivery via Kiwify system (not custom webhook)

**Outgoing:**
- Kiwify payment redirect URLs (hardcoded in component state management)
  - Base checkout: `https://pay.kiwify.com.br/eIDBOuv`
  - OB1 checkout: `https://pay.kiwify.com.br/IOnRmNN`
  - OB2 checkout: `https://pay.kiwify.com.br/botDBb2`
  - Combined OB1+OB2: `https://pay.kiwify.com.br/BOSdbTz`
  - Upsell combo: `https://pay.kiwify.com.br/Rf1DTRA` (fallback if VITE_KIWIFY_UPSELL_ID not set)

## Data Flow

**User Acquisition → Purchase → Delivery:**

1. User lands on LandingPage → completes QuizB
2. User receives Resultado (personalized result page)
3. User navigates to Checkout (optional order bumps: OB1, OB2)
4. User clicks "Finalizar Pedido" → redirected to Kiwify payment
5. Post-purchase → Obrigado page (upsell offered for combo product)
6. Kiwify delivers product via email (automated, not tracked in app)

**Analytics Flow:**

- GA4: All page views and custom events tracked
- TikTok Pixel: Checkout and purchase events (view_content, add_to_cart conversion pixels)
- Clarity: All sessions recorded for UX analysis

---

*Integration audit: 2026-03-26*
