import { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { CVDocument } from './pdf/CVDocument';
import { cvData, type CVLanguageCode } from '../../data/cv-data';

// Helper to convert blob to base64
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function CVDownloadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLang, setSelectedLang] = useState<CVLanguageCode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async (language: CVLanguageCode) => {
    setIsGenerating(true);
    setSelectedLang(language);
    setError(null);

    try {
      // Try to load photo
      let photoBase64: string | undefined;
      try {
        const photoResponse = await fetch('/images/kellnernoah_professional_portrait.jpeg');
        if (photoResponse.ok) {
          const photoBlob = await photoResponse.blob();
          photoBase64 = await blobToBase64(photoBlob);
        }
      } catch {
        // Photo is optional, continue without it
        console.log('Photo not found, generating PDF without photo');
      }

      // Generate PDF
      const doc = (
        <CVDocument
          data={cvData[language]}
          language={language}
          photoBase64={photoBase64}
        />
      );
      const blob = await pdf(doc).toBlob();

      // Trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download =
        language === 'en' ? 'Noah_Kellner_CV_EN.pdf' : 'Noah_Kellner_CV_DE.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsOpen(false);
    } catch (err) {
      console.error('PDF generation failed:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
      setSelectedLang(null);
    }
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group px-6 py-3 bg-accent text-bg-primary font-sans font-medium rounded-lg hover:bg-accent-hover transition-all duration-300 hover:scale-105 flex items-center gap-2 w-fit animate-element"
        style={{ '--delay': '3' } as React.CSSProperties}
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Download PDF
      </button>

      {/* Language Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isGenerating && setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-bg-secondary border border-border rounded-2xl p-6 w-full max-w-sm mx-4 animate-fade-in shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => !isGenerating && setIsOpen(false)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors disabled:opacity-50"
              disabled={isGenerating}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">Download CV</h3>
                <p className="text-text-tertiary text-sm">Choose language</p>
              </div>
            </div>

            <p className="text-text-secondary text-sm mb-6">
              Select your preferred language for the CV download.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Language Buttons */}
            <div className="space-y-3">
              <LanguageButton
                language="en"
                label="English"
                flag="🇬🇧"
                isGenerating={isGenerating && selectedLang === 'en'}
                onClick={() => handleDownload('en')}
                disabled={isGenerating}
              />
              <LanguageButton
                language="de"
                label="Deutsch"
                flag="🇩🇪"
                isGenerating={isGenerating && selectedLang === 'de'}
                onClick={() => handleDownload('de')}
                disabled={isGenerating}
              />
            </div>

            {/* Generating Message */}
            {isGenerating && (
              <p className="text-center text-text-tertiary text-xs mt-4">
                Generating PDF, please wait...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

interface LanguageButtonProps {
  language: CVLanguageCode;
  label: string;
  flag: string;
  isGenerating: boolean;
  onClick: () => void;
  disabled: boolean;
}

function LanguageButton({
  label,
  flag,
  isGenerating,
  onClick,
  disabled,
}: LanguageButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/50 bg-bg-tertiary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <span className="text-2xl">{flag}</span>
      <span className="flex-1 text-left font-medium text-text-primary group-hover:text-accent transition-colors">
        {label}
      </span>
      {isGenerating ? (
        <svg
          className="w-5 h-5 text-accent animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
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
      ) : (
        <svg
          className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      )}
    </button>
  );
}
