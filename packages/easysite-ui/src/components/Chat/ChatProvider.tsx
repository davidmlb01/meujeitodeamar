/**
 * ChatProvider Component
 * Provides context for dark mode and chat state management
 *
 * Features:
 * - useDarkMode hook: manage dark/light theme
 * - useChat hook: manage chat state, messages, loading
 * - localStorage persistence: remembers user's theme preference
 * - System preference detection: respects prefers-color-scheme
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'failed';
  isLoading?: boolean;
  hasError?: boolean;
}

export interface ChatContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
}

export interface ChatStateContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
  setIsLoading: (loading: boolean) => void;
}

// Dark Mode Context
const ChatContext = createContext<ChatContextType | undefined>(undefined);
const ChatStateContext = createContext<ChatStateContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  initialDarkMode?: boolean;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  initialDarkMode,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('chat-dark-mode');
    if (stored !== null) {
      return stored === 'true';
    }

    // Fallback to system preference
    if (initialDarkMode !== undefined) {
      return initialDarkMode;
    }

    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false;
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update dark mode in DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('chat-dark-mode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (dark: boolean) => {
    setIsDarkMode(dark);
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const updateMessage = (id: string, updates: Partial<ChatMessage>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)),
    );
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const chatContextValue: ChatContextType = {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  };

  const chatStateContextValue: ChatStateContextType = {
    messages,
    isLoading,
    addMessage,
    updateMessage,
    removeMessage,
    clearMessages,
    setIsLoading,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      <ChatStateContext.Provider value={chatStateContextValue}>
        {children}
      </ChatStateContext.Provider>
    </ChatContext.Provider>
  );
};

/**
 * Hook to access dark mode context
 * @throws Error if used outside ChatProvider
 */
export const useDarkMode = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useDarkMode must be used within ChatProvider');
  }
  return context;
};

/**
 * Hook to access chat state context
 * @throws Error if used outside ChatProvider
 */
export const useChat = (): ChatStateContextType => {
  const context = useContext(ChatStateContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

export default ChatProvider;
