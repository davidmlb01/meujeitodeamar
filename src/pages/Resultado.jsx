import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Badge } from '../components'
import { RESULTS, LOCKED_TOPICS, VALID_ESTILOS } from '../data/results'
import './Resultado.css'

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
          <h1
            className="resultado__headline"
            style={{ color: result.colorToken }}
          >
            {result.headline}
          </h1>
        </div>

        {/* Free copy */}
        <p className="resultado__body">{result.body}</p>

        <hr className="resultado__divider" />

        {/* Locked section */}
        <div className="resultado__locked">
          <p className="resultado__locked-intro">{result.lockedIntro}</p>
          <p className="resultado__locked-desc">{result.lockedDesc}</p>

          <ul className="resultado__topics" aria-label="Conteúdo bloqueado">
            {LOCKED_TOPICS.map((topic) => (
              <li key={topic} className="resultado__topic">
                <Badge variant="locked" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="resultado__divider" />

        {/* CTA */}
        <div className="resultado__cta-section">
          <div className="resultado__cta-wrap">
            <Link to={`/checkout?estilo=${estilo}`} tabIndex={-1}>
              <Button>Quero minha leitura completa por R$37</Button>
            </Link>
          </div>
          <p className="resultado__guarantee">
            Entrega imediata por email · Garantia de 7 dias, sem perguntas
          </p>
        </div>

      </div>
    </div>
  )
}
