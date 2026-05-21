/**
 * UserMessage Component
 * Displays messages from the user with status indicators (sending, sent, failed)
 *
 * Accessibility: aria-label para status, 44×44px touch targets
 * Design: COR-089 primary light/dark, white text
 * Mobile: 90% width on mobile, status visible
 */

import React from 'react';

export interface UserMessageProps {
  content: string;
  status?: 'sending' | 'sent' | 'failed';
  timestamp?: Date;
  onRetry?: () => void;
  id?: string;
}

export const UserMessage: React.FC<UserMessageProps> = ({
  content,
  status = 'sent',
  timestamp,
  onRetry,
  id,
}) => {
  const formattedTime = timestamp
    ? timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : '';

  const getStatusLabel = (s: string) => {
    switch (s) {
      case 'sending':
        return 'Enviando...';
      case 'sent':
        return 'Entregue';
      case 'failed':
        return 'Erro ao enviar';
      default:
        return '';
    }
  };

  return (
    <div className="user-message" id={id}>
      <div className="message-bubble">
        <div className="bubble-content">
          <p>{content}</p>
        </div>
      </div>

      <div className={`message-status ${status}`} aria-label={getStatusLabel(status)}>
        {status === 'sent' && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 11-1.06-1.06l7.25-7.25a.75.75 0 011.06 0z" />
            <path d="M2.22 4.22a.75.75 0 011.06 0L10.5 11.44a.75.75 0 11-1.06 1.06L2.22 5.28a.75.75 0 010-1.06z" />
          </svg>
        )}

        {status === 'sending' && (
          <span className="sr-only">Enviando mensagem...</span>
        )}

        {status === 'failed' && onRetry && (
          <button
            onClick={onRetry}
            className="retry-button"
            aria-label="Tentar enviar novamente"
            title="Tentar enviar novamente"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 2a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 2z" />
              <path d="M11.3 4.7a.75.75 0 011.06 0 6 6 0 110-8.485.75.75 0 01-1.06 1.06 4.5 4.5 0 100 6.365z" />
            </svg>
          </button>
        )}
      </div>

      {timestamp && (
        <div className="message-timestamp" aria-label={`Enviado em ${formattedTime}`}>
          {formattedTime}
        </div>
      )}
    </div>
  );
};

export default UserMessage;
