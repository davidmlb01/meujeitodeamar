import { Link } from 'react-router-dom'
import { Button } from '../components'
import './LandingPage.css'

const STEPS = [
  'Responda 20 perguntas sobre como você lida com os seus relacionamentos',
  'Descubra o seu jeito de amar em minutos',
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero — mobile: coluna única / desktop: 2 colunas */}
      <section className="landing__hero">
        {/* Coluna esquerda (mobile: tudo) */}
        <div className="landing__hero-left">
          <h1 className="landing__headline">
            Você ama do jeito que <em>aprendeu a amar.</em>
          </h1>
          <p className="landing__sub">
            Não é fraqueza. Não é destino.<br />É um padrão. E ele tem nome.
          </p>
          <div className="landing__cta">
            <Link to="/quiz/b" tabIndex={-1}>
              <Button>Clique e descubra o seu jeito de amar</Button>
            </Link>
          </div>
          <p className="landing__under">20 perguntas · Resultado imediato · 100% gratuito</p>
        </div>

        {/* Coluna direita — só desktop */}
        <div className="landing__steps-desktop">
          <p className="landing__steps-desktop-title">Simples assim:</p>
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

      {/* Steps — só mobile */}
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
