import { useState, useEffect } from 'react';

// Types
type Intent = 'job' | 'project' | 'investment' | 'collaboration' | 'hello';

interface FormData {
  intent: Intent | null;
  name: string;
  email: string;
  company: string;
  message: string;
  // Job-specific
  position: string;
  // Project-specific
  projectType: string;
  budget: string;
  timeline: string;
  // Investment-specific
  investmentType: string;
}

const initialFormData: FormData = {
  intent: null,
  name: '',
  email: '',
  company: '',
  message: '',
  position: '',
  projectType: '',
  budget: '',
  timeline: '',
  investmentType: '',
};

// Intent options with icons and descriptions
const intentOptions: { id: Intent; icon: string; title: string; subtitle: string }[] = [
  {
    id: 'job',
    icon: '💼',
    title: 'Job Opportunity',
    subtitle: 'Recruiting or career opportunity',
  },
  {
    id: 'project',
    icon: '🚀',
    title: 'Project Inquiry',
    subtitle: 'Work together on something',
  },
  {
    id: 'investment',
    icon: '💡',
    title: 'Investment',
    subtitle: 'Partnership or investment',
  },
  {
    id: 'collaboration',
    icon: '🤝',
    title: 'Collaboration',
    subtitle: 'Networking or knowledge share',
  },
  {
    id: 'hello',
    icon: '💬',
    title: 'Just Hello',
    subtitle: 'Say hi or ask a question',
  },
];

