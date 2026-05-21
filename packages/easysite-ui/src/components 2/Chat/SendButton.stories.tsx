import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SendButton, SendButtonProps } from './SendButton';

/**
 * SendButton Component Stories
 *
 * Tests states:
 * - Default (ready to send)
 * - Hover (color change)
 * - Focus (focus outline)
 * - Active (press animation)
 * - Disabled (grayed out)
 * - Loading (spinner animation)
 *
 * Accessibility: 44×44px touch target (ACC-002), focus visible, aria-label
 * Design: COR-089 primary blue, white icon, smooth transitions
 */

const meta = {
  title: 'Chat/SendButton',
  component: SendButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Send button for submitting messages. 44×44px touch target with loading state.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      control: false,
      description: 'Callback when button is clicked'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button when true'
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner when true'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label'
    }
  }
} satisfies Meta<typeof SendButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state: Ready to send
 *
 * Verifies:
 * - Background color: COR-089 primary (#2E5C8A light)
 * - 44×44px size (ACC-002 touch target)
 * - White icon visible
 * - No outline initially
 * - Cursor: pointer
 */
export const Default: Story = {
  args: {
    disabled: false,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  }
};

/**
 * Hover state: Mouse over button
 *
 * Verifies:
 * - Background darkens to #1F4A6F (light mode)
 * - Cursor changes to pointer
 * - Smooth transition (150ms)
 * - Icon remains visible
 */
export const Hover: Story = {
  args: {
    disabled: false,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Hover state é interativo. Passe o mouse sobre o botão.
        </p>
      </div>
    )
  ]
};

/**
 * Focus state: Keyboard focus
 *
 * Verifies:
 * - 2px focus outline visible
 * - Outline color: #3B82F6 (var(--focus-outline-color))
 * - Outline has proper spacing
 * - Accessible by Tab key
 */
export const Focus: Story = {
  args: {
    disabled: false,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Focus state é interativo. Pressione Tab para focar.
        </p>
      </div>
    )
  ]
};

/**
 * Active state: Button pressed
 *
 * Verifies:
 * - Scale transform: 0.95 (slight compression)
 * - Visual feedback on click
 * - Quick response (no lag)
 */
export const Active: Story = {
  args: {
    disabled: false,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          Observação: Active state é visual. Pressione e segure o mouse.
        </p>
      </div>
    )
  ]
};

/**
 * Disabled state: Button is disabled
 *
 * Verifies:
 * - Opacity: 0.6
 * - Cursor: not-allowed
 * - Not clickable
 * - No hover effect
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  }
};

/**
 * Loading state: Message being sent
 *
 * Verifies:
 * - Spinner animation visible
 * - Button disabled during loading
 * - Smooth animation (150-300ms)
 * - Icon replaced with spinner
 */
export const Loading: Story = {
  args: {
    disabled: false,
    isLoading: true,
    'aria-label': 'Enviando mensagem'
  }
};

/**
 * Loading + Disabled: Both states together
 *
 * Verifies:
 * - Consistent behavior
 * - Opacity and spinner work together
 */
export const LoadingDisabled: Story = {
  args: {
    disabled: true,
    isLoading: true,
    'aria-label': 'Enviando mensagem'
  }
};

/**
 * Dark mode: Button in dark mode
 *
 * Verifies:
 * - Background: COR-089 primary dark (#6BA3FF)
 * - Hover: #5590f0
 * - White icon visible
 * - Contrast >= 4.5:1 (ACC-001)
 * - Focus outline visible on dark
 */
export const DarkMode: Story = {
  args: {
    disabled: false,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  },
  parameters: {
    colorScheme: 'dark'
  },
  decorators: [
    (Story) => (
      <div style={{
        background: '#0A0A0A',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Responsive: Mobile touch target
 *
 * Verifies:
 * - 44×44px on mobile (ACC-002)
 * - Easy to tap on mobile
 * - Icon well-centered
 */
export const ResponsiveMobile: Story = {
  args: {
    disabled: false,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Responsive: Tablet
 *
 * Verifies:
 * - Size consistent across viewports
 * - Touch target still appropriate
 */
export const ResponsiveTablet: Story = {
  args: {
    disabled: false,
    isLoading: false,
    'aria-label': 'Enviar mensagem'
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

/**
 * All states comparison: Side-by-side view
 *
 * Helpful for visual regression testing and QA review
 */
export const AllStates: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '16px',
      padding: '16px'
    }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px' }}>Default</p>
        <SendButton disabled={false} isLoading={false} aria-label="Send" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px' }}>Disabled</p>
        <SendButton disabled={true} isLoading={false} aria-label="Send" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '8px' }}>Loading</p>
        <SendButton disabled={false} isLoading={true} aria-label="Sending" />
      </div>
    </div>
  )
};
