import { motion } from 'framer-motion';
import { ChatAvatar } from './ChatAvatar';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3"
    >
      <ChatAvatar type="assistant" />
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)]"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
