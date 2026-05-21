import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageContainer, MessageContainerProps } from './MessageContainer';

/**
 * MessageContainer Component Stories
 *
 * Tests:
 * - Empty state
 * - Message list (bot + user messages)
 * - Scrollable container
 * - Different message states mixed
 *
 * Accessibility: Auto-scrolling, aria-live regions
 * Design: Scrollbar styling, spacing, no h-scroll on mobile
 */

const meta = {
  title: 'Chat/MessageContainer',
  component: MessageContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container that holds and displays a list of chat messages with auto-scroll to newest.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    messages: {
      control: false,
      description: 'Array of message objects to display'
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading indicator at the end'
    }
  }
} satisfies Meta<typeof MessageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Empty state: No messages
 *
 * Verifies:
 * - Container displays correctly when empty
 * - Proper styling and spacing
 * - Scrollbar not visible (no content to scroll)
 */
export const Empty: Story = {
  args: {
    messages: [],
    isLoading: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '400px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Single message: One message conversation start
 *
 * Verifies:
 * - Message renders in container
 * - Proper scrolling behavior
 * - Spacing from container edges
 */
export const SingleMessage: Story = {
  args: {
    messages: [
      {
        id: 'msg-1',
        type: 'bot',
        content: 'Olá! Como posso ajudar você?',
        timestamp: new Date('2026-05-10T14:30:00')
      }
    ],
    isLoading: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '400px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Multiple messages: Conversation flow
 *
 * Verifies:
 * - Bot and user messages alternate correctly
 * - Proper spacing between messages (gap: 16px)
 * - Different states (sent, loading, error) display
 * - Auto-scroll to latest message
 * - Scrollbar visible and functional
 */
export const MultipleMessages: Story = {
  args: {
    messages: [
      {
        id: 'msg-1',
        type: 'bot',
        content: 'Olá! Como posso ajudar você?',
        timestamp: new Date('2026-05-10T14:30:00')
      },
      {
        id: 'msg-2',
        type: 'user',
        content: 'Gostaria de informações sobre o serviço.',
        status: 'sent',
        timestamp: new Date('2026-05-10T14:31:00')
      },
      {
        id: 'msg-3',
        type: 'bot',
        content: 'Claro! Nosso serviço oferece sites profissionais em 24 horas.',
        timestamp: new Date('2026-05-10T14:32:00')
      },
      {
        id: 'msg-4',
        type: 'user',
        content: 'Qual é o preço?',
        status: 'sent',
        timestamp: new Date('2026-05-10T14:33:00')
      },
      {
        id: 'msg-5',
        type: 'bot',
        content: 'Temos um plano especial a partir de R$ 397. Gostaria de mais detalhes?',
        timestamp: new Date('2026-05-10T14:34:00')
      }
    ],
    isLoading: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '500px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Loading state: Bot is typing
 *
 * Verifies:
 * - Loading indicator shows at the end
 * - Typing dots animate
 * - Auto-scroll to loading message
 */
export const WithLoading: Story = {
  args: {
    messages: [
      {
        id: 'msg-1',
        type: 'bot',
        content: 'Olá! Como posso ajudar?',
        timestamp: new Date('2026-05-10T14:30:00')
      },
      {
        id: 'msg-2',
        type: 'user',
        content: 'Fale sobre seus serviços.',
        status: 'sent',
        timestamp: new Date('2026-05-10T14:31:00')
      },
      {
        id: 'msg-3',
        type: 'bot',
        isLoading: true
      }
    ],
    isLoading: true
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '500px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Error state: Bot error message in conversation
 *
 * Verifies:
 * - Error message displays with red background
 * - Conversation continues normally after error
 * - Error indicator visible (sr-only label)
 */
export const WithError: Story = {
  args: {
    messages: [
      {
        id: 'msg-1',
        type: 'bot',
        content: 'Olá! Como posso ajudar?',
        timestamp: new Date('2026-05-10T14:30:00')
      },
      {
        id: 'msg-2',
        type: 'user',
        content: 'Gostaria de informações.',
        status: 'sent',
        timestamp: new Date('2026-05-10T14:31:00')
      },
      {
        id: 'msg-3',
        type: 'bot',
        hasError: true
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Tente novamente. Como posso ajudar?',
        timestamp: new Date('2026-05-10T14:32:00')
      }
    ],
    isLoading: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '500px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Long conversation: Scroll testing
 *
 * Verifies:
 * - Scrollbar visible and functional
 * - Smooth scrolling enabled
 * - Content doesn't overflow horizontally (LAY-001)
 * - Word wrapping works for all messages
 */
export const LongConversation: Story = {
  args: {
    messages: [
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `msg-bot-${i}`,
        type: 'bot' as const,
        content: `Mensagem do bot número ${i + 1}. Esta é uma mensagem um pouco mais longa para testar a quebra de linhas e o comportamento do container com múltiplas mensagens.`,
        timestamp: new Date('2026-05-10T14:30:00')
      })),
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `msg-user-${i}`,
        type: 'user' as const,
        content: `Mensagem do usuário número ${i + 1}. Também com conteúdo um pouco mais longo.`,
        status: 'sent' as const,
        timestamp: new Date('2026-05-10T14:31:00')
      }))
    ],
    isLoading: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '500px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Responsive: Mobile viewport (320px)
 *
 * Verifies:
 * - No horizontal scroll
 * - Responsive padding (spacing-sm on mobile)
 * - Messages take 90-100% width
 * - Container height adjusts
 */
export const ResponsiveMobile: Story = {
  args: {
    messages: [
      {
        id: 'msg-1',
        type: 'bot',
        content: 'Olá! Como posso ajudar?',
        timestamp: new Date('2026-05-10T14:30:00')
      },
      {
        id: 'msg-2',
        type: 'user',
        content: 'Gostaria de informações.',
        status: 'sent',
        timestamp: new Date('2026-05-10T14:31:00')
      }
    ],
    isLoading: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Responsive: Tablet viewport (768px)
 *
 * Verifies:
 * - Responsive adjustments work
 * - Padding and spacing scale
 */
export const ResponsiveTablet: Story = {
  args: {
    messages: [
      {
        id: 'msg-1',
        type: 'bot',
        content: 'Olá! Como posso ajudar?',
        timestamp: new Date('2026-05-10T14:30:00')
      },
      {
        id: 'msg-2',
        type: 'user',
        content: 'Gostaria de informações.',
        status: 'sent',
        timestamp: new Date('2026-05-10T14:31:00')
      }
    ],
    isLoading: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    )
  ]
};
