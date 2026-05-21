import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatProvider } from './ChatProvider';
import { BotMessage } from './BotMessage';
import { UserMessage } from './UserMessage';
import { MessageContainer } from './MessageContainer';
import { MessageInput } from './MessageInput';
import { SendButton } from './SendButton';
import { QuickReplies } from './QuickReplies';

/**
 * ChatProvider Story - Integrated Chat Component Demo
 *
 * Shows:
 * - Full chat interface with all components
 * - Provider context managing chat state
 * - Complete conversation flow
 * - All component states in action
 *
 * Verifies:
 * - Context provider works correctly
 * - All components render together
 * - Layout and spacing correct
 * - Responsive on all viewports
 * - Accessibility across all components
 */

const meta = {
  title: 'Chat/ChatProvider',
  component: ChatProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete integrated chat interface demo with all components working together.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ChatProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default integrated demo: Full chat interface
 *
 * Verifies:
 * - ChatProvider context initialization
 * - Message container displays messages
 * - Input and send button functional
 * - Quick replies display
 * - All styling correct
 * - Responsive on all viewports
 * - Dark mode toggle (if implemented)
 * - Accessibility checklist passes
 */
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        height: '600px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#FFFFFF'
      }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Responsive mobile: 320px viewport
 *
 * Verifies:
 * - No horizontal scroll at 320px (LAY-001)
 * - Responsive padding adjustments
 * - Touch targets accessible (44×44px)
 * - Quick replies wrap correctly
 * - Message bubbles responsive
 * - Input responsive
 * - Send button positioned correctly
 */
export const ResponsiveMobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  decorators: [
    (Story) => (
      <div style={{
        width: '320px',
        height: '600px',
        border: '1px solid #ccc',
        borderRadius: '0',
        overflow: 'hidden',
        background: '#FFFFFF'
      }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Responsive tablet: 768px viewport
 *
 * Verifies:
 * - Responsive adjustments work
 * - Padding scales appropriately
 * - Layout optimized for tablet
 */
export const ResponsiveTablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        maxWidth: '768px',
        height: '600px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#FFFFFF',
        margin: '0 auto'
      }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Dark mode: Integrated demo in dark mode
 *
 * Verifies:
 * - Background: #0A0A0A
 * - Text: #F5F5F5
 * - Bot messages: #1A1A1A background
 * - User messages: #6BA3FF background
 * - Input: dark theme
 * - Send button: dark primary #6BA3FF
 * - Quick replies: dark theme
 * - Contrast >= 4.5:1 across all components (ACC-001)
 * - Focus outlines visible (ACC-005)
 */
export const DarkMode: Story = {
  args: {},
  parameters: {
    colorScheme: 'dark'
  },
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        height: '600px',
        border: '1px solid #2D2D2D',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#0A0A0A'
      }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Large desktop: Full width desktop view
 *
 * Verifies:
 * - Responsive max-width (600px centered on large screens)
 * - Desktop spacing and layout
 * - Message width constraints work
 */
export const LargeDesktop: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        minHeight: '600px',
        padding: '24px',
        background: '#F5F5F5',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '600px',
          height: '600px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#FFFFFF'
        }}>
          <Story />
        </div>
      </div>
    )
  ]
};

/**
 * Accessibility audit: Screen reader & keyboard only
 *
 * Checklist for manual testing:
 * - [ ] All buttons keyboard accessible (Tab)
 * - [ ] Focus order logical (left-to-right, top-to-bottom)
 * - [ ] aria-live regions announce new messages
 * - [ ] sr-only labels read correctly (screen reader)
 * - [ ] Focus outlines visible on all interactive elements (ACC-005)
 * - [ ] Touch targets >= 44×44px (ACC-002)
 * - [ ] Contrast >= 4.5:1 light + dark (ACC-001)
 * - [ ] Color + additional indicator (ACC-004):
 *   - Error: red + X icon + text
 *   - Success: green + checkmark + text
 *   - Status: color + text label
 * - [ ] Keyboard shortcuts work:
 *   - Enter: send message
 *   - Shift+Enter: new line in input
 *   - Tab: navigate to next button
 * - [ ] No color-only messaging
 */
