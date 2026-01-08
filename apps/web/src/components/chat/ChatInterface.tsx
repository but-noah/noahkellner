import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { sendMessage } from '../../lib/api';
import { ChatMessage, type Message } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { SuggestedQuestions } from './SuggestedQuestions';

const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! Ich bin Noahs AI-Assistent. Frag mich alles über Noah, seine Arbeit oder wie er dir helfen kann.",
  timestamp: new Date(),
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Hide suggestions after first message
    setShowSuggestions(false);

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(trimmedInput, sessionId);

      // Update session ID if provided
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      // Add assistant message with actions
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        actions: response.actions && response.actions.length > 0 ? response.actions : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          'Entschuldigung, da ist etwas schiefgelaufen. Bitte versuche es erneut.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, sessionId]);

  const handleSuggestionSelect = useCallback(
    (question: string) => {
      setInput(question);
      // Trigger send after a short delay to show the question first
      setTimeout(() => {
        setInput('');
        const userMessage: Message = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: question,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setShowSuggestions(false);
        setIsLoading(true);

        sendMessage(question, sessionId)
          .then((response) => {
            if (response.session_id) {
              setSessionId(response.session_id);
            }
            const assistantMessage: Message = {
              id: `assistant-${Date.now()}`,
              role: 'assistant',
              content: response.response,
              timestamp: new Date(),
              actions: response.actions && response.actions.length > 0 ? response.actions : undefined,
            };
            setMessages((prev) => [...prev, assistantMessage]);
          })
          .catch((error) => {
            console.error('Chat error:', error);
            const errorMessage: Message = {
              id: `error-${Date.now()}`,
              role: 'assistant',
              content:
                'Entschuldigung, da ist etwas schiefgelaufen. Bitte versuche es erneut.',
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 100);
    },
    [sessionId]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-4 border-b border-[var(--color-border)]">
        <a
          href="/"
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-sm">Back</span>
        </a>

        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Noah Kellner AI
          </h1>
        </div>

        {/* Placeholder for settings button */}
        <div className="w-16" />
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && <TypingIndicator key="typing" />}
          </AnimatePresence>

          {/* Suggested questions - only show after welcome message */}
          <AnimatePresence>
            {showSuggestions && messages.length === 1 && (
              <SuggestedQuestions onSelect={handleSuggestionSelect} />
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="max-w-2xl mx-auto w-full">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
