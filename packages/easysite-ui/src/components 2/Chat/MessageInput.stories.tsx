import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageInput, MessageInputProps } from './MessageInput';

/**
 * MessageInput Component Stories
 *
 * Tests states:
 * - Empty (default state)
 * - Focused (with focus outline)
 * - Disabled (grayed out, not interactive)
 * - With content
 * - Placeholder visible
 *
 * Accessibility: Focus states, keyboard support (Enter/Shift+Enter)
 * Design: TYP-001 (16px body), 44px touch target, focus outline
 */

const meta = {
  title: 'Chat/MessageInput',
  component: MessageInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text input for composing chat messages. Supports Enter to send, Shift+Enter for newline.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current input value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables input when true'
    },
    onChange: {
      control: false,
      description: 'Callback when input changes'
    },
    onKeyDown: {
      control: false,
      description: 'Callback for keyboard events'
    }
  }
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state: Empty input
 *
 * Verifies:
 * - Placeholder text visible
 * - 44px minimum height (ACC-002)
 * - Border color correct (color-border-light/dark)
 * - Font size 16px (TYP-001)
 * - No focus outline initially
 */
export const Empty: Story = {
  args: {
    value: '',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  }
};

/**
 * Focused state: Input has focus
 *
 * Verifies:
 * - 2px focus outline visible
 * - Outline color: #3B82F6 (var(--focus-outline-color))
 * - Focus ring has 0.1 opacity background shadow
 * - Border color changes to primary blue
 * - No default outline (outline: none)
 */
export const Focused: Story = {
  args: {
    value: '',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Focus state é interativo. Clique no input para ver o outline.
        </p>
      </div>
    )
  ]
};

/**
 * Disabled state: Input is disabled
 *
 * Verifies:
 * - Opacity 0.6
 * - Cursor: not-allowed
 * - Not interactive (cannot type)
 * - Gray color for placeholder
 */
export const Disabled: Story = {
  args: {
    value: '',
    placeholder: 'Entrada desabilitada',
    disabled: true
  }
};

/**
 * With content: Input has text
 *
 * Verifies:
 * - Text displays correctly
 * - Font size 16px (TYP-001)
 * - Line-height 1.5 (24px)
 * - Text color correct (color-text-light/dark)
 */
export const WithContent: Story = {
  args: {
    value: 'Olá! Gostaria de mais informações sobre seus serviços.',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  }
};

/**
 * Multiline content: Tests word wrapping
 *
 * Verifies:
 * - Text wraps at word boundaries
 * - Textarea grows as needed
 * - Proper line-height spacing
 * - No horizontal scroll (LAY-001)
 */
export const Multiline: Story = {
  args: {
    value: 'Esta é uma mensagem mais longa que pode quebrar em várias linhas. O textarea deve permitir múltiplas linhas sem scroll horizontal, respeitando o máximo de 768px de largura em mobile.',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  }
};

/**
 * Custom placeholder: Different placeholder text
 *
 * Verifies:
 * - Placeholder text displays
 * - Color: color-text-secondary (gray #6B7280)
 * - Font size matches input (16px)
 * - Placeholder disappears when typing
 */
export const CustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Qual é sua pergunta?',
    disabled: false
  }
};

/**
 * Very long content: Tests maximum content
 *
 * Verifies:
 * - Content doesn't overflow
 * - Word wrapping works
 * - Textarea can handle long text
 * - Scrolling works if textarea has max-height
 */
export const VeryLongContent: Story = {
  args: {
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  }
};

/**
 * Responsive: Mobile viewport (320px)
 *
 * Verifies:
 * - Input spans full width minus padding
 * - No horizontal scroll
 * - Touch target 44px works on mobile
 * - Responsive padding (spacing-sm on mobile)
 */
export const ResponsiveMobile: Story = {
  args: {
    value: '',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
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
 * - Padding adjusts for tablet
 * - Input width scales correctly
 */
export const ResponsiveTablet: Story = {
  args: {
    value: '',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Dark mode: Input in dark mode
 *
 * Verifies:
 * - Background: #0A0A0A
 * - Text: #F5F5F5
 * - Border: #2D2D2D
 * - Contrast >= 4.5:1 (ACC-001)
 * - Focus outline still visible on dark
 */
export const DarkMode: Story = {
  args: {
    value: '',
    placeholder: 'Digite sua mensagem...',
    disabled: false
  },
  parameters: {
    colorScheme: 'dark'
  },
  decorators: [
    (Story) => (
      <div style={{
        background: '#0A0A0A',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <Story />
      </div>
    )
  ]
};
