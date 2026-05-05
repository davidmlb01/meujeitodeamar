import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '../components'
import { RESULTS, VALID_ESTILOS } from '../data/results'
import './Resultado.css'

const KIWIFY_URLS = {
  ansioso: 'https://pay.kiwify.com.br/sEkZDxX',
  distante: 'https://pay.kiwify.com.br/qRXuct4',
  seguro:   'https://pay.kiwify.com.br/15XhzVM',
  confuso:  'https://pay.kiwify.com.br/8VHVs5p',
  fallback: 'https://pay.kiwify.com.br/sEkZDxX',
}

export default function Resultado() {
  const { estilo } = useParams()
  const navigate = useNavigate()
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    if (!VALID_ESTILOS.includes(estilo)) {
      navigate('/', { replace: true })
      return
    }
    if (window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: `resultado_${estilo}` })
    }
  }, [estilo, navigate])

  // Show sticky CTA after scrolling past the AHA section
  useEffect(() => {
    const handleScroll = () => {
      const aha = document.querySelector('.resultado__aha')
      if (aha) {
        const rect = aha.getBoundingClientRect()
        setShowSticky(rect.bottom < 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const result = RESULTS[estilo]
  if (!result) return null

  const kiwifyUrl = KIWIFY_URLS[estilo] || KIWIFY_URLS.fallback
  const shareText = encodeURIComponent(`Descobri que eu amo com o ${result.label}. E você? Descubra o seu jeito de amar:`)
  const shareUrl = encodeURIComponent('https://www.meujeitodeamar.com.br')

  const handleCheckout = () => {
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', { content_name: `checkout_${estilo}`, value: 37, currency: 'BRL' })
    }
  }

  return (
    <div className="resultado">

      {/* Reveal + body */}
      <div className="resultado__inner">
        <div>
          <p className="resultado__intro">{result.intro}</p>
          <h1 className="resultado__headline">{result.headline}</h1>
        </div>
        <p className="resultado__body">{result.body}</p>
      </div>

      {/* AHA break */}
      <div className="resultado__aha">
        <div className="resultado__aha-inner">
          <p className="resultado__aha-label">O que isso significa</p>
          <blockquote className="resultado__aha-quote">{result.ahaQuote}</blockquote>
        </div>
      </div>

      {/* Share section (right after AHA for viral) */}
      <div className="resultado__inner">
        <div className="resultado__share">
          <p className="resultado__share-label">Compartilhe seu resultado</p>
          <div className="resultado__share-buttons">
            <a
              className="resultado__share-btn"
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="resultado__share-btn"
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <button
              className="resultado__share-btn"
              onClick={() => {
                navigator.clipboard.writeText(`Descobri que eu amo com o ${result.label}. E você? Descubra o seu: https://www.meujeitodeamar.com.br`)
              }}
            >
              Copiar link
            </button>
          </div>
        </div>

        {/* Bridge (shortened - FIX #9) */}
        {(() => {
          const parts = result.bridge.split('\n\n')
          const lead = parts[0]
          const lastPart = parts[parts.length - 1]
          return (
            <>
              <p className="resultado__bridge-lead">{lead}</p>
              {parts.length > 2 && <p className="resultado__bridge">{parts[1]}</p>}
              {parts.length > 2 && <p className="resultado__bridge">{lastPart}</p>}
              {parts.length <= 2 && <p className="resultado__bridge">{lastPart}</p>}
            </>
          )
        })()}

        <hr className="resultado__divider" />

        {/* Value stack */}
        <div className="resultado__value-stack-section">
          <p className="resultado__value-stack-title">O que você vai entender pela primeira vez:</p>
          <ul className="resultado__value-stack">
            {result.valueStack.map((item, i) => (
              <li key={i} className="resultado__value-item">{item}</li>
            ))}
          </ul>
          <p className="resultado__meta">15 minutos de leitura · Linguagem humana, sem jargão clínico</p>
          <p className="resultado__science">
            {result.readingName.charAt(0).toUpperCase() + result.readingName.slice(1)} é o resultado de uma pesquisa científica séria sobre como os seres humanos aprendem a amar. Esse estudo já ajudou dezenas de milhares de pessoas a reconhecer padrões que repetiam há anos.
          </p>
        </div>

        <hr className="resultado__divider" />

        {/* CTA */}
        <div className="resultado__cta-box">
          <p className="resultado__price-anchor">{result.priceAnchor}</p>
          <div className="resultado__cta-section">
            <p className="resultado__price">R$37</p>
            <p className="resultado__guarantee">
              Garantia de 7 dias. Se não fizer sentido, devolvemos tudo, sem perguntas.
            </p>
            <div className="resultado__cta-wrap">
              <a
                href={kiwifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                onClick={handleCheckout}
              >
                <Button>Quero entender por que eu amo assim</Button>
              </a>
            </div>
            <p className="resultado__redirect">
              Entregue por email em menos de 5 minutos. Acesso imediato, leitura hoje.
            </p>
          </div>
        </div>

      </div>

      {/* Sticky CTA mobile */}
      {showSticky && (
        <div className="resultado__sticky-cta">
          <p className="resultado__sticky-price">Mapa do Coração: <strong>R$37</strong></p>
          <a
            href={kiwifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: '100%' }}
            onClick={handleCheckout}
          >
            <Button>Quero entender por que eu amo assim</Button>
          </a>
        </div>
      )}
    </div>
  )
}
