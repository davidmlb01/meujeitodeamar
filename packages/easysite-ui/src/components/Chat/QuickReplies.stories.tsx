import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuickReplies, QuickRepliesProps } from './QuickReplies';

/**
 * QuickReplies Component Stories
 *
 * Tests:
 * - Single reply
 * - Multiple replies (2-4)
 * - Wrapping behavior
 * - Disabled state
 * - Different button widths
 *
 * Accessibility: 48×48px extended hit area (ACC-002), keyboard nav, focus visible
 * Design: COR-089 primary, border 2px, TYP-012 small text (14px)
 */

const meta = {
  title: 'Chat/QuickReplies',
  component: QuickReplies,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Quick reply buttons that suggest common responses. Extended hit area for mobile accessibility.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    replies: {
      control: false,
      description: 'Array of reply button objects'
    },
    onReplyClick: {
      control: false,
      description: 'Callback when a reply is clicked'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all buttons when true'
    }
  }
} satisfies Meta<typeof QuickReplies>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Single reply: One quick reply button
 *
 * Verifies:
 * - Button displays correctly
 * - Min-width: 40px (visual size)
 * - Height: 40px
 * - Border: 2px solid COR-089 primary
 * - Padding: 0 16px (spacing-md)
 * - Text color: COR-089 primary
 */
export const SingleReply: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' }
    ],
    disabled: false
  }
};

/**
 * Multiple replies: 2-4 buttons
 *
 * Verifies:
 * - All buttons visible
 * - Gap: 8px (spacing-sm) between buttons
 * - Flex layout works
 * - Text doesn't overflow (white-space: nowrap)
 * - Touch targets accessible (extended hit area)
 */
export const MultipleReplies: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' },
      { id: 'reply-3', text: 'Talvez' },
      { id: 'reply-4', text: 'Não tenho certeza' }
    ],
    disabled: false
  }
};

/**
 * Long reply text: Tests word wrapping
 *
 * Verifies:
 * - Long text doesn't wrap (white-space: nowrap)
 * - Button grows horizontally as needed
 * - Text stays centered in button
 */
export const LongReplyText: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Quero saber mais sobre preços' },
      { id: 'reply-2', text: 'Preciso de suporte técnico' }
    ],
    disabled: false
  }
};

/**
 * Hovering button: Shows hover state
 *
 * Verifies:
 * - Background: COR-089 primary
 * - Text color: white
 * - Smooth transition (150ms)
 * - Cursor: pointer
 */
export const HoverState: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' }
    ],
    disabled: false
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Hover state é interativo. Passe o mouse sobre os botões.
        </p>
      </div>
    )
  ]
};

/**
 * Focus state: Keyboard navigation
 *
 * Verifies:
 * - 2px focus outline visible
 * - Outline color: #3B82F6
 * - Tab order correct (left to right)
 * - Keyboard accessible (ACC-003)
 */
export const FocusState: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' },
      { id: 'reply-3', text: 'Talvez' }
    ],
    disabled: false
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Focus state é interativo. Pressione Tab para navegar.
        </p>
      </div>
    )
  ]
};

/**
 * Active state: Button pressed
 *
 * Verifies:
 * - Scale: 0.95
 * - Visual feedback on click
 * - Quick response
 */
export const ActiveState: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' }
    ],
    disabled: false
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Active state é visual. Pressione e segure um botão.
        </p>
      </div>
    )
  ]
};

/**
 * Disabled state: All buttons disabled
 *
 * Verifies:
 * - Opacity: 0.6
 * - Cursor: not-allowed
 * - Not clickable
 * - Gray appearance
 */
export const Disabled: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' },
      { id: 'reply-3', text: 'Talvez' }
    ],
    disabled: true
  }
};

/**
 * Wrapping layout: Many buttons that wrap
 *
 * Verifies:
 * - flex-wrap: wrap works
 * - Buttons wrap to next line on narrow screens
 * - Responsive behavior
 */
export const WrappingLayout: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Opção 1' },
      { id: 'reply-2', text: 'Opção 2' },
      { id: 'reply-3', text: 'Opção 3' },
      { id: 'reply-4', text: 'Opção 4' },
      { id: 'reply-5', text: 'Opção 5' },
      { id: 'reply-6', text: 'Opção 6' }
    ],
    disabled: false
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px', border: '1px solid #ccc', padding: '8px' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Extended hit area: Accessibility testing
 *
 * Verifies:
 * - ::before pseudo-element creates 48×48px hit area
 * - pointer-events: none on pseudo-element
 * - Touch targets >= 44×44px (ACC-002)
 * - Small visual button (40×40px) with larger hit area
 *
 * Visual indicator: Button looks 40×40px but has 48×48px touch area
 */
export const ExtendedHitArea: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' }
    ],
    disabled: false
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Botões têm 40×40px visualmente mas 48×48px touch area.
        </p>
      </div>
    )
  ]
};

/**
 * Dark mode: Buttons in dark mode
 *
 * Verifies:
 * - Border: COR-089 primary dark (#6BA3FF)
 * - Text: COR-089 primary dark
 * - Hover background: #6BA3FF
 * - Hover text: #0A0A0A
 * - Contrast >= 4.5:1 (ACC-001)
 */
export const DarkMode: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' },
      { id: 'reply-3', text: 'Talvez' }
    ],
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

/**
 * Responsive: Mobile viewport (320px)
 *
 * Verifies:
 * - Buttons wrap at 320px
 * - No horizontal scroll (LAY-001)
 * - Responsive padding (spacing-sm)
 * - Touch targets still >= 44×44px
 */
export const ResponsiveMobile: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' },
      { id: 'reply-3', text: 'Talvez' }
    ],
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
 * - Padding scales
 * - Buttons don't wrap unnecessarily
 */
export const ResponsiveTablet: Story = {
  args: {
    replies: [
      { id: 'reply-1', text: 'Sim' },
      { id: 'reply-2', text: 'Não' },
      { id: 'reply-3', text: 'Talvez' }
    ],
    disabled: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

/**
 * All states: Side-by-side comparison
 *
 * Helpful for QA review and visual regression testing
 */
export const AllStates: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '16px'
    }}>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Normal</p>
        <QuickReplies
          replies={[
            { id: 'r1', text: 'Sim' },
            { id: 'r2', text: 'Não' }
          ]}
          disabled={false}
        />
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Disabled</p>
        <QuickReplies
          replies={[
            { id: 'r1', text: 'Sim' },
            { id: 'r2', text: 'Não' }
          ]}
          disabled={true}
        />
      </div>
    </div>
  )
};
