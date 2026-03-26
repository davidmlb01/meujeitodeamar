import { Link } from 'react-router-dom'
import { Button } from '../components'
import './LandingPage.css'

const STEPS = [
  'Responda 20 perguntas simples sobre como você age nos relacionamentos.',
  'Descubra o seu estilo de apego: seguro, ansioso, evitativo ou desorganizado.',
  'Entenda os padrões que se repetem — e o que fazer com eles.',
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing__hero">
        <p className="landing__eyebrow">Quiz gratuito</p>
        <h1 className="landing__headline">Qual é o seu jeito de amar?</h1>
        <p className="landing__sub">
          Responda 20 perguntas e descubra o seu estilo de apego — de graça.
        </p>
        <div className="landing__cta">
          <Link to="/quiz/b" tabIndex={-1}>
            <Button>Clique e descubra o seu jeito de amar</Button>
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="landing__steps">
        <div className="landing__steps-inner">
          <h2 className="landing__steps-title">Simples assim:</h2>
          <ol className="steps-list">
            {STEPS.map((text, i) => (
              <li key={i} className="step">
                <span className="step__number" aria-hidden="true">{i + 1}</span>
                <p className="step__text">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA secundário */}
      <div className="landing__cta2">
        <div className="landing__cta2-inner">
          <Link to="/quiz/b" tabIndex={-1}>
            <Button>Começar agora</Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="landing__footer">
        <nav className="landing__footer-links" aria-label="Links legais">
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
        </nav>
      </footer>
    </div>
  )
}
