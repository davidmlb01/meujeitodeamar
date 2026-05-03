import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'
import { RESULTS, VALID_ESTILOS } from '../data/results'
import './Resultado.css'

const KIWIFY_URLS = {
  ansioso:       'https://pay.kiwify.com.br/sEkZDxX',
  distante:      'https://pay.kiwify.com.br/qRXuct4',
  seguro:        'https://pay.kiwify.com.br/15XhzVM',
  desorganizado: 'https://pay.kiwify.com.br/8VHVs5p',
  fallback:      'https://pay.kiwify.com.br/sEkZDxX',
}

/* SVG Icons (inline, monocromaticos) */
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
)

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const STYLE_COLORS = {
  ansioso: '#D8A7B1',
  distante: '#C4909C',
  seguro: '#BF8A96',
  desorganizado: '#D4B5B0',
}

function generateResultCard(styleName, accentColor) {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1080
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#4B1D3F'
  ctx.fillRect(0, 0, 1080, 1080)

  // Accent circle (decorative)
  ctx.beginPath()
  ctx.arc(540, 420, 200, 0, Math.PI * 2)
  ctx.fillStyle = accentColor
  ctx.globalAlpha = 0.12
  ctx.fill()
  ctx.globalAlpha = 1

  ctx.textAlign = 'center'

  // "Meu jeito de amar é"
  ctx.font = '400 36px "Cormorant Garamond", serif'
  ctx.fillStyle = '#E8D9C1'
  ctx.fillText('Meu jeito de amar é', 540, 380)

  // Style name (grande, destaque)
  ctx.font = 'italic 96px "Cormorant Garamond", serif'
  ctx.fillStyle = accentColor
  ctx.fillText(styleName + '.', 540, 490)

  // "E o seu?"
  ctx.font = 'italic 32px "Cormorant Garamond", serif'
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.fillText('E o seu?', 540, 560)

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(440, 610)
  ctx.lineTo(640, 610)
  ctx.stroke()

  // CTA
  ctx.font = '300 20px Jost, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.fillText('Descubra em', 540, 660)

  // URL
  ctx.font = '500 22px Jost, sans-serif'
  ctx.fillStyle = '#E8D9C1'
  ctx.fillText('meujeitodeamar.com.br', 540, 695)

  return canvas.toDataURL('image/png')
}

function CopyLinkButton({ estilo }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://www.meujeitodeamar.com.br?utm_source=share&utm_medium=link&utm_campaign=resultado_${estilo}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button className="share-bar__btn share-bar__btn--copy" onClick={handleCopy}>
      <ShareIcon /> {copied ? 'Link copiado!' : 'Copiar link'}
    </button>
  )
}

