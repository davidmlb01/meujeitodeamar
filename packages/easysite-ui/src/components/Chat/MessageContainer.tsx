/**
 * MessageContainer Component
 * Container for all messages with sticky scroll to bottom
 *
 * Accessibility: Scroll to bottom automatically, focus on new messages
 * Design: Responsive 320px (full), 768px (90%), 1280px (600px max)
 * LAY-001 compliant: No horizontal scroll on mobile
 */

import React, { useEffect, useRef } from 'react';

export interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'failed';
  isLoading?: boolean;
  hasError?: boolean;
}

export interface MessageContainerProps {
  messages: Message[];
  isLoading?: boolean;
  children?: React.ReactNode;
  onScroll?: (isAtBottom: boolean) => void;
}

export const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  isLoading = false,
  children,
  onScroll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Track if container is scrolled to bottom
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    if (onScroll) {
      onScroll(isAtBottom);
    }
  };

  return (
    <div
      className="message-list"
      ref={containerRef}
      onScroll={handleScroll}
      role="log"
      aria-label="Histórico de mensagens"
      aria-live="polite"
      aria-atomic="false"
    >
      {messages.length === 0 && !isLoading && (
        <div
          className="empty-state"
          role="status"
          aria-label="Nenhuma mensagem ainda"
        >
          <p>Comece a conversa</p>
        </div>
      )}

      {children && <div className="message-container-children">{children}</div>}

      {isLoading && (
        <div className="loading-state" role="status" aria-label="Carregando">
          <div className="typing-indicator">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      )}

      {/* Sentinel element for scroll tracking */}
      <div ref={endOfMessagesRef} aria-hidden="true" />
    </div>
  );
};

export default MessageContainer;
