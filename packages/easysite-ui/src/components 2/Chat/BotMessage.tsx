/**
 * BotMessage Component
 * Displays messages from the bot with loading and error states
 *
 * Accessibility: aria-live="polite" for new messages, sr-only for status
 * Design: COR-089 secondary light/dark, TYP-012 body text
 * Mobile: 90% width on mobile, no h-scroll
 */

import React from 'react';

export interface BotMessageProps {
  content?: string;
  isLoading?: boolean;
  hasError?: boolean;
  timestamp?: Date;
  id?: string;
}

export const BotMessage: React.FC<BotMessageProps> = ({
  content,
  isLoading = false,
  hasError = false,
  timestamp,
  id,
}) => {
  const formattedTime = timestamp
    ? timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : '';

  const messageClass = [
    'bot-message',
    isLoading && 'is-loading',
    hasError && 'is-error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={messageClass}
      id={id}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="message-bubble">
        <div className="bubble-content">
          {isLoading ? (
            <div className="typing-indicator" aria-label="Digitando resposta">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          ) : hasError ? (
            <p>
              <span className="sr-only">Erro ao carregar mensagem:</span>
              Desculpe, houve um problema ao processar sua mensagem. Tente novamente.
            </p>
          ) : (
            <p>{content || 'Sem conteúdo'}</p>
          )}
        </div>
      </div>

      {!isLoading && timestamp && (
        <div className="message-timestamp" aria-label={`Enviado em ${formattedTime}`}>
          {formattedTime}
        </div>
      )}
    </div>
  );
};

export default BotMessage;
