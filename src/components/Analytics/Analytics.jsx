import { useEffect } from 'react'

function injectScript(src, id, onLoad) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.src = src
  script.async = true
  if (onLoad) script.onload = onLoad
  document.head.appendChild(script)
}

function injectInlineScript(id, code) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.innerHTML = code
  document.head.appendChild(script)
}

export function Analytics() {
  const ga4Id = import.meta.env.VITE_GA4_ID
  const tiktokId = import.meta.env.VITE_TIKTOK_PIXEL_ID
  const clarityId = import.meta.env.VITE_CLARITY_ID

  useEffect(() => {
    // ── GA4 ──────────────────────────────────────────
    if (ga4Id) {
      injectScript(
        `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`,
        'ga4-script',
        () => {
          window.dataLayer = window.dataLayer || []
          function gtag() { window.dataLayer.push(arguments) }
          window.gtag = gtag
          gtag('js', new Date())
          gtag('config', ga4Id)
        }
      )
    }

    // ── TikTok Pixel ─────────────────────────────────
    if (tiktokId) {
      injectInlineScript('tiktok-pixel', `
        !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${tiktokId}');ttq.page();}(window,document,'ttq');
      `)
    }

    // ── Microsoft Clarity ────────────────────────────
    if (clarityId) {
      injectInlineScript('clarity-script', `
        (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");
      `)
    }
  }, [ga4Id, tiktokId, clarityId])

  return null
}
