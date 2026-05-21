# EasySite Chat Components

Modern, accessible chat interface components following WCAG AA standards and SaaS design patterns.

**Design Brief:** EASYSITE-3.3
**Designer:** @ux-design-expert (UMA)
**QA Gate Status:** CONDITIONAL PASS (2026-05-10)

## Components

### BotMessage
Displays messages from the bot with loading and error states.

```tsx
import { BotMessage } from '@easysite/ui';

<BotMessage
  content="Olá! Como posso ajudar?"
  isLoading={false}
  hasError={false}
  timestamp={new Date()}
  id="bot-msg-1"
/>
```

**Props:**
- `content?: string` - Message text content
- `isLoading?: boolean` - Shows typing indicator
- `hasError?: boolean` - Shows error state
- `timestamp?: Date` - Message timestamp (displays in HH:MM format)
- `id?: string` - Unique identifier

**Accessibility:**
- `aria-live="polite"` for screen readers
- Typing indicator with aria-label

---

### UserMessage
Displays messages from the user with delivery status (sending, sent, failed).

```tsx
import { UserMessage } from '@easysite/ui';

<UserMessage
  content="Qual o melhor plano?"
  status="sent"
  timestamp={new Date()}
  onRetry={() => console.log('retry')}
/>
```

**Props:**
- `content: string` - Message text (required)
- `status?: 'sending' | 'sent' | 'failed'` - Delivery status
- `timestamp?: Date` - Message timestamp
- `onRetry?: () => void` - Callback when retry button clicked
- `id?: string` - Unique identifier

**Accessibility:**
- aria-label for status (Enviando, Entregue, Erro ao enviar)
- Retry button with aria-label

---

### MessageContainer
Container for all chat messages with auto-scroll to bottom.

```tsx
import { MessageContainer } from '@easysite/ui';

<MessageContainer
  messages={messages}
  isLoading={false}
  onScroll={(isAtBottom) => console.log(isAtBottom)}
/>
```

**Props:**
- `messages: Message[]` - Array of message objects
- `isLoading?: boolean` - Shows loading state with typing indicator
- `children?: ReactNode` - Custom content
- `onScroll?: (isAtBottom: boolean) => void` - Fires when user scrolls

**Features:**
- Auto-scrolls to bottom on new messages
- Smooth scroll behavior
- Empty state message
- Responsive: 320px (full-width) → 768px (90%) → 1280px (600px max)
- No horizontal scroll on mobile (LAY-001)

---

### MessageInput
Text input field with Enter-to-send keyboard support.

```tsx
import { MessageInput } from '@easysite/ui';

<MessageInput
  onSend={(msg) => console.log(msg)}
  placeholder="Digite sua mensagem..."
  disabled={false}
  maxLength={1000}
  autoFocus={true}
/>
```

**Props:**
- `onSend: (message: string) => void` - Callback on send (required)
- `placeholder?: string` - Input placeholder text
- `disabled?: boolean` - Disable input
- `maxLength?: number` - Max characters (default: 1000)
- `id?: string` - Element ID
- `autoFocus?: boolean` - Auto-focus on mount

**Features:**
- 44px height (ACC-002 touch target)
- Enter to send, Shift+Enter for newline
- Auto-expanding textarea
- Dark mode support

**Accessibility:**
- aria-label and aria-describedby
- Screen reader instructions for keyboard shortcuts

---

### SendButton
Primary button to send chat messages.

```tsx
import { SendButton } from '@easysite/ui';

<SendButton
  onClick={() => handleSend()}
  isLoading={false}
  isDisabled={false}
  ariaLabel="Enviar mensagem"
/>
```

**Props:**
- `onClick: () => void` - Send callback (required)
- `isLoading?: boolean` - Shows loading spinner
- `isDisabled?: boolean` - Disables button
- `ariaLabel?: string` - Accessibility label
- `id?: string` - Element ID

**Features:**
- 44×44px touch target (ACC-002)
- Paper plane icon
- Loading spinner animation
- Hover/active states
- COR-089 primary color

---

### QuickReplies
Horizontal scrollable list of predefined reply buttons.

