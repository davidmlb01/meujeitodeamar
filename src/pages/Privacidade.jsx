import { Link } from 'react-router-dom'
import './Legal.css'

export default function Privacidade() {
  return (
    <div className="legal">
      <div className="legal__inner">

        <Link to="/" className="legal__back">← Voltar</Link>

        <div className="legal__header">
          <h1 className="legal__title">Política de Privacidade</h1>
          <p className="legal__updated">Última atualização: março de 2025</p>
        </div>

        <div className="legal__body">

          <div className="legal__section">
            <h2 className="legal__section-title">1. Quais dados coletamos</h2>
            <div className="legal__section-body">
              <p>Coletamos apenas os dados necessários para entregar o produto e melhorar a experiência:</p>
              <ul>
                <li>Email e nome — fornecidos no momento da compra (via Kiwify)</li>
                <li>Respostas do quiz — processadas localmente no seu navegador, não enviadas a servidores</li>
                <li>Dados de navegação — via cookies analíticos (GA4, Microsoft Clarity) para entender como as pessoas usam o site</li>
              </ul>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">2. Como usamos seus dados</h2>
            <div className="legal__section-body">
              <ul>
                <li>Entrega do produto por email</li>
                <li>Suporte ao cliente</li>
                <li>Envio de comunicações relacionadas ao produto (você pode cancelar a qualquer momento)</li>
                <li>Análise de desempenho do site para melhorar a experiência</li>
              </ul>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">3. Compartilhamento de dados</h2>
            <div className="legal__section-body">
              <p>
                Não vendemos seus dados. Compartilhamos apenas com prestadores de serviço essenciais:
              </p>
              <ul>
                <li>Kiwify — processamento de pagamento e entrega do produto</li>
                <li>Google Analytics (GA4) — métricas de uso anônimas</li>
                <li>Microsoft Clarity — mapas de calor e gravações de sessão anônimas</li>
              </ul>
              <p>
                Todos os parceiros seguem suas próprias políticas de privacidade e estão em conformidade com a LGPD.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">4. Cookies</h2>
            <div className="legal__section-body">
              <p>
                Usamos cookies para análise de tráfego e melhoria da experiência. Você pode desativar cookies nas configurações do seu navegador. Algumas funcionalidades do site podem ser afetadas.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">5. Seus direitos (LGPD)</h2>
            <div className="legal__section-body">
              <p>De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
              <ul>
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, entre em contato pelo email abaixo.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">6. Retenção de dados</h2>
            <div className="legal__section-body">
              <p>
                Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas ou conforme exigido por lei. Dados de compra são retidos por 5 anos para fins fiscais.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">7. Segurança</h2>
            <div className="legal__section-body">
              <p>
                Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração. As transações financeiras são criptografadas via SSL.
              </p>
            </div>
          </div>

          <div className="legal__contact">
            Dúvidas ou solicitações relacionadas à privacidade:{' '}
            <a href="mailto:privacidade@meujeitodeamar.com.br">privacidade@meujeitodeamar.com.br</a>
          </div>

        </div>
      </div>
    </div>
  )
}
