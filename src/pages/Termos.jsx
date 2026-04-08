import { Link } from 'react-router-dom'
import './Legal.css'

export default function Termos() {
  return (
    <div className="legal">
      <div className="legal__inner">

        <Link to="/" className="legal__back">← Voltar</Link>

        <div className="legal__header">
          <h1 className="legal__title">Termos de Uso</h1>
          <p className="legal__updated">Última atualização: março de 2025</p>
        </div>

        <div className="legal__body">

          <div className="legal__section">
            <h2 className="legal__section-title">1. O que é este serviço</h2>
            <div className="legal__section-body">
              <p>
                meujeitodeamar.com.br é uma plataforma de autoconhecimento que oferece um quiz sobre o jeito de amar de cada pessoa e materiais digitais de leitura. O conteúdo tem caráter informativo e educativo e não substitui acompanhamento psicológico, terapêutico ou médico.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">2. Produtos e entrega</h2>
            <div className="legal__section-body">
              <p>
                Os produtos são entregues digitalmente por email imediatamente após a confirmação do pagamento. São de acesso permanente e não possuem prazo de validade.
              </p>
              <p>
                A entrega é feita para o endereço de email informado no momento da compra. Verifique sua caixa de spam caso não receba em alguns minutos.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">3. Garantia e reembolso</h2>
            <div className="legal__section-body">
              <p>
                Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito com o produto por qualquer motivo, basta enviar um email para nosso suporte dentro de 7 dias corridos após a compra. O reembolso é processado em até 5 dias úteis, sem perguntas e sem burocracia.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">4. Uso do conteúdo</h2>
            <div className="legal__section-body">
              <p>
                Todo o conteúdo adquirido é de uso pessoal e intransferível. É proibido:
              </p>
              <ul>
                <li>Reproduzir, distribuir ou revender o conteúdo sem autorização</li>
                <li>Compartilhar links de acesso com terceiros</li>
                <li>Usar o conteúdo para fins comerciais sem licença</li>
              </ul>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">5. Limitação de responsabilidade</h2>
            <div className="legal__section-body">
              <p>
                O conteúdo é baseado em modelos psicológicos de referência e tem finalidade educativa. Não nos responsabilizamos por decisões tomadas com base nas leituras. Para questões de saúde mental, consulte um profissional habilitado.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">6. Processamento de pagamento</h2>
            <div className="legal__section-body">
              <p>
                Os pagamentos são processados pela Kiwify. Não armazenamos dados de cartão de crédito. As transações são protegidas por criptografia SSL.
              </p>
            </div>
          </div>

          <div className="legal__section">
            <h2 className="legal__section-title">7. Alterações nos termos</h2>
            <div className="legal__section-body">
              <p>
                Podemos atualizar estes termos a qualquer momento. A versão vigente sempre estará disponível nesta página. O uso continuado do serviço após alterações implica aceitação dos novos termos.
              </p>
            </div>
          </div>

          <div className="legal__contact">
            Dúvidas? Entre em contato: <a href="mailto:contato@meujeitodeamar.com.br">contato@meujeitodeamar.com.br</a>
          </div>

        </div>
      </div>
    </div>
  )
}
