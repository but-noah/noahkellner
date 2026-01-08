# Noah Kellner - Personal Brand Website

Modern personal website built with Astro, React, and Tailwind CSS. Features a bilingual PDF CV export, interactive contact flow, and professional portfolio showcase.

## Current Status

### Completed Features
- **Homepage** - Hero section, about preview, CV preview with animations, featured projects, CTA
- **About Page** - Profile image, story section, skills grid, experience timeline, values
- **CV Page** - Interactive timeline, animated skill bars, scroll progress indicator
- **PDF CV Export** - Bilingual (EN/DE) PDF generation with @react-pdf/renderer, professional light theme, photo included
- **Projects Page** - Project cards with tags, technologies, status badges
- **Project Detail Pages** - Full project descriptions with metadata
- **Contact Page** - Multi-step ContactFlow component with intent selection
- **Blog** - Blog index with tag filtering, detail pages with reading time, related posts, share buttons, newsletter signup (conversion-optimized)
- **Design System** - Dark theme with warm sand/beige accent (#E8DCC4), Satoshi + Inter fonts

### Tech Stack

#### Frontend
- **Astro 5.x** - Content-first framework with Islands Architecture
- **React 18** - For interactive components (ContactFlow, CVDownloadButton)
- **Tailwind CSS 4.x** - Utility-first styling with custom design tokens
- **@react-pdf/renderer** - Client-side PDF generation

## Project Structure

```
noahkellner/
├── apps/
│   ├── web/                    # Astro frontend
│   │   ├── src/
│   │   │   ├── components/     # UI components
│   │   │   │   ├── blog/       # Blog cards, tags, newsletter signup
│   │   │   │   ├── contact/    # ContactFlow React island
│   │   │   │   ├── cv/         # CV components + PDF export
│   │   │   │   └── projects/   # Project cards
│   │   │   ├── content/        # Content collections
│   │   │   │   ├── blog/       # Blog posts (markdown)
│   │   │   │   └── projects/   # Project markdown files
│   │   │   ├── data/           # CV data (bilingual)
│   │   │   ├── layouts/        # Page layouts
│   │   │   ├── pages/          # Route pages
│   │   │   └── styles/         # Global CSS
│   │   └── public/             # Static assets
│   └── api/                    # FastAPI backend (planned)
├── packages/                   # Shared packages (future)
└── docs/                       # Documentation & PRD
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm --filter web astro check

# Preview production build
pnpm preview
```

## Development

This is a pnpm workspace monorepo. Run commands in specific workspaces:

```bash
pnpm --filter web dev      # Run web dev server
pnpm --filter web build    # Build web app
```

## Next Steps

### 1. AI Chat Feature (Phase 2)
- FastAPI backend service for AI conversations
- Claude API integration for conversational AI
- Chat UI component as React island
- Chat history persistence

### 2. Voice Capabilities
- ElevenLabs integration for Text-to-Speech (voice cloning)
- Deepgram integration for Speech-to-Text
- Real-time voice conversation mode

### 3. Deployment & Go-Live
- Railway deployment configuration
- Domain setup (noah-kellner.de)
- Analytics integration (Plausible/Umami)

## Deployment

- **Frontend**: Railway (planned)
- **Backend**: Railway (planned)
- **Domain**: noah-kellner.de (to be configured)

## License

MIT © Noah Kellner
