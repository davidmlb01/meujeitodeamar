import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
  'Análise do padrão de atração específico do seu jeito de amar',
  'Por que certas pessoas parecem inevitáveis desde o primeiro encontro',
  'O ciclo que se repete e como ele funciona por dentro',
  'O que muda na sua forma de escolher quando você entende a lógica',
]

const SUMMARY_BULLETS = [
  'Seu perfil identificado com precisão',
  'A dinâmica completa do seu padrão nos relacionamentos',
  'Seus pontos cegos: o que você faz sem perceber',
  'De onde veio esse jeito de amar',
  'Caminhos concretos de transformação',
]

const CHECKOUT_URLS = {
  ansioso: 'https://pay.kiwify.com.br/sEkZDxX',
  distante: 'https://pay.kiwify.com.br/qRXuct4',
  seguro:  'https://pay.kiwify.com.br/15XhzVM',
  confuso: 'https://pay.kiwify.com.br/8VHVs5p',
  fallback: 'https://pay.kiwify.com.br/sEkZDxX',
}

function getCheckoutUrl(estilo) {
  return CHECKOUT_URLS[estilo] ?? CHECKOUT_URLS.fallback
}

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const estilo = searchParams.get('estilo') ?? 'ansioso'

  const [ob1, setOb1] = useState(false)
  const [ob2, setOb2] = useState(false)

  const total = PRICE_BASE + (ob1 ? PRICE_OB1 : 0) + (ob2 ? PRICE_OB2 : 0)

  function handleCheckout() {
    window.location.href = getCheckoutUrl(estilo)
  }

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
                SIM, quero adicionar o Guia de Relacionamentos por Jeito de Amar.
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
                SIM, quero entender por que escolho quem escolho.
              </p>
              <p className="order-bump__price">Adicione por apenas R$19</p>
            </div>
          </div>
          <p className="order-bump__body">
            Por que eu sempre me apaixono pelo mesmo tipo de pessoa? Não é coincidência. É um padrão com uma lógica precisa. Esta leitura explica o padrão de atração específico do seu jeito de amar e o que muda quando você entende a gravidade que criou essas escolhas.
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
          <Button onClick={handleCheckout}>
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
