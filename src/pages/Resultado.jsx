import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
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
          const bodyParts = parts.slice(1)
          return (
            <>
              <p className="resultado__bridge-lead">{lead}</p>
              {bodyParts.map((para, i) => (
                <p key={i} className="resultado__bridge">{para}</p>
              ))}
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
            A Leitura Completa {result.readingName} é o resultado de uma pesquisa científica séria e profunda sobre como os seres humanos aprendem a amar. Esse estudo já ajudou dezenas de milhares de pessoas a reconhecer padrões que repetiam há anos sem conseguir explicar.
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
                <Button>Desbloquear a Leitura {result.readingName}</Button>
              </a>
            </div>
            <p className="resultado__redirect">
              Entregue por email em menos de 5 minutos. Acesso imediato, leitura hoje.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