export const AccessibilityAudit: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <div style={{
          width: '100%',
          height: '600px',
          border: '2px solid #3B82F6',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#FFFFFF',
          marginBottom: '24px'
        }}>
          <Story />
        </div>
        <div style={{
          padding: '16px',
          background: '#F0F9FF',
          border: '1px solid #3B82F6',
          borderRadius: '8px',
          fontSize: '12px'
        }}>
          <h3 style={{ marginTop: 0 }}>Accessibility Testing Checklist</h3>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Tab through all interactive elements (buttons, input)</li>
            <li>Verify focus outline visible on all elements (ACC-005)</li>
            <li>Test Enter to send, Shift+Enter for newline</li>
            <li>Enable VoiceOver/NVDA and verify announcements</li>
            <li>Check contrast with WebAIM ({'>'}= 4.5:1) (ACC-001)</li>
            <li>Verify touch targets are 44×44px+ (ACC-002)</li>
            <li>Confirm error/success not color-only (ACC-004)</li>
            <li>Test on mobile 320px for no h-scroll (LAY-001)</li>
            <li>Verify dark mode colors correct (light 5.2:1, dark 4.9:1)</li>
            <li>Lighthouse accessibility score {'>'}= 90</li>
          </ul>
        </div>
      </div>
    )
  ]
};

/**
 * Lighthouse performance: Optimization audit
 *
 * Verifies:
 * - No layout shifts
 * - Smooth animations (150-300ms)
 * - No janky scrolling
 * - Images optimized (if any)
 * - CSS efficient
 * - No blocking scripts
 * - Lighthouse score >= 90 (performance + accessibility)
 */
export const LighthousePerformance: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <div style={{
          width: '100%',
          height: '600px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#FFFFFF',
          marginBottom: '24px'
        }}>
          <Story />
        </div>
        <div style={{
          padding: '16px',
          background: '#FFFBEB',
          border: '1px solid #F59E0B',
          borderRadius: '8px',
          fontSize: '12px'
        }}>
          <h3 style={{ marginTop: 0 }}>Performance Checklist</h3>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Run Chrome Lighthouse (F12 → Lighthouse)</li>
            <li>Target: Performance {'>'}= 90, Accessibility {'>'}= 90</li>
            <li>No CLS (Cumulative Layout Shift)</li>
            <li>Smooth animations (no janky transitions)</li>
            <li>Scrolling smooth (scroll-behavior: smooth)</li>
            <li>No render-blocking resources</li>
            <li>CSS variables efficient</li>
          </ul>
        </div>
      </div>
    )
  ]
};

/**
 * Design spec validation: Visual QA
 *
 * Verifies against design-brief.md:
 * - [ ] Colors match COR-089 tokens
 * - [ ] Typography matches TYP-012 tokens
 * - [ ] Spacing matches 8px grid (LAY-002)
 * - [ ] Border radius: 8px (sm), 12px (md), 16px (lg)
 * - [ ] Shadows match design
 * - [ ] Animations: 150-300ms (ANI-001)
 * - [ ] Dark mode colors correct
 * - [ ] Responsive breakpoints: 320px, 768px, 1280px
 * - [ ] No horizontal scroll at 320px (LAY-001)
 * - [ ] Focus outlines 2px #3B82F6 (ACC-005)
 */
export const DesignSpecValidation: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <div style={{
          width: '100%',
          height: '600px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#FFFFFF',
          marginBottom: '24px'
        }}>
          <Story />
        </div>
        <div style={{
          padding: '16px',
          background: '#F0FDF4',
          border: '1px solid #22C55E',
          borderRadius: '8px',
          fontSize: '12px'
        }}>
          <h3 style={{ marginTop: 0 }}>Design Spec Validation</h3>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li><strong>Colors (COR-089):</strong> Primary #2E5C8A, Secondary #F8F9FA, User #2E5C8A</li>
            <li><strong>Typography (TYP-012):</strong> Body 16px, Small 14px, Line-height 1.5</li>
            <li><strong>Spacing:</strong> 8px grid (8, 16, 24, 32, etc.)</li>
            <li><strong>Border radius:</strong> sm{'{'}8px{'}'}, md{'{'}12px{'}'}, lg{'{'}16px{'}'}</li>
            <li><strong>Shadows:</strong> sm, md, lg as defined</li>
            <li><strong>Animations:</strong> 150-300ms ease transitions</li>
            <li><strong>Dark mode:</strong> BG #0A0A0A, Text #F5F5F5, Primary #6BA3FF</li>
            <li><strong>Responsive:</strong> 320px, 768px, 1280px breakpoints</li>
            <li><strong>No h-scroll:</strong> Mobile 320px constraint</li>
            <li><strong>Focus:</strong> 2px outline #3B82F6</li>
          </ul>
        </div>
      </div>
    )
  ]
};
