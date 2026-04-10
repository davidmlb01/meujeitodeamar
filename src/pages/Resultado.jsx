import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Badge } from '../components'
import { RESULTS, LOCKED_TOPICS, VALID_ESTILOS } from '../data/results'
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
    }
  }, [estilo, navigate])

  const result = RESULTS[estilo]
  if (!result) return null

  return (
    <div className="resultado">
      <div className="resultado__inner">

        {/* Reveal */}
        <div>
          <p className="resultado__intro">{result.intro}</p>
          <h1 className="resultado__headline">
            {result.headline}
          </h1>
        </div>

        {/* Free copy */}
        <p className="resultado__body">{result.body}</p>

        <hr className="resultado__divider" />

        {/* Bridge — apresenta o produto */}
        <p className="resultado__bridge">{result.bridge}</p>

        <hr className="resultado__divider" />

        {/* Locked section */}
        <div className="resultado__locked">
          <p className="resultado__locked-intro">{result.lockedIntro}</p>
          {result.lockedDesc ? <p className="resultado__locked-desc">{result.lockedDesc}</p> : null}

          <ul className="resultado__topics" aria-label="Conteúdo bloqueado">
            {LOCKED_TOPICS.map((topic) => (
              <li key={topic} className="resultado__topic-card">
                <div className="resultado__topic-card__header">
                  <Badge variant="locked" />
                  <span>{topic}</span>
                </div>
                <div className="resultado__topic-card__lines" aria-hidden="true">
                  <div className="resultado__topic-card__line" />
                  <div className="resultado__topic-card__line resultado__topic-card__line--short" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <hr className="resultado__divider" />

        {/* Value stack */}
        <div className="resultado__value-stack-section">
          <p className="resultado__value-stack-title">O que está na sua leitura completa:</p>
          <ul className="resultado__value-stack">
            {result.valueStack.map((item, i) => (
              <li key={i} className="resultado__value-item">{item}</li>
            ))}
          </ul>
          <p className="resultado__meta">15 minutos de leitura · Linguagem humana, sem jargão clínico</p>
          <p className="resultado__science">
            Um teste com base científica. Não um quiz de revista. Já ajudou milhares de pessoas a entender padrões que repetiam há anos sem saber por quê.
          </p>
        </div>

        <hr className="resultado__divider" />

        {/* CTA */}
        <div className="resultado__cta-section">
          <p className="resultado__price">R$37</p>
          <div className="resultado__cta-wrap">
            <a href={KIWIFY_URLS[estilo] || KIWIFY_URLS.fallback} tabIndex={-1}>
              <Button>Desbloquear minha leitura completa</Button>
            </a>
          </div>
          <p className="resultado__redirect">
            Você será redirecionado para o checkout seguro. Entrega por email em menos de 5 minutos.
          </p>
          <p className="resultado__guarantee">
            Garantia de 7 dias. Se não fizer sentido, devolvemos tudo, sem perguntas.
          </p>
        </div>

      </div>
    </div>
  )
}
