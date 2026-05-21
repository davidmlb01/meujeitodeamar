/**
 * QuickReplies Component
 * Horizontal scrollable list of predefined reply options
 *
 * Accessibility: 40×40px visual size with 48×48px extended hit area (ACC-002)
 * Design: Outline style, COR-089 border, hover fills background
 * Mobile: Horizontal scroll, no overflow on 320px with proper hit area
 */

import React from 'react';

export interface QuickReplyOption {
  id: string;
  label: string;
  value?: string;
}

export interface QuickRepliesProps {
  options: QuickReplyOption[];
  onSelect: (option: QuickReplyOption) => void;
  disabled?: boolean;
  maxVisible?: number;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({
  options,
  onSelect,
  disabled = false,
  maxVisible,
}) => {
  if (!options || options.length === 0) {
    return null;
  }

  const visibleOptions = maxVisible ? options.slice(0, maxVisible) : options;

  return (
    <div
      className="quick-replies-container"
      role="group"
      aria-label="Respostas rápidas"
    >
      {visibleOptions.map((option) => (
        <button
          key={option.id}
          className="quick-reply-button"
          onClick={() => onSelect(option)}
          disabled={disabled}
          aria-label={option.label}
          title={option.label}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
