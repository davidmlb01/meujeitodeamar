/**
 * ChatDemo Component
 * Complete example of EasySite Chat Components in action
 *
 * This demo shows:
 * - Full chat interface with all components
 * - Dark mode toggle
 * - Message management
 * - Quick replies
 * - Error handling
 */

import React, { useState, useCallback } from 'react';
import { ChatProvider, useDarkMode } from './ChatProvider';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import MessageContainer from './MessageContainer';
import MessageInput from './MessageInput';
import SendButton from './SendButton';
import QuickReplies from './QuickReplies';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'failed';
  isLoading?: boolean;
  hasError?: boolean;
}

const ChatDemoContent: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Quick reply options
  const quickReplyOptions = [
    { id: '1', label: 'Qual é o preço?', value: 'price' },
    { id: '2', label: 'Como funciona?', value: 'how' },
    { id: '3', label: 'Suporte', value: 'support' },
    { id: '4', label: 'Documentação', value: 'docs' },
  ];

  // Add bot message with delay
  const addBotMessage = useCallback((content: string, delay: number = 1000) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content,
          timestamp: new Date(),
          status: undefined,
          isLoading: false,
          hasError: false,
        },
      ]);
      setIsLoading(false);
    }, delay);
  }, []);

  // Handle sending message
  const handleSendMessage = useCallback(
    (message: string) => {
      if (!message.trim()) return;

      // Add user message
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: message,
        timestamp: new Date(),
        status: 'sending',
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');

      // Update user message to 'sent'
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === userMsg.id ? { ...msg, status: 'sent' } : msg,
          ),
        );
      }, 500);

      // Show loading indicator
      setIsLoading(true);

      // Simulate bot response
      addBotMessage(
        'Ótima pergunta! Vou procurar mais informações sobre isso para você.',
        1500,
      );
    },
    [addBotMessage],
  );

  // Handle quick reply selection
  const handleQuickReply = useCallback(
    (option: any) => {
      const replyMap: { [key: string]: string } = {
        price: 'Nossos planos começam em R$397/mês com suporte 24h.',
        how: 'O EasySite cria seu site em 24h com IA. Você fornece informações e pronto!',
        support: 'Você pode entrar em contato conosco por email, chat ou telefone.',
        docs: 'Consulte nossa documentação completa em docs.easysite.com.br',
      };

      handleSendMessage(option.label);
      addBotMessage(replyMap[option.value] || 'Entendi!', 800);
    },
    [handleSendMessage, addBotMessage],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: isDarkMode ? '#0A0A0A' : '#FFFFFF',
        color: isDarkMode ? '#F5F5F5' : '#000000',
        transition: 'background-color 150ms ease, color 150ms ease',
      }}
    >
      {/* Header with Dark Mode Toggle */}
      <div
        style={{
          padding: '16px',
          borderBottom: `1px solid ${isDarkMode ? '#2D2D2D' : '#E5E7EB'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
          EasySite Chat Demo
        </h1>
        <button
          onClick={toggleDarkMode}
          style={{
            padding: '8px 16px',
            backgroundColor: isDarkMode ? '#2E5C8A' : '#6BA3FF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          {isDarkMode ? '☀️ Claro' : '🌙 Escuro'}
        </button>
      </div>

      {/* Message Container */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <MessageContainer messages={messages} isLoading={isLoading}>
          {messages.map((msg) =>
            msg.type === 'bot' ? (
              <BotMessage
                key={msg.id}
                content={msg.content}
                isLoading={msg.isLoading}
                hasError={msg.hasError}
                timestamp={msg.timestamp}
                id={msg.id}
              />
            ) : (
              <UserMessage
                key={msg.id}
                content={msg.content}
                status={msg.status as any}
                timestamp={msg.timestamp}
                id={msg.id}
              />
            ),
          )}
        </MessageContainer>
      </div>

      {/* Quick Replies */}
      {messages.length < 3 && (
        <QuickReplies
          options={quickReplyOptions}
          onSelect={handleQuickReply}
          disabled={isLoading}
        />
      )}

      {/* Input Area */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <MessageInput
            onSend={handleSendMessage}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            autoFocus={true}
          />
          <SendButton
            onClick={() => {
              if (inputValue.trim()) {
                handleSendMessage(inputValue);
              }
            }}
            isLoading={isLoading}
            isDisabled={!inputValue.trim() || isLoading}
            ariaLabel="Enviar mensagem"
          />
        </div>
      </div>
    </div>
  );
};

export const ChatDemo: React.FC = () => {
  return (
    <ChatProvider initialDarkMode={false}>
      <ChatDemoContent />
    </ChatProvider>
  );
};

export default ChatDemo;