export default function ContactFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total steps based on intent
  const getTotalSteps = () => {
    if (!formData.intent) return 3;
    switch (formData.intent) {
      case 'job':
        return 4;
      case 'project':
        return 5;
      case 'investment':
        return 4;
      default:
        return 3;
    }
  };

  const totalSteps = getTotalSteps();
  const progress = ((step + 1) / totalSteps) * 100;

  // Handle form data updates
  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  // Handle intent selection
  const selectIntent = (intent: Intent) => {
    setFormData((prev) => ({ ...prev, intent }));
    setTimeout(() => setStep(1), 300);
  };

  // Validate current step
  const validateStep = (): boolean => {
    switch (step) {
      case 0:
        return formData.intent !== null;
      case 1:
        if (!formData.name.trim()) {
          setError('Please enter your name');
          return false;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
          setError('Please enter a valid email');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  // Navigation
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    setError(null);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log form data (replace with actual submission)
      console.log('Form submitted:', formData);

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setStep(0);
    setIsSubmitted(false);
    setError(null);
  };

  // Render step content
  const renderStepContent = () => {
    // Success state
    if (isSubmitted) {
      return (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-display font-bold mb-3">Message Sent</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Thank you for reaching out, {formData.name.split(' ')[0]}. I'll get back to you
            within 24-48 hours.
          </p>
          <button
            onClick={resetForm}
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Send another message
          </button>
        </div>
      );
    }

    // Step 0: Intent Selection
    if (step === 0) {
      return (
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            What brings you here?
          </h2>
          <p className="text-text-secondary mb-8">
            Choose the option that best describes your inquiry.
          </p>

          <div className="grid gap-3">
            {intentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => selectIntent(option.id)}
                className={`group w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  formData.intent === option.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50 bg-bg-secondary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary group-hover:text-accent transition-colors">
                      {option.title}
                    </div>
                    <div className="text-sm text-text-tertiary">{option.subtitle}</div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-all duration-300 ${
                      formData.intent === option.id
                        ? 'text-accent translate-x-0 opacity-100'
                        : 'text-text-tertiary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Step 1: Basic Info
    if (step === 1) {
      return (
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            Let's get acquainted
          </h2>
          <p className="text-text-secondary mb-8">Tell me a bit about yourself.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Jane Smith"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="jane@company.com"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Company / Organization{' '}
                <span className="text-text-tertiary">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="Acme Inc."
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary"
              />
            </div>
          </div>
        </div>
      );
    }

    // Conditional steps based on intent
    if (step === 2) {
      // Job-specific
      if (formData.intent === 'job') {
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              About the opportunity
            </h2>
            <p className="text-text-secondary mb-8">What role are you considering?</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Position / Role
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => updateField('position', e.target.value)}
                  placeholder="e.g., CTO, Head of Engineering"
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Tell me more about the opportunity
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="What makes this role exciting? What's the company culture like?"
                  rows={4}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary resize-none"
                />
              </div>
            </div>
          </div>
        );
      }

      // Project-specific
      if (formData.intent === 'project') {
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Project Details
            </h2>
            <p className="text-text-secondary mb-8">Tell me about your project.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => updateField('projectType', e.target.value)}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                >
                  <option value="">Select a type...</option>
                  <option value="consulting">Consulting / Advisory</option>
                  <option value="development">Development / Implementation</option>
                  <option value="ai">AI / Automation Project</option>
                  <option value="infrastructure">Infrastructure / DevOps</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Budget Range <span className="text-text-tertiary">(optional)</span>
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                >
                  <option value="">Prefer not to say</option>
                  <option value="<10k">&lt; €10,000</option>
                  <option value="10k-25k">€10,000 - €25,000</option>
                  <option value="25k-50k">€25,000 - €50,000</option>
                  <option value="50k+">€50,000+</option>
                </select>
              </div>
            </div>
          </div>
        );
      }

      // Investment-specific
      if (formData.intent === 'investment') {
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Investment Interest
            </h2>
            <p className="text-text-secondary mb-8">What kind of partnership interests you?</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Type</label>
                <select
                  value={formData.investmentType}
                  onChange={(e) => updateField('investmentType', e.target.value)}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                >
                  <option value="">Select...</option>
                  <option value="angel">Angel Investment</option>
                  <option value="venture">Venture Capital</option>
                  <option value="strategic">Strategic Partnership</option>
                  <option value="advisory">Advisory Role</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Tell me about your vision
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="What's the opportunity? What stage is the company at?"
                  rows={4}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary resize-none"
                />
              </div>
            </div>
          </div>
        );
      }

      // Default: Message (collaboration, hello)
      return (
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Your Message</h2>
          <p className="text-text-secondary mb-8">What would you like to discuss?</p>

          <div>
            <textarea
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder="Write your message here..."
              rows={6}
              className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary resize-none"
              autoFocus
            />
          </div>
        </div>
      );
    }

    // Step 3+ for project: Timeline and Message
    if (step === 3 && formData.intent === 'project') {
      return (
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Timeline & Details</h2>
          <p className="text-text-secondary mb-8">When do you need this done?</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => updateField('timeline', e.target.value)}
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
              >
                <option value="">Select timeline...</option>
                <option value="asap">ASAP</option>
                <option value="1-2months">1-2 months</option>
                <option value="3-6months">3-6 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Project Description
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Describe your project, goals, and any specific requirements..."
                rows={5}
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary placeholder:text-text-tertiary resize-none"
              />
            </div>
          </div>
        </div>
      );
    }

    // Final step: Review (for job and investment)
    if (step === 3 && (formData.intent === 'job' || formData.intent === 'investment')) {
      return renderReview();
    }

    // Final step: Review (for project)
    if (step === 4 && formData.intent === 'project') {
      return renderReview();
    }

    // Final step for simple intents
    return renderReview();
  };

  // Render review step
  const renderReview = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Ready to send?</h2>
      <p className="text-text-secondary mb-8">Review your information before submitting.</p>

      <div className="space-y-4 p-6 bg-bg-secondary/50 rounded-xl border border-border">
        <div className="flex justify-between">
          <span className="text-text-tertiary">Type</span>
          <span className="text-text-primary capitalize">
            {intentOptions.find((o) => o.id === formData.intent)?.title}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-tertiary">Name</span>
          <span className="text-text-primary">{formData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-tertiary">Email</span>
          <span className="text-text-primary">{formData.email}</span>
        </div>
        {formData.company && (
          <div className="flex justify-between">
            <span className="text-text-tertiary">Company</span>
            <span className="text-text-primary">{formData.company}</span>
          </div>
        )}
        {formData.message && (
          <div className="pt-4 border-t border-border">
            <span className="text-text-tertiary text-sm">Message</span>
            <p className="text-text-primary mt-1 text-sm">{formData.message}</p>
          </div>
        )}
      </div>
    </div>
  );

  // Check if we're on the last step
  const isLastStep = step === totalSteps - 1;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress Bar */}
      {!isSubmitted && step > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-text-tertiary mb-2">
            <span>Step {step + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      {renderStepContent()}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Navigation */}
      {!isSubmitted && step > 0 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="px-6 py-3 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent-hover transition-all duration-300 flex items-center gap-2"
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
