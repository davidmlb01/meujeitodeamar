import { Link } from 'react-router-dom'
import { Button } from '../components'
import './LandingPage.css'

const STEPS = [
  'Responda 20 perguntas sobre como você lida com seus relacionamentos',
  'Descubra qual dos 4 jeitos de amar é o seu',
  'Receba seu Mapa pessoal com a origem exata do seu padrão',
]

const TESTIMONIALS = [
  {
    text: 'Fiz achando que ia ser genérico. Quando li, fiquei procurando a parte que não combinava comigo. Não encontrei.',
    author: 'M., 29 anos',
  },
  {
    text: 'Eu repetia o mesmo padrão há anos e achava que era personalidade. Não é. É um padrão. E padrão tem origem.',
    author: 'C., 34 anos',
  },
  {
    text: 'Vinte perguntas me mostraram algo que anos de conversa com amigas não tinham mostrado.',
    author: 'A., 27 anos',
  },
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__hero-left">
          <h1 className="landing__headline">
            Por que você repete os mesmos padrões{' '}
            <em>nos seus relacionamentos?</em>
          </h1>
          <p className="landing__sub">
            Existe uma razão. Ela tem nome.<br />E quando você entende, tudo muda.
          </p>
          <div className="landing__cta">
            <Link to="/quiz/b" tabIndex={-1}>
              <Button>Descobrir o meu jeito de amar</Button>
            </Link>
          </div>
          <p className="landing__under">20 perguntas · 3 minutos · Resultado imediato · 100% gratuito</p>
          <p className="landing__science">Baseado em pesquisa científica. Não é um quiz de revista.</p>
        </div>

        {/* Steps desktop */}
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

      {/* Steps mobile */}
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

      {/* Prova social + Depoimentos */}
      <section className="landing__testimonials">
        <div className="landing__testimonials-inner">
          <p className="landing__social-proof">Mais de 2.000 pessoas já descobriram o seu jeito de amar</p>
          <p className="landing__testimonials-label">O que dizem</p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="testimonial">
                <p className="testimonial__text">{t.text}</p>
                <cite className="testimonial__author">{t.author}</cite>
              </blockquote>
            ))}
          </div>
          <div className="landing__testimonials-cta">
            <Link to="/quiz/b" tabIndex={-1}>
              <Button>Descobrir o meu jeito de amar</Button>
            </Link>
            <p className="landing__under">Gratuito. 3 minutos. Sem cadastro.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <p className="landing__trust">🔒 Seus dados protegidos · Sem spam · Resultado só para você</p>
        <nav className="landing__footer-links" aria-label="Links legais">
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
        </nav>
      </footer>
    </div>
  )
}
