import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Obrigado.css'

const KIWIFY_UPSELL_ID = 'JpX6Dn7'
const TIMER_MINUTES = 10

const UPSELL_BULLETS = [
  { label: 'Coração Ansioso', desc: 'Por que monitora tudo e como isso deixa de parecer drama quando você entende a origem' },
  { label: 'Coração Distante', desc: 'Por que some exatamente quando você mais precisa e o que está acontecendo por dentro' },
  { label: 'Coração Seguro', desc: 'Como pensa o amor de um jeito que parece simples e que pode te ensinar algo real' },
  { label: 'Coração Confuso', desc: 'Por que parece contraditório quando na verdade está com medo' },
  { label: null, desc: 'Cada mapa inclui como esse jeito de amar se relaciona com os outros três' },
]

const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

function CountdownTimer({ minutes }) {
  const [remaining, setRemaining] = useState(minutes * 60)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <div className="countdown">
      <span className="countdown__time">{display}</span>
      <span className="countdown__label">Essa oferta expira quando o tempo acabar</span>
    </div>
  )
}

export default function Obrigado() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://snippets.kiwify.com/upsell/upsell.min.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="obrigado">
      <div className="obrigado__inner">

        {/* S1: Confirmação — fundo nude */}
        <div className="obrigado__confirm">
          <span className="obrigado__confirm-icon"><CheckIcon /></span>
          <h1 className="obrigado__confirm-title">
            Seu Mapa está a caminho.
          </h1>
          <p className="obrigado__confirm-sub">
            Enviamos para o email cadastrado na Kiwify. Chega em até 2 minutos.
          </p>
          <p className="obrigado__confirm-spam">
            Não encontrou? Verifique a pasta de spam ou promoções.
          </p>
        </div>

        {/* S2-S4: Upsell (bridge dark → produto nude → preço+timer+CTA dark) */}
        <div className="obrigado__upsell">

          {/* S2: Bridge — fundo DARK */}
          <div className="obrigado__upsell-bridge">
            <h2 className="obrigado__upsell-headline">
              Você acabou de entender como você ama.<br />
              <em>E as pessoas que você ama?</em>
            </h2>
          </div>

          <div className="obrigado__upsell-body">
            <p>Nas próximas horas você vai começar a pensar nas pessoas ao seu redor com outros olhos.</p>
            <p>Seu parceiro. Sua mãe. Aquela amiga que você ama mas não entende.</p>
            <p>Cada um deles também tem um jeito de amar. E esse jeito explica coisas que você tentou entender por anos.</p>
          </div>

          {/* S3: Produto — fundo nude */}
          <div className="obrigado__product">
            <p className="obrigado__product-lead">Todos esses jeitos de amar estão mapeados. E você pode ter acesso a todos agora.</p>
            <p className="obrigado__product-title">Combo Completo: Os 4 Mapas do Coração</p>
            <ul className="obrigado__bullets">
              {UPSELL_BULLETS.map((b, i) => (
                <li key={i} className={`obrigado__bullet${!b.label ? ' obrigado__bullet--no-check' : ''}`}>
                  <div className="obrigado__bullet-content">
                    {b.label && <span className="obrigado__bullet-label">{b.label}</span>}
                    <span className={b.label ? 'obrigado__bullet-desc' : 'obrigado__bullet-solo'}>{b.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* S4: Preço + Timer + CTA — fundo DARK */}
          <div className="obrigado__price-block">
            <p className="obrigado__price-original">4 mapas individuais · R$148</p>
            <p className="obrigado__price-current">R$67</p>
            <p className="obrigado__price-note">
              Menos da metade. Acesso imediato. Um clique.
            </p>
          </div>

          <CountdownTimer minutes={TIMER_MINUTES} />

          <div className="obrigado__ctas">
            <div id={`kiwify-upsell-${KIWIFY_UPSELL_ID}`} data-upsell-url="" data-downsell-url="">
              <button id={`kiwify-upsell-trigger-${KIWIFY_UPSELL_ID}`} className="obrigado__upsell-btn">
                SIM, quero o Combo Completo por R$67
              </button>
              <div id={`kiwify-upsell-cancel-trigger-${KIWIFY_UPSELL_ID}`} className="obrigado__decline">
                Não, prefiro ficar só com o meu jeito de amar por enquanto.
              </div>
            </div>
          </div>
        </div>

        {/* S5: Instrução pós-compra — fundo warm */}
        <div className="obrigado__next">
          <p className="obrigado__next-title">Enquanto aguarda o email:</p>
          <p className="obrigado__next-body">
            Leia uma vez sem parar. Sem analisar. Só leia.
          </p>
          <p className="obrigado__next-body">
            Depois volte para a seção de pontos cegos. Essa costuma ser a mais incômoda e a mais útil.
          </p>
        </div>

        {/* S6: Footer — fundo nude */}
        <div className="obrigado__footer">
          <p className="obrigado__footer-site">meujeitodeamar.com.br</p>
          <div className="obrigado__footer-links">
            <Link to="/termos">Termos de Uso</Link>
            <Link to="/privacidade">Política de Privacidade</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
