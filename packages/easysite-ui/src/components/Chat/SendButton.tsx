/**
 * SendButton Component
 * Primary button to send chat messages
 *
 * Accessibility: 44×44px touch target (ACC-002), aria-label, focus outline
 * Design: COR-089 primary color, white icon, hover/active states
 * States: default, loading, disabled, focus
 */

import React from 'react';

export interface SendButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  id?: string;
}

export const SendButton: React.FC<SendButtonProps> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  ariaLabel = 'Enviar mensagem',
  id,
}) => {
  const handleClick = () => {
    if (!isDisabled && !isLoading) {
      onClick();
    }
  };

  return (
    <button
      id={id}
      className="send-button"
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      type="button"
      title={isLoading ? 'Enviando...' : 'Enviar mensagem (Enter)'}
    >
      {isLoading ? (
        // Loading spinner
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="send-button-spinner"
          aria-hidden="true"
        >
          <circle
            cx="10"
            cy="10"
            r="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.2"
          />
          <path
            d="M19 10A9 9 0 0 1 1 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              animation: 'spin 1s linear infinite',
            }}
          />
        </svg>
      ) : (
        // Paper plane icon
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.5915026,1.44270841 C17.1624823,0.8717308 18.1193501,0.8717308 18.6903298,1.44270841 C19.2613095,2.01368599 19.2613095,2.97055383 18.6903298,3.5415314 L4.11452513,18.1173361 C3.54354755,18.6883136 2.58667972,18.6883136 2.01570214,18.1173361 C1.44472456,17.5463585 1.44472456,16.5894907 2.01570214,16.0185131 L16.5915026,1.44270841 Z" />
        </svg>
      )}

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .send-button-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </button>
  );
};

export default SendButton;
