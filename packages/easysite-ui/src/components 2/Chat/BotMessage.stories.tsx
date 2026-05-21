import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BotMessage, BotMessageProps } from './BotMessage';

/**
 * BotMessage Component Stories
 *
 * Tests states:
 * - Default (content + timestamp)
 * - Loading (typing indicator)
 * - Error (error state)
 *
 * Accessibility: aria-live, sr-only labels
 * Design: COR-089 colors, TYP-012 typography
 */

const meta = {
  title: 'Chat/BotMessage',
  component: BotMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Bot message bubble with loading and error states. Includes typing indicator and timestamps.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Message content text'
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows typing indicator when true'
    },
    hasError: {
      control: 'boolean',
      description: 'Shows error state when true'
    },
    timestamp: {
      control: false,
      description: 'Timestamp of the message'
    },
    id: {
      control: 'text',
      description: 'Unique message identifier'
    }
  }
} satisfies Meta<typeof BotMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state: Bot message with content and timestamp
 *
 * Verifies:
 * - COR-089 secondary light background (#F8F9FA)
 * - Text contrast >= 4.5:1
 * - Timestamp displays in pt-BR locale
 * - aria-live="polite" for screen readers
 */
export const Default: Story = {
  args: {
    content: 'Olá! Como posso ajudar você hoje?',
    timestamp: new Date('2026-05-10T14:30:00'),
    id: 'bot-msg-001'
  }
};

/**
 * Loading state: Shows typing indicator
 *
 * Verifies:
 * - Typing dots animation (1.4s)
 * - aria-label="Digitando resposta" for accessibility
 * - No timestamp shown during loading
 * - Bubble height fixed (min-height: 32px)
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    id: 'bot-msg-loading'
  }
};

/**
 * Error state: Shows error message
 *
 * Verifies:
 * - COR-089 error background (#EF4444)
 * - White text on error background
 * - Error message displays
 * - sr-only label "Erro ao carregar mensagem:"
 */
export const Error: Story = {
  args: {
    hasError: true,
    id: 'bot-msg-error'
  }
};

/**
 * Long content: Tests text wrapping
 *
 * Verifies:
 * - word-wrap and overflow-wrap working
 * - Max-width: 80% on desktop
 * - Max-width: 90% on tablet (768px)
 * - Max-width: 100% on mobile (320px)
 */
export const LongContent: Story = {
  args: {
    content: 'Este é um exemplo de uma mensagem mais longa que deve quebrar em várias linhas. A formatação deve respeitar o line-height de 1.5 (24px) e o tamanho de fonte de 16px conforme TYP-012. Testes de acessibilidade e contraste devem passar com ACC-001 e ACC-004.',
    timestamp: new Date('2026-05-10T14:35:00'),
    id: 'bot-msg-long'
  }
};

/**
 * Multiple paragraphs: Tests paragraph spacing
 *
 * Verifies:
 * - Each paragraph renders with proper spacing
 * - Margin-bottom: 8px between paragraphs (spacing-sm)
 * - Last paragraph has no bottom margin
 */
export const MultiParagraph: Story = {
  args: {
    content: 'Primeira linha de conteúdo.\n\nSegunda linha de conteúdo com espaçamento apropriado.',
    timestamp: new Date('2026-05-10T14:40:00'),
    id: 'bot-msg-multi'
  }
};

/**
 * No timestamp: Tests rendering without timestamp
 *
 * Verifies:
 * - Message displays correctly without timestamp
 * - No empty space where timestamp would be
 */
export const NoTimestamp: Story = {
  args: {
    content: 'Mensagem sem timestamp',
    id: 'bot-msg-no-time'
  }
};

/**
 * Responsive: Shows at 320px (mobile) viewport
 *
 * Verifies:
 * - No horizontal scroll at 320px
 * - Responsive breakpoints work (LAY-001)
 * - Touch targets accessible on mobile
 */
export const ResponsiveMobile: Story = {
  args: {
    content: 'Olá! Como posso ajudar você?',
    timestamp: new Date('2026-05-10T14:30:00'),
    id: 'bot-msg-mobile'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Responsive: Shows at 768px (tablet) viewport
 *
 * Verifies:
 * - Responsive padding adjustments
 * - Max-width: 90% on tablet
 */
export const ResponsiveTablet: Story = {
  args: {
    content: 'Olá! Como posso ajudar você?',
    timestamp: new Date('2026-05-10T14:30:00'),
    id: 'bot-msg-tablet'
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};
