/**
 * MessageInput Component
 * Text input field for chat messages with keyboard support (Enter to send)
 *
 * Accessibility: 44px height touch target, aria-label, focus outline
 * Design: 16px body text, border on focus, dark mode support
 * Keyboard: Enter to send, Shift+Enter for newline
 */

import React, { useState, useRef, useEffect } from 'react';

export interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  id?: string;
  autoFocus?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = 'Digite sua mensagem...',
  disabled = false,
  maxLength = 1000,
  id,
  autoFocus = false,
}) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend(value.trim());
        setValue('');
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    setValue(newValue);

    // Auto-grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120,
      )}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInput(e);
  };

  return (
    <div className="message-input-wrapper">
      <label htmlFor={id || 'message-input'} className="sr-only">
        Escrever mensagem
      </label>
      <textarea
        ref={textareaRef}
        id={id || 'message-input'}
        className="message-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={1}
        aria-label="Escrever mensagem"
        aria-describedby={`${id || 'message-input'}-hint`}
      />
      <span
        id={`${id || 'message-input'}-hint`}
        className="sr-only"
      >
        Pressione Enter para enviar, Shift+Enter para quebra de linha
      </span>
    </div>
  );
};

export default MessageInput;
