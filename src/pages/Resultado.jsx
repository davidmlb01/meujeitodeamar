import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Badge } from '../components'
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

  useEffect(() => {
    if (!VALID_ESTILOS.includes(estilo)) {
      navigate('/', { replace: true })
      return
    }
    if (window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: `resultado_${estilo}` })
    }
  }, [estilo, navigate])

  const result = RESULTS[estilo]
  if (!result) return null

  return (
    <div className="resultado">

      {/* ── Seção superior: reveal + corpo livre ── */}
      <div className="resultado__inner">
        <div>
          <p className="resultado__intro">{result.intro}</p>
          <h1 className="resultado__headline">{result.headline}</h1>
        </div>
        <p className="resultado__body">{result.body}</p>
      </div>

      {/* ── AHA break: momento de pausa e insight ── */}
      <div className="resultado__aha">
        <div className="resultado__aha-inner">
          <p className="resultado__aha-label">O que isso significa</p>
          <blockquote className="resultado__aha-quote">{result.ahaQuote}</blockquote>
        </div>
      </div>

      {/* ── Seção inferior: bridge + bloqueado + CTA ── */}
      <div className="resultado__inner">

        {/* Bridge — lead destacado + corpo */}
        {(() => {
          const parts = result.bridge.split('\n\n')
          const lead = parts[0]
          const body = parts.slice(1).join('\n\n')
          return (
            <>
              <p className="resultado__bridge-lead">{lead}</p>
              {body && <p className="resultado__bridge">{body}</p>}
            </>
          )
        })()}

        <hr className="resultado__divider" />

        {/* Locked section */}
        <div className="resultado__locked">
          <p className="resultado__locked-intro">{result.lockedIntro}</p>
          {result.lockedDesc ? <p className="resultado__locked-desc">{result.lockedDesc}</p> : null}

          <ul className="resultado__topics" aria-label="Conteúdo bloqueado">
            {result.lockedTopics.map((topic, i) => (
              <li key={topic} className="resultado__topic-card">
                <div className="resultado__topic-card__header">
                  <Badge variant="locked" />
                  <span>{topic}</span>
                </div>
                <div className="resultado__topic-card__lines" aria-hidden="true">
                  <p className="resultado__topic-card__hint">{result.lockedHints[i]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

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
            Um teste com base científica. Não um teste de revista. Já ajudou milhares de pessoas a entender padrões que repetiam há anos sem saber por quê.
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
                href={KIWIFY_URLS[estilo] || KIWIFY_URLS.fallback}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: `checkout_${estilo}`, value: 37, currency: 'BRL' })}
              >
                <Button>Desbloquear minha leitura completa</Button>
              </a>
            </div>
            <p className="resultado__redirect">
              Você será redirecionado para o checkout seguro. Entrega por email em menos de 5 minutos.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
