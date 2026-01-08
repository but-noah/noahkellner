import { cn } from '../../lib/utils';

interface ChatAvatarProps {
  type: 'user' | 'assistant';
  className?: string;
}

export function ChatAvatar({ type, className }: ChatAvatarProps) {
  if (type === 'assistant') {
    return (
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full overflow-hidden',
          'ring-2 ring-[var(--color-accent)]/30',
          'shadow-[0_0_20px_rgba(232,220,196,0.2)]',
          className
        )}
      >
        <img
          src="/images/kellnernoah_professional_portrait.jpeg"
          alt="Noah Kellner"
          width={32}
          height={32}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]',
        'font-medium text-sm',
        className
      )}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
  );
}
