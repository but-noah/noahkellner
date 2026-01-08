import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ChatAvatar } from './ChatAvatar';
import type { ChatAction } from '../../lib/api';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

const PAGE_LABELS: Record<string, string> = {
  '/': 'Startseite',
  '/about': 'Über mich',
  '/cv': 'Lebenslauf',
  '/projects': 'Projekte',
  '/blog': 'Blog',
  '/contact': 'Kontakt',
  '/chat': 'Chat',
};

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}
    >
      <ChatAvatar type={message.role} />

      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded-2xl',
          'text-[var(--color-text-primary)] text-[15px] leading-relaxed',
          isUser
            ? 'bg-[var(--color-bg-tertiary)]'
            : 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)]'
        )}
      >
        {/* Simple text rendering - preserves line breaks */}
        <div className="whitespace-pre-wrap">{message.content}</div>

        {/* Action links */}
        {message.actions && message.actions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[var(--color-border)]/50 flex flex-wrap gap-2">
            {message.actions.map((action, index) => {
              if (action.action === 'navigate' && action.target) {
                const label = PAGE_LABELS[action.target] || action.target;
                return (
                  <a
                    key={index}
                    href={action.target}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                      'text-sm font-medium',
                      'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
                      'hover:bg-[var(--color-accent)]/20',
                      'transition-colors duration-200'
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    {label}
                  </a>
                );
              }
              if (action.action === 'open_contact') {
                return (
                  <a
                    key={index}
                    href="/contact"
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                      'text-sm font-medium',
                      'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
                      'hover:bg-[var(--color-accent)]/20',
                      'transition-colors duration-200'
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Kontakt
                  </a>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