```tsx
import { QuickReplies } from '@easysite/ui';

<QuickReplies
  options={[
    { id: '1', label: 'Qual o preço?' },
    { id: '2', label: 'Como funciona?' },
  ]}
  onSelect={(option) => handleReply(option.value)}
  disabled={false}
/>
```

**Props:**
- `options: QuickReplyOption[]` - Array of reply options
- `onSelect: (option) => void` - Callback on selection (required)
- `disabled?: boolean` - Disable all buttons
- `maxVisible?: number` - Limit visible options

**Features:**
- 40×40px visual size with 48×48px extended hit area (ACC-002)
- Outline style, COR-089 border
- Hover fills background
- Horizontal scroll on mobile
- Dark mode support

---

### ChatProvider & Hooks
Context provider for dark mode and chat state management.

```tsx
import { ChatProvider, useDarkMode, useChat } from '@easysite/ui';

function App() {
  return (
    <ChatProvider initialDarkMode={false}>
      <ChatInterface />
    </ChatProvider>
  );
}

function ChatInterface() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { messages, addMessage, setIsLoading } = useChat();

  return (
    // Your chat UI...
  );
}
```

**useDarkMode() returns:**
- `isDarkMode: boolean` - Current theme
- `toggleDarkMode: () => void` - Toggle light/dark
- `setDarkMode: (dark: boolean) => void` - Set specific mode

**useChat() returns:**
- `messages: ChatMessage[]` - All messages
- `isLoading: boolean` - Loading state
- `addMessage: (msg) => void` - Add new message
- `updateMessage: (id, updates) => void` - Update existing message
- `removeMessage: (id) => void` - Delete message
- `clearMessages: () => void` - Clear all
- `setIsLoading: (bool) => void` - Set loading state

**Features:**
- Dark mode respects system preference
- localStorage persistence (chat-dark-mode)
- Automatic message ID generation with timestamp
- Full TypeScript support

---

## Styling & Design Tokens

All components use CSS variables defined in `chat.scss`:

### Colors (COR-089)
- `--cor-089-primary: #2E5C8A` (light)
- `--cor-089-primary-dark: #6BA3FF` (dark)
- `--cor-089-secondary-light: #F8F9FA` (bot bg light)
- `--cor-089-secondary-dark: #1A1A1A` (bot bg dark)
- `--cor-089-success: #22C55E`
- `--cor-089-error: #EF4444`

### Typography (TYP-012)
- Display: 32px Poppins Bold
- Body: 16px Inter Regular (1.5 line-height)
- Small: 14px Inter Regular

### Spacing (8px grid)
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 40px, 3xl: 48px

---

## Accessibility Compliance

**WCAG AA Standards:**
- ✓ ACC-001: Contrast >= 4.5:1
- ✓ ACC-002: Touch targets >= 44×44px
- ✓ ACC-003: Full keyboard navigation
- ✓ ACC-004: Color not only indicator
- ✓ ACC-005: Visible focus states
- ✓ TYP-001: Body text >= 16px
- ✓ TYP-002: Line-height >= 1.5
- ✓ LAY-001: No h-scroll on mobile

---

## Dark Mode Support

All components fully support light/dark mode via CSS variables and system preference detection.

Toggle dark mode programmatically:
```tsx
const { toggleDarkMode } = useDarkMode();
toggleDarkMode();
```

Respects `prefers-color-scheme` media query on initial load.

---

## Responsive Design

Components are fully responsive:
- **Mobile (320px):** Full-width, single column
- **Tablet (768px):** 90% width
- **Desktop (1280px):** 600px max-width

**No horizontal scroll on any device** (LAY-001 compliant).

---

## TypeScript Support

All components are fully typed with exported interfaces:

```tsx
import type { BotMessageProps, UserMessageProps } from '@easysite/ui';
```

---

## Performance

- Minimal re-renders using React hooks
- CSS animations optimized (60fps)
- Smooth scroll behavior
- Lazy-loaded fonts (Poppins, Inter)

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

---

Created: 2026-05-10
Last Updated: 2026-05-10
Status: Implementation Complete