export default function Resultado() {
  const { estilo } = useParams()
  const navigate = useNavigate()
  const [showPage, setShowPage] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [showSticky, setShowSticky] = useState(false)
  const gapRef = useRef(null)
  const offerRef = useRef(null)

  useEffect(() => {
    if (!VALID_ESTILOS.includes(estilo)) {
      navigate('/', { replace: true })
      return
    }
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: `resultado_${estilo}`,
        currency: 'BRL',
        value: 37.00,
      })
    }
    const timer = setTimeout(() => setShowPage(true), 2500)
    return () => clearTimeout(timer)
  }, [estilo, navigate])

  /* Sticky CTA: aparece após gap-section, some ao chegar na offer */
  useEffect(() => {
    if (!showPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === gapRef.current) {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              setShowSticky(true)
            }
          }
          if (entry.target === offerRef.current) {
            if (entry.isIntersecting) {
              setShowSticky(false)
            }
          }
        })
      },
      { threshold: 0 }
    )
    if (gapRef.current) observer.observe(gapRef.current)
    if (offerRef.current) observer.observe(offerRef.current)
    return () => observer.disconnect()
  }, [showPage])

  const toggleFaq = useCallback((i) => {
    setOpenFaq((prev) => (prev === i ? null : i))
  }, [])

  const r = RESULTS[estilo]
  if (!r) return null

  const checkoutUrl = KIWIFY_URLS[estilo] || KIWIFY_URLS.fallback

  const handleCheckout = () => {
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: `checkout_${estilo}`,
        value: 37,
        currency: 'BRL',
      })
    }
  }

  const faqItems = [
    { q: 'Isso é confiável? Em que se baseia?', a: 'O Mapa é baseado em um dos estudos mais respeitados da psicologia sobre como os seres humanos formam vínculos. Não é autoajuda. Não é horóscopo. É ciência traduzida para linguagem humana.' },
    { q: 'Como eu recebo o Mapa?', a: 'Entrega imediata por email. Em menos de 5 minutos você recebe o seu Mapa completo em PDF. Acesso permanente, leia quantas vezes quiser.' },
    { q: 'E se eu não gostar?', a: 'Garantia de 7 dias. Se o Mapa não fizer sentido para você, devolvemos 100% do valor. Sem perguntas.' },
  ]

  return (
    <div className="resultado-v2" style={{ '--accent': r.colorToken }}>

      {/* ── CARRYING SCREEN ── */}
      <div className={`carrying ${showPage ? 'carrying--done' : ''}`}>
        <span className="carrying__label">Analisando suas respostas</span>
        <span className="carrying__headline">Cada resposta conta uma parte da sua história.</span>
        <div className="carrying__bar"><div className="carrying__fill" /></div>
        <div className="carrying__social">
          <span className="carrying__social-count">127.482</span>
          <span className="carrying__social-text">pessoas já descobriram o seu jeito de amar</span>
        </div>
      </div>

      {/* ── SEÇÃO 1: REVEAL ── */}
      <section className={`reveal ${showPage ? 'reveal--visible' : ''}`}>
        <h1 className="reveal__headline">
          Seu jeito de amar<br />é <em>{r.styleName}.</em>
        </h1>

        <div className="reveal__body">
          <p>{r.bodyP1}</p>
          <p>{r.bodyP2}</p>
        </div>

        <div className="reveal__behaviors">
          {r.behaviors.map((b, i) => (
            <p key={i} className="reveal__behavior">{b}</p>
          ))}
        </div>

        <div className="reveal__scroll-hint">
          <span className="reveal__scroll-text">Seu resultado vai muito além de um nome</span>
          <span className="reveal__scroll-arrow">↓</span>
        </div>
      </section>

      {/* ── SEÇÃO 2: LACUNA ABERTA ── */}
      <section className="gap-section" ref={gapRef}>
        <div className="gap-section__inner">
          <h2 className="gap-section__headline">É hora de conhecer a parte onde a maioria nunca chega.</h2>
          <div className="gap-section__questions">
            {r.gapQuestions.map((q, i) => (
              <p key={i} className="gap-section__question">{q}</p>
            ))}
          </div>
          <p className="gap-section__answer">Essas respostas existem. E elas estão todas no seu Mapa.</p>
        </div>
      </section>

      {/* ── SEÇÃO 2B: PRODUCT REVEAL ── */}
      <section className="product-reveal">
        <div className="product-reveal__inner">
          <h2 className="product-reveal__name">O Mapa do<br /><em>Coração {r.styleName}</em></h2>
          <div className="product-reveal__desc">
            <p>{r.productDescP1}</p>
            <p>{r.productDescP2}</p>
            <p>{r.productDescP3}</p>
          </div>
          <p className="product-reveal__specs">15 páginas · 15 minutos de leitura · Entrega imediata</p>
        </div>
      </section>

      {/* ── SEÇÃO 3: BLOCOS BLOQUEADOS ── */}
      <section className="locked-section">
        <div className="locked-section__inner">
          <h2 className="locked-section__title">O que está dentro do seu Mapa</h2>
          <p className="locked-section__sub">Linguagem humana, sem jargão clínico.</p>
          <div className="locked-cards">
            {r.lockedCards.map((card, i) => (
              <div key={i} className={`locked-card ${card.blurred ? 'locked-card--blurred' : ''}`}>
                <span className="locked-card__number">{i + 1}</span>
                <div className="locked-card__content">
                  <p className="locked-card__topic">{card.topic}</p>
                  <p className="locked-card__hint">{card.hint}</p>
                </div>
                {card.blurred && <span className="locked-card__lock"><LockIcon /></span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 4: PROVA SOCIAL ── */}
      <section className="social-proof">
        <div className="social-proof__inner">
          <p className="social-proof__label">Quem já leu</p>
          <div className="social-proof__cards">
            {r.testimonials.map((t, i) => (
              <div key={i} className="social-proof__card">
                <p className="social-proof__quote">"{t.quote}"</p>
                <div className="social-proof__meta">
                  <div className="social-proof__avatar">{t.initial}</div>
                  <div>
                    <p className="social-proof__name">{t.name}</p>
                    <p className="social-proof__type">Coração {r.styleName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 5: OFFER + CTA ── */}
      <section className="offer-section" ref={offerRef}>
        <div className="offer-section__inner">
          <h2 className="offer-section__headline">Você já sabe o nome.<br />Agora entenda <em>o motivo.</em></h2>

          <div className="offer-total">
            <p className="offer-total__old">De R$147</p>
            <p className="offer-total__new">R$37</p>
            <p className="offer-total__sub">Mapa {r.readingName} · Entrega imediata</p>
          </div>

          <div className="guarantee">
            <span className="guarantee__icon"><ShieldIcon /></span>
            <div className="guarantee__content">
              <span className="guarantee__title">Garantia da Honestidade Afetiva</span>
              <span className="guarantee__text">Se o Mapa não fizer sentido para você, devolvemos tudo em 7 dias. Sem perguntas, sem burocracia. Você não está arriscando nada.</span>
            </div>
          </div>

          <div className="offer-cta">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="offer-cta__button"
              onClick={handleCheckout}
            >
              Quero o meu Mapa por R$37
            </a>
            <p className="offer-cta__urgency">{r.urgencyText}</p>
          </div>

          <div className="science-badge">
            <p className="science-badge__text">Baseado em uma das pesquisas mais citadas da psicologia sobre como os seres humanos formam vínculos. Mais de 40 anos de estudos replicados em dezenas de países.</p>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 6: FAQ (accordion) ── */}
      <section className="faq-section">
        <div className="faq-section__inner">
          <h2 className="faq-section__title">Perguntas frequentes</h2>
          <div className="faq-items">
            {faqItems.map((item, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}>
                <button className="faq-item__question" onClick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
                  <span>{item.q}</span>
                  <span className="faq-item__toggle">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="faq-item__answer">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 7: CTA FINAL ── */}
      <section className="final-cta">
        <div className="final-cta__inner">
          <h2 className="final-cta__headline">{r.ctaFinalHeadline}</h2>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="offer-cta__button offer-cta__button--inverted"
            onClick={handleCheckout}
          >
            Desbloquear o Mapa {r.readingName}
          </a>
          <p className="final-cta__meta">R$37 · Entrega imediata · Garantia de 7 dias</p>
        </div>
      </section>

      {/* ── SEÇÃO 8: SHARE ── */}
      <section className="share-section">
        <div className="share-section__inner">
          <div className="result-card">
            <span className="result-card__headline">Meu jeito de amar é <em>{r.styleName}.</em></span>
            <span className="result-card__hook">E o seu?</span>
            <span className="result-card__cta">Descubra em <strong>meujeitodeamar.com.br</strong></span>
          </div>

          <p className="share-section__label">Mande para alguém que precisa ler isso</p>

          <div className="share-bar">
            <button
              className="share-bar__btn share-bar__btn--whatsapp"
              onClick={() => {
                const text = `menina fiz um teste sobre o meu jeito de amar e fiquei tipo 😳\nfaz o teu e me conta: https://www.meujeitodeamar.com.br?utm_source=share&utm_medium=whatsapp&utm_campaign=resultado_${estilo}`
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
              }}
            >
              <WhatsAppIcon /> Mandar pra alguém
            </button>

            <button
              className="share-bar__btn share-bar__btn--download"
              onClick={() => {
                const dataUrl = generateResultCard(r.styleName, STYLE_COLORS[estilo] || '#D8A7B1')
                const a = document.createElement('a')
                a.href = dataUrl
                a.download = `meu-jeito-de-amar-${r.styleName.toLowerCase()}.png`
                a.click()
              }}
            >
              <DownloadIcon /> Postar nos Stories
            </button>

            <CopyLinkButton estilo={estilo} />
          </div>

          <p className="share-section__hint">A imagem salva direto no seu celular. É só abrir o Instagram e postar.</p>
        </div>
      </section>

      {/* ── STICKY CTA (mobile) ── */}
      <div className={`sticky-cta ${showSticky ? 'sticky-cta--visible' : ''}`}>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-cta__button"
          onClick={handleCheckout}
        >
          Quero o meu Mapa por R$37
        </a>
      </div>

    </div>
  )
}
