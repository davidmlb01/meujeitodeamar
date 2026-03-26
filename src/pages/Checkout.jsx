import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components'
import './Checkout.css'

const PRICE_BASE = 37
const PRICE_OB1 = 27
const PRICE_OB2 = 19

const OB1_BULLETS = [
  'Como funciona cada um dos quatro jeitos de amar',
  'O que cada pessoa realmente precisa, mesmo que nunca peça',
  'Como se comunicar com cada jeito sem criar conflito',
  'Por que certas combinações geram atrito e como navegar isso',
  'O que fazer quando dois jeitos de amar parecem incompatíveis',
]

const OB2_BULLETS = [
  'Leitura completa de 1 perfil à sua escolha',
  'Inclui "como esse jeito de amar se relaciona com o seu"',
  'Acesso permanente',
]

const SUMMARY_BULLETS = [
  'Seu perfil identificado com precisão',
  'A dinâmica completa do seu padrão nos relacionamentos',
  'Seus pontos cegos — o que você faz sem perceber',
  'De onde veio esse jeito de amar',
  'Caminhos concretos de transformação',
]

function openKiwifyCheckout() {
  const productId = import.meta.env.VITE_KIWIFY_PRODUCT_ID
  const fallbackUrl = import.meta.env.VITE_PAYMENT_URL

  if (productId && window.KiwifyCheckout) {
    window.KiwifyCheckout.open(productId)
  } else if (fallbackUrl) {
    window.open(fallbackUrl, '_blank', 'noopener')
  }
}

export default function Checkout() {
  const [ob1, setOb1] = useState(false)
  const [ob2, setOb2] = useState(false)

  const total = PRICE_BASE + (ob1 ? PRICE_OB1 : 0) + (ob2 ? PRICE_OB2 : 0)

  return (
    <div className="checkout">
      <div className="checkout__inner">

        {/* Cabeçalho */}
        <div className="checkout__header">
          <h1 className="checkout__header-title">
            Você está a um passo de entender o seu jeito de amar.
          </h1>
          <p className="checkout__header-sub">
            Revise seu pedido e finalize abaixo.
          </p>
        </div>

        {/* Resumo do pedido */}
        <div className="checkout__summary">
          <p className="checkout__summary-title">Sua Leitura Completa: Seu Jeito de Amar</p>
          <ul className="checkout__bullets">
            {SUMMARY_BULLETS.map((b) => (
              <li key={b} className="checkout__bullet">{b}</li>
            ))}
          </ul>
          <div className="checkout__price-row">
            <span className="checkout__price-label">Entrega imediata por email · Acesso permanente</span>
            <span className="checkout__price-value">R$37</span>
          </div>
        </div>

        {/* Order Bump 1 */}
        <label
          className={`order-bump${ob1 ? ' order-bump--checked' : ''}`}
          htmlFor="ob1"
        >
          <div className="order-bump__header">
            <input
              id="ob1"
              type="checkbox"
              className="order-bump__checkbox"
              checked={ob1}
              onChange={(e) => setOb1(e.target.checked)}
            />
            <div>
              <p className="order-bump__label">
                SIM, quero adicionar o Guia de Relacionamentos por Estilo.
              </p>
              <p className="order-bump__price">Adicione por apenas R$27</p>
            </div>
          </div>
          <p className="order-bump__body">
            Você acabou de descobrir o seu jeito de amar. Mas as pessoas ao seu redor também têm o jeito delas. O Guia te mostra como funciona cada perfil e como se comunicar com cada um sem criar conflito desnecessário.
          </p>
          <ul className="order-bump__bullets">
            {OB1_BULLETS.map((b) => (
              <li key={b} className="order-bump__item">{b}</li>
            ))}
          </ul>
          <p className="order-bump__urgency">São 28 páginas escritas para serem usadas, não arquivadas. Disponível apenas nessa página.</p>
        </label>

        {/* Order Bump 2 */}
        <label
          className={`order-bump${ob2 ? ' order-bump--checked' : ''}`}
          htmlFor="ob2"
        >
          <div className="order-bump__header">
            <input
              id="ob2"
              type="checkbox"
              className="order-bump__checkbox"
              checked={ob2}
              onChange={(e) => setOb2(e.target.checked)}
            />
            <div>
              <p className="order-bump__label">
                SIM, quero a leitura de quem eu amo.
              </p>
              <p className="order-bump__price">Adicione por apenas R$19</p>
            </div>
          </div>
          <p className="order-bump__body">
            Escolha um perfil e receba a leitura completa daquela pessoa: como ela ama, do que ela precisa, o que a faz recuar, o que a faz se aproximar.
          </p>
          <ul className="order-bump__bullets">
            {OB2_BULLETS.map((b) => (
              <li key={b} className="order-bump__item">{b}</li>
            ))}
          </ul>
          <p className="order-bump__urgency">Um clique. Sem nenhum dado adicional. Disponível apenas nessa página.</p>
        </label>

        {/* Total */}
        <div className="checkout__total" aria-live="polite">
          <span className="checkout__total-label">Total</span>
          <span className="checkout__total-value">R${total}</span>
        </div>

        {/* CTA */}
        <div className="checkout__cta-section">
          <Button onClick={openKiwifyCheckout}>
            Finalizar Pedido e Receber Minha Leitura
          </Button>
        </div>

        {/* Garantia */}
        <div className="checkout__guarantee">
          <p className="checkout__guarantee-title">Garantia incondicional de 7 dias.</p>
          <p className="checkout__guarantee-body">
            Se você receber sua leitura e achar que não valeu cada centavo, manda um email em até 7 dias. Você recebe tudo de volta, sem perguntas, sem burocracia, sem formulários de justificativa. Risco zero para você.
          </p>
        </div>

        {/* Selos */}
        <div className="checkout__seals">
          <span className="checkout__seal">🔒 Compra 100% segura</span>
          <span className="checkout__seal">📧 Entrega imediata por email</span>
          <span className="checkout__seal">♾️ Acesso permanente</span>
          <span className="checkout__seal">✅ Garantia de 7 dias</span>
        </div>

        {/* Legal */}
        <p className="checkout__legal">
          Ao finalizar a compra, você concorda com nossos{' '}
          <Link to="/termos">Termos de Uso</Link>
          {' '}e{' '}
          <Link to="/privacidade">Política de Privacidade</Link>.
        </p>

      </div>
    </div>
  )
}
