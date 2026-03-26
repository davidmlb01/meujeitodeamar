import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components'
import './Obrigado.css'

const UPSELL_BULLETS = [
  'Leitura completa do Coração Ansioso',
  'Leitura completa do Coração Distante',
  'Leitura completa do Coração Seguro',
  'Leitura completa do Coração Confuso',
  'Inclui a seção de como cada jeito se relaciona com o seu',
]

function openUpsellCheckout() {
  const productId = import.meta.env.VITE_KIWIFY_UPSELL_ID
  const fallbackUrl = import.meta.env.VITE_PAYMENT_URL

  if (productId && window.KiwifyCheckout) {
    window.KiwifyCheckout.open(productId)
  } else if (fallbackUrl) {
    window.location.href = fallbackUrl
  }
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
            Verifique sua caixa de entrada agora. O email com a sua leitura foi enviado para você.
          </p>
        </div>

        {/* Upsell */}
        {!declined && (
          <div className="obrigado__upsell">
            <p className="obrigado__upsell-hook">Aguarde antes de fechar essa página.</p>
            <h2 className="obrigado__upsell-headline">
              Você acabou de dar um passo que a maioria das pessoas nunca dá.
            </h2>
            <div className="obrigado__upsell-body">
              <p>A maioria das pessoas passa anos repetindo os mesmos padrões nos relacionamentos sem nunca entender de onde eles vieram. Você não. Você quis saber.</p>
              <p>E agora que você sabe o seu jeito de amar, há uma coisa que vai transformar completamente a forma como você entende tudo ao seu redor.</p>
              <p>Você pode conhecer o seu jeito de amar com perfeição. Mas as pessoas ao seu redor ainda são um mistério.</p>
              <p>Por que seu parceiro some por dias sem dar satisfação e depois volta como se nada tivesse acontecido? Por que sua mãe sempre consegue te fazer sentir culpado sem dizer uma palavra errada? Por que aquele amigo que você mais gosta é exatamente o mais difícil de manter perto?</p>
              <p>Cada um deles tem um jeito de amar. E esse jeito explica tudo.</p>
            </div>

            {/* Produto */}
            <div className="obrigado__product">
              <p className="obrigado__product-title">Combo Completo: Os 4 Jeitos de Amar</p>
              <ul className="obrigado__bullets">
                {UPSELL_BULLETS.map((b) => (
                  <li key={b} className="obrigado__bullet">{b}</li>
                ))}
              </ul>

              <div className="obrigado__price-block">
                <p className="obrigado__price-original">4 leituras individuais · R$148</p>
                <p className="obrigado__price-current">R$67</p>
                <p className="obrigado__price-note">
                  Pelas quatro leituras completas. Disponível apenas nessa página.
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
          <p className="obrigado__next-title">Enquanto você aguarda o email:</p>
          <p className="obrigado__next-body">
            Algumas pessoas nos perguntam o que fazer com a leitura quando ela chegar.
            A nossa recomendação é simples: leia uma vez sem parar. Não analise. Não julgue. Só leia.
          </p>
          <p className="obrigado__next-body">
            Muita coisa vai fazer sentido de formas que você não esperava.
            Depois, releia a seção de pontos cegos. Essa costuma ser a mais incômoda e a mais útil.
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
