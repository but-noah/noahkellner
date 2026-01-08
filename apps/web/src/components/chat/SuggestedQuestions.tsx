import { motion } from 'framer-motion';

const suggestions = [
  'Was machst du beruflich?',
  'Erzähl mir von deinen Projekten',
  'Welche Technologien nutzt du?',
  'Wie kann ich dich kontaktieren?',
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex flex-wrap gap-2 px-4 py-3"
    >
      {suggestions.map((question, index) => (
        <motion.button
          key={question}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 * index }}
          onClick={() => onSelect(question)}
          className="px-4 py-2 rounded-full text-sm
            bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
            text-[var(--color-text-secondary)]
            hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
            transition-all duration-200
            active:scale-95"
        >
          {question}
        </motion.button>
      ))}
    </motion.div>
  );
}
