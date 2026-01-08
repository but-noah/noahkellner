import { useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react';
import { cn } from '../../lib/utils';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Schreib eine Nachricht...',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      {/* Voice button placeholder - for future implementation */}
      <button
        type="button"
        disabled
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          text-[var(--color-text-tertiary)]
          opacity-50 cursor-not-allowed"
        title="Voice mode coming soon"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>

      {/* Input area */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          className={cn(
            'w-full px-4 py-3 rounded-2xl resize-none',
            'bg-[var(--color-bg-secondary)] border border-[var(--color-border)]',
            'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
            'focus:outline-none focus:border-[var(--color-accent)]',
            'focus:shadow-[0_0_0_2px_rgba(232,220,196,0.1)]',
            'transition-all duration-200',
            'text-[15px] leading-relaxed',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      </div>

      {/* Send button */}
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
          'bg-[var(--color-accent)] text-[var(--color-bg-primary)]',
          'hover:bg-[var(--color-accent-hover)]',
          'active:scale-95',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-accent)]',
          value.trim() && !disabled && 'shadow-[0_0_20px_rgba(232,220,196,0.3)]'
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  );
}
