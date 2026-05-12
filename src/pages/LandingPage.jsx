import { Link } from 'react-router-dom'
import { Button } from '../components'
import './LandingPage.css'

const STEPS = [
  'Responda 10 perguntas sobre como você lida com seus relacionamentos',
  'Descubra qual jeito de amar é o seu',
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

const HERO_TESTIMONIALS = [
  {
    text: 'Finalmente entendi por que repito os mesmos padrões. Muito revelador!',
    author: 'Maria, São Paulo',
  },
  {
    text: '2 minutos e já conhecia a mim mesma melhor. Recomendo demais.',
    author: 'Carolina, Rio de Janeiro',
  },
  {
    text: 'Perfeito para entender conflitos com meu parceiro. Muito prático.',
    author: 'Ana, Belo Horizonte',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Quão preciso é este teste?',
    answer: 'O teste é baseado na Teoria do Apego de John Bowlby e validado por pesquisa psicológica de 50+ anos. Não é diagnóstico — é um espelho comportamental que ajuda você a entender seus padrões de relacionamento.',
  },
  {
    question: 'Quanto tempo leva?',
    answer: 'Exatamente 2 minutos. 20 perguntas rápidas e diretas ao ponto.',
  },
  {
    question: 'E se eu não gostar do meu resultado?',
    answer: 'Sem problema. Oferecemos garantia de 30 dias, sem perguntas. Contate suporte@meujeitodeamar.com.br e devolvemos 100% do seu dinheiro.',
  },
  {
    question: 'Meus dados são privados?',
    answer: 'Sim. Seus dados são encriptados e nunca compartilhados com terceiros. Leia nossa Política de Privacidade para detalhes completos.',
  },
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__hero-left">
          <h1 className="landing__headline">
            Existe um padrão no jeito que você ama.{' '}
            <em>Você ainda não sabe qual é.</em>
          </h1>
          <p className="landing__sub">Descubra em 10 perguntas.</p>
          <div className="landing__cta">
            <Link to="/quiz/b" tabIndex={-1}>
              <Button>Descobrir o meu jeito de amar</Button>
            </Link>
          </div>
          <p className="landing__under">10 perguntas · 2 minutos · Resultado imediato</p>
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

      {/* Hero Testimonials - above fold */}
      <section className="landing__hero-testimonials" aria-label="Depoimentos de usuários reais">
        <div className="landing__hero-testimonials-inner">
          <h2 className="landing__hero-testimonials-title">O que as pessoas estão dizendo</h2>
          <div className="hero-testimonials-grid" role="list">
            {HERO_TESTIMONIALS.map((t, i) => (
              <div key={i} className="hero-testimonial-card">
                <div className="hero-testimonial__rating">⭐⭐⭐⭐⭐</div>
                <p className="hero-testimonial__text">{t.text}</p>
                <footer className="hero-testimonial__author">{t.author}</footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="landing__guarantee">
        <div className="landing__guarantee-inner">
          <div className="guarantee-card">
            <div className="guarantee-icon">🛡️</div>
            <h3>Garantia de 30 Dias</h3>
            <p>Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas. Sem burocracia.</p>
          </div>

          <div className="guarantee-row">
            <div className="guarantee-item">
              <div className="guarantee-item__icon">✓</div>
              <p><strong>Acesso Imediato</strong> - Seu mapa em 60 segundos</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-item__icon">✓</div>
              <p><strong>100% Seguro</strong> - Pagamento encriptado com SSL</p>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-item__icon">✓</div>
              <p><strong>Baseado em Ciência</strong> - Teoria do Apego validada</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="landing__faq">
        <div className="landing__faq-inner">
          <h2 className="landing__faq-title">Perguntas Frequentes</h2>
          <div className="faq-list" role="region" aria-label="Perguntas frequentes com respostas expansíveis">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="faq-item">
                <details className="faq-details">
                  <summary className="faq-summary">
                    <span className="faq-icon" aria-hidden="true">+</span>
                    <span className="faq-question">{item.question}</span>
                  </summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova social + Depoimentos */}
      <section className="landing__testimonials">
        <div className="landing__testimonials-inner">
          <p className="landing__social-proof">460+ pessoas já descobriram o seu jeito de amar</p>
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
