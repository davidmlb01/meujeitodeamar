import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components'
import './Obrigado.css'

const UPSELL_BULLETS = [
  { label: 'Coração Ansioso', desc: 'Por que monitora tudo e como isso deixa de parecer drama quando você entende a origem' },
  { label: 'Coração Distante', desc: 'Por que some exatamente quando você mais precisa e o que está acontecendo por dentro' },
  { label: 'Coração Seguro', desc: 'Como pensa o amor de um jeito que parece simples e que pode te ensinar algo real' },
  { label: 'Coração Confuso', desc: 'Por que parece contraditório quando na verdade está com medo' },
  { label: null, desc: 'Cada leitura inclui como esse jeito de amar se relaciona com os outros três' },
]

function openUpsellCheckout() {
  const url = import.meta.env.VITE_KIWIFY_UPSELL_ID
    ? `https://pay.kiwify.com.br/${import.meta.env.VITE_KIWIFY_UPSELL_ID}`
    : 'https://pay.kiwify.com.br/JpX6Dn7'
  window.location.href = url
}

export default function Obrigado() {
  const [declined, setDeclined] = useState(false)

  return (
    <div className="obrigado">
      <div className="obrigado__inner">

        {/* Confirmação */}
        <div className="obrigado__confirm">
          <span className="obrigado__confirm-icon">✉️</span>
          <h1 className="obrigado__confirm-title">
            Pedido confirmado. Sua leitura está a caminho.
          </h1>
          <p className="obrigado__confirm-sub">
            Seu email com a leitura chega em até 2 minutos.
          </p>
        </div>

        {/* Upsell */}
        {!declined && (
          <div className="obrigado__upsell">
            <hr className="obrigado__divider" />
            <h2 className="obrigado__upsell-headline">
              Aguarde um segundo antes de fechar.
            </h2>
            <div className="obrigado__upsell-body">
              <p>Tem uma coisa que faz sentido você saber agora, enquanto isso ainda está fresco.</p>
              <p>Você acabou de descobrir como você ama. E se for parecido com a maioria das pessoas que passaram por aqui, nas próximas horas você vai começar a pensar nas pessoas ao seu redor com outros olhos.</p>
              <p>Seu parceiro. Sua mãe. Aquela amiga que você ama mas não entende.</p>
              <p>E vai perceber que cada um deles também tem um jeito de amar. E que esse jeito explica coisas que você tentou entender por anos sem conseguir.</p>
            </div>

            {/* Produto */}
            <div className="obrigado__product">
              <p className="obrigado__product-title">Combo Completo: Os 4 Jeitos de Amar</p>
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

              <p className="obrigado__product-bridge">
                Você não vai precisar comprar cada leitura separada. Tudo está aqui, no mesmo formato, pelo mesmo padrão.
              </p>

              <div className="obrigado__price-block">
                <p className="obrigado__price-original">4 leituras individuais · R$148</p>
                <p className="obrigado__price-current">R$67</p>
                <p className="obrigado__price-note">
                  Menos da metade do valor separado. Acesso imediato. Um clique.
                </p>
                <p className="obrigado__price-note">
                  Quando você sair dessa página, o acesso ao combo volta ao preço normal.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="obrigado__ctas">
              <Button onClick={openUpsellCheckout}>
                SIM, quero o Combo Completo por R$67
              </Button>
              <button
                className="obrigado__decline"
                onClick={() => setDeclined(true)}
              >
                Não, obrigado. Prefiro entender só o meu jeito de amar por enquanto.
              </button>
            </div>
          </div>
        )}

        {/* Instrução pós-compra */}
        <div className="obrigado__next">
          <p className="obrigado__next-title">Enquanto aguarda o email:</p>
          <p className="obrigado__next-body">
            Leia uma vez sem parar. Sem analisar. Só leia.
          </p>
          <p className="obrigado__next-body">
            Depois volte para a seção de pontos cegos. Essa costuma ser a mais incômoda e a mais útil.
          </p>
        </div>

        {/* Footer */}
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
