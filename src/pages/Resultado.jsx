import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RESULTS, VALID_ESTILOS } from '../data/results'
import './Resultado.css'

const KIWIFY_URLS = {
  ansioso:       'https://pay.kiwify.com.br/sEkZDxX',
  distante:      'https://pay.kiwify.com.br/qRXuct4',
  seguro:        'https://pay.kiwify.com.br/15XhzVM',
  desorganizado: 'https://pay.kiwify.com.br/8VHVs5p',
  fallback:      'https://pay.kiwify.com.br/sEkZDxX',
}

export default function Resultado() {
  const { estilo } = useParams()
  const navigate = useNavigate()
  const [showPage, setShowPage] = useState(false)

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
    const timer = setTimeout(() => setShowPage(true), 4000)
    return () => clearTimeout(timer)
  }, [estilo, navigate])

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
      <section className="gap-section">
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
      <section className="offer-section">
        <div className="offer-section__inner">
          <h2 className="offer-section__headline">Você já sabe o nome.<br />Agora entenda <em>o motivo.</em></h2>

          <div className="offer-total">
            <p className="offer-total__old">De R$147</p>
            <p className="offer-total__new">R$37</p>
            <p className="offer-total__sub">Mapa {r.readingName} · Entrega imediata</p>
          </div>

          <div className="guarantee">
            <span className="guarantee__icon">🛡</span>
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

      {/* ── SEÇÃO 6: FAQ ── */}
      <section className="faq-section">
        <div className="faq-section__inner">
          <h2 className="faq-section__title">Perguntas frequentes</h2>
          <div className="faq-items">
            <div className="faq-item">
              <div className="faq-item__question">Isso é confiável? Em que se baseia?</div>
              <div className="faq-item__answer">O Mapa é baseado em um dos estudos mais respeitados da psicologia sobre como os seres humanos formam vínculos. Não é autoajuda. Não é horóscopo. É ciência traduzida para linguagem humana.</div>
            </div>
            <div className="faq-item">
              <div className="faq-item__question">Como eu recebo o Mapa?</div>
              <div className="faq-item__answer">Entrega imediata por email. Em menos de 5 minutos você recebe o seu Mapa completo em PDF. Acesso permanente, leia quantas vezes quiser.</div>
            </div>
            <div className="faq-item">
              <div className="faq-item__question">E se eu não gostar?</div>
              <div className="faq-item__answer">Garantia de 7 dias. Se o Mapa não fizer sentido para você, devolvemos 100% do valor. Sem perguntas.</div>
            </div>
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
            className="final-cta__button"
            onClick={handleCheckout}
          >
            Desbloquear o Mapa {r.readingName}
          </a>
          <p className="final-cta__meta">R$37 · Entrega imediata · Garantia de 7 dias</p>
        </div>
      </section>

    </div>
  )
}
