# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev                              # Start Astro dev server (localhost:4321)
pnpm build                            # Production build
pnpm preview                          # Preview production build

# Type checking
pnpm --filter web astro check         # Run Astro type checker (no test suite exists)

# Workspace-specific
pnpm --filter web <command>           # Run command in web workspace
```

## Architecture

**pnpm monorepo** with workspaces in `apps/` and `packages/`. Primary app is `apps/web/`.

### Tech Stack
- **Astro 5.x** with React 19 islands (`client:load`, `client:only="react"`)
- **Tailwind CSS 4.x** via Vite plugin (not PostCSS)
- **@react-pdf/renderer** for client-side PDF generation

### Content Collections
Defined in `apps/web/src/content.config.ts` using Astro's glob loader:
- `projects/` - Portfolio projects with status, technologies, tags
- `blog/` - Blog posts with tags, draft support

### Design System
CSS variables defined in `apps/web/src/styles/global.css`:
- Dark theme with warm sand accent (`#E8DCC4`)
- Fonts: Satoshi (display/sans), Newsreader (body)
- Fluid typography using clamp()
- Component classes: `.container`, `.section`, `.card`

### Key Patterns

**React Islands**: Interactive components use React hydration directives
- `CVDownloadButton.tsx` - PDF export with `client:only="react"` (uses browser APIs)
- `ContactFlow.tsx` - Multi-step form with `client:load`

**Bilingual CV Data**: `apps/web/src/data/cv-data.ts` exports `cvData` with `en` and `de` keys. PDF generation uses this data structure.

**Utility Functions**: `apps/web/src/lib/utils.ts`
- `cn()` - Tailwind class merging (clsx + tailwind-merge)
- `formatDate()` - German locale date formatting
- `calculateReadingTime()` - For blog posts

### File Conventions
- Pages: `apps/web/src/pages/` (Astro file-based routing)
- Components: `apps/web/src/components/{feature}/`
- Content: `apps/web/src/content/{collection}/*.md`
