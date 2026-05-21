/**
 * EasySite Chat Components
 * Modern, accessible chat interface components
 *
 * Design Brief: EASYSITE-3.3
 * QA Gate: CONDITIONAL PASS (2026-05-10)
 */

export { BotMessage } from './BotMessage';
export type { BotMessageProps } from './BotMessage';

export { UserMessage } from './UserMessage';
export type { UserMessageProps } from './UserMessage';

export { MessageContainer } from './MessageContainer';
export type { MessageContainerProps } from './MessageContainer';

export { MessageInput } from './MessageInput';
export type { MessageInputProps } from './MessageInput';

export { SendButton } from './SendButton';
export type { SendButtonProps } from './SendButton';

export { QuickReplies } from './QuickReplies';
export type { QuickReplyOption, QuickRepliesProps } from './QuickReplies';

export { ChatProvider, useDarkMode, useChat } from './ChatProvider';
export type { ChatContextType, ChatStateContextType, ChatMessage } from './ChatProvider';
