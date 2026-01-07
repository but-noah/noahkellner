# Noah Kellner - Personal Brand Website

Modern personal website built with Astro, React, and FastAPI featuring an AI-powered chatbot with voice capabilities.

## Project Structure

```
noah-kellner-website/
├── apps/
│   ├── web/          # Astro frontend
│   └── api/          # FastAPI backend (future)
├── packages/         # Shared packages (future)
└── docs/            # Documentation
```

## Tech Stack

### Frontend
- **Astro 4.x** - Content-first framework with Islands Architecture
- **React 18** - For interactive components
- **Tailwind CSS 3.x** - Utility-first styling
- **Framer Motion** - Animations

### Backend (Future Phase)
- **FastAPI** - Python async API
- **Claude API** - AI conversations
- **ElevenLabs** - Voice cloning/TTS
- **Deepgram** - Speech-to-text

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Development

This is a pnpm workspace monorepo. Each app/package can be developed independently:

```bash
# Run commands in specific workspace
pnpm --filter web dev
pnpm --filter api dev
```

## Deployment

- **Frontend**: Railway
- **Backend**: Railway (future)
- **Domain**: noah-kellner.de (to be configured)

## License

MIT © Noah Kellner
