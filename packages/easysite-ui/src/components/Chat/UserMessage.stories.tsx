import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserMessage, UserMessageProps } from './UserMessage';

/**
 * UserMessage Component Stories
 *
 * Tests states:
 * - Sent (checkmark icon, green status)
 * - Sending (loading spinner, gray status)
 * - Failed (error icon, red status)
 *
 * Accessibility: aria-label for status, sr-only indicators
 * Design: COR-089 primary blue, white text, TYP-012 typography
 */

const meta = {
  title: 'Chat/UserMessage',
  component: UserMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'User message bubble with sending, sent, and failed states. Includes status indicators.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Message content text'
    },
    status: {
      control: 'radio',
      options: ['sending', 'sent', 'failed'],
      description: 'Message delivery status'
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
} satisfies Meta<typeof UserMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Sent state: Message delivered successfully
 *
 * Verifies:
 * - COR-089 primary blue background (#2E5C8A light, #6BA3FF dark)
 * - White text (5:1+ contrast on blue)
 * - Checkmark icon visible (COR-089 success #22C55E)
 * - "Enviado" status label for screen readers
 * - Timestamp displays correctly
 * - aria-label for accessibility
 */
export const Sent: Story = {
  args: {
    content: 'Olá! Gostaria de mais informações.',
    status: 'sent',
    timestamp: new Date('2026-05-10T14:31:00'),
    id: 'user-msg-sent'
  }
};

/**
 * Sending state: Message being delivered
 *
 * Verifies:
 * - COR-089 primary blue background
 * - Loading spinner animation (150-300ms)
 * - Gray status text (opacity 0.7)
 * - "Enviando" status label for screen readers
 * - No timestamp shown while sending
 */
export const Sending: Story = {
  args: {
    content: 'Estou enviando esta mensagem agora.',
    status: 'sending',
    id: 'user-msg-sending'
  }
};

/**
 * Failed state: Message delivery failed
 *
 * Verifies:
 * - COR-089 primary blue background (message still blue)
 * - Error icon visible (COR-089 error #EF4444)
 * - Red status text indicating failure
 * - "Falha ao enviar" status label
 * - aria-label for accessibility
 */
export const Failed: Story = {
  args: {
    content: 'Esta mensagem falhou ao enviar.',
    status: 'failed',
    timestamp: new Date('2026-05-10T14:32:00'),
    id: 'user-msg-failed'
  }
};

/**
 * Long content: Tests text wrapping
 *
 * Verifies:
 * - word-wrap and overflow-wrap working
 * - Max-width: 80% on desktop
 * - Max-width: 90% on tablet
 * - Max-width: 100% on mobile
 * - Line-height 1.5 for readability (TYP-002)
 */
export const LongContent: Story = {
  args: {
    content: 'Esta é uma mensagem mais longa do usuário que deve quebrar em várias linhas. A formatação deve respeitar o line-height de 1.5 (24px) e o tamanho de fonte de 16px conforme TYP-012. O contraste entre texto branco e fundo azul deve ser >= 4.5:1 (ACC-001).',
    status: 'sent',
    timestamp: new Date('2026-05-10T14:35:00'),
    id: 'user-msg-long'
  }
};

/**
 * Short message: Tests minimal sizing
 *
 * Verifies:
 * - Message doesn't collapse below min-height
 * - Padding still applied correctly
 * - Status icon positioned correctly
 */
export const ShortMessage: Story = {
  args: {
    content: 'OK',
    status: 'sent',
    timestamp: new Date('2026-05-10T14:33:00'),
    id: 'user-msg-short'
  }
};

/**
 * No timestamp: Sending state typically has no timestamp
 *
 * Verifies:
 * - Message displays without timestamp
 * - Status indicator shows correctly
 */
export const NoTimestamp: Story = {
  args: {
    content: 'Mensagem sem timestamp',
    status: 'sending',
    id: 'user-msg-no-time'
  }
};

/**
 * Responsive: Shows at 320px (mobile) viewport
 *
 * Verifies:
 * - No horizontal scroll at 320px
 * - Responsive padding adjustments
 * - Status icon accessible on mobile (44×44px touch target + extended hit area)
 */
export const ResponsiveMobile: Story = {
  args: {
    content: 'Olá! Esta é uma mensagem do usuário.',
    status: 'sent',
    timestamp: new Date('2026-05-10T14:31:00'),
    id: 'user-msg-mobile'
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
 * - Max-width: 90% on tablet
 * - Responsive padding adjustments
 */
export const ResponsiveTablet: Story = {
  args: {
    content: 'Olá! Esta é uma mensagem do usuário.',
    status: 'sent',
    timestamp: new Date('2026-05-10T14:31:00'),
    id: 'user-msg-tablet'
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

/**
 * All states side-by-side: Comparison view
 * (This would need custom layout, but shown as separate stories above)
 *
 * Visual comparison checklist:
 * - Sent: Green checkmark, "Enviado"
 * - Sending: Gray spinner, "Enviando"
 * - Failed: Red X, "Falha ao enviar"
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p>Sent:</p>
        <UserMessage content="Enviado com sucesso" status="sent" timestamp={new Date()} id="demo-sent" />
      </div>
      <div>
        <p>Sending:</p>
        <UserMessage content="Enviando mensagem" status="sending" id="demo-sending" />
      </div>
      <div>
        <p>Failed:</p>
        <UserMessage content="Falha ao enviar" status="failed" timestamp={new Date()} id="demo-failed" />
      </div>
    </div>
  )
};
