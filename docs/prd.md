# Product Requirements Document (PRD)
## Noah Kellner – Personal Brand Website

**Version:** 1.0  
**Erstellt:** Januar 2025  
**Autor:** Noah Kellner  

---

## 1. Executive Summary

### 1.1 Projektziel
Entwicklung einer persönlichen Markenwebsite für Noah Kellner, die als modernes Portfolio, CV-Plattform, Blog und technisches Showcase dient. Die Website soll durch ihre Umsetzung selbst die technischen Fähigkeiten des Erstellers demonstrieren.

### 1.2 Kernziele
- **Professionelle Präsenz**: Moderner, exportierbarer Lebenslauf und Karriere-Übersicht
- **Projekt-Showcase**: Detaillierte Präsentation von Freizeit- und Berufsprojekten
- **Thought Leadership**: Blog-Plattform für technische und persönliche Inhalte
- **Technisches Showcase**: AI Voice Chatbot als "digitaler Zwilling"
- **Lead Generation**: Intelligente Anfrage-Mechanik für verschiedene Zielgruppen

### 1.3 Zielgruppen
| Zielgruppe | Bedürfnis | Conversion-Ziel |
|------------|-----------|-----------------|
| Recruiter/HR | Schneller CV-Zugriff, Skill-Übersicht | CV Download, Kontaktaufnahme |
| Potenzielle Arbeitgeber | Technische Kompetenz validieren | Gespräch/Interview |
| Projekt-Partner | Fähigkeiten & bisherige Arbeit sehen | Projektanfrage |
| Investoren | Vision, Track Record, Expertise | Meeting-Anfrage |
| Tech Community | Learnings, Projekte, Insights | Blog-Leser, Follower |

---

## 2. Technical Architecture

### 2.1 Tech Stack

#### Frontend
| Komponente | Technologie | Begründung |
|------------|-------------|------------|
| Framework | **Astro 4.x** | Content-first, Islands Architecture, optimale Performance |
| UI Components | **React 18** (Islands) | Nur für interaktive Komponenten (Chat, Forms) |
| Styling | **Tailwind CSS 3.x** | Utility-first, aber mit Custom Design System |
| Animations | **Motion (Framer Motion)** | Für React Islands |
| Animations | **CSS Animations** | Für statische Komponenten |
| Icons | **Lucide React** | Konsistent, lightweight |
| PDF Generation | **@react-pdf/renderer** | CV Export Funktionalität |

#### Backend (Separater Service)
| Komponente | Technologie | Begründung |
|------------|-------------|------------|
| Framework | **FastAPI** | Python, async-ready, WebSocket Support |
| AI/LLM | **Anthropic Claude API** | Konversations-AI für Chatbot |
| Voice TTS | **ElevenLabs API** | Voice Cloning, beste deutsche Qualität |
| Voice STT | **Deepgram** | Realtime Speech-to-Text |
| Database | **SQLite / Turso** | Leichtgewichtig für Chat-History, Analytics |

#### Infrastructure
| Komponente | Service | Details |
|------------|---------|---------|
| Frontend Hosting | **Railway** | Astro SSR/Static |
| Backend Hosting | **Railway** | FastAPI Service |
| Domain | **noah-kellner.de** | (zu registrieren/konfigurieren) |
| CDN/Assets | **Railway** oder **Cloudflare R2** | Bilder, Fonts |
| Analytics | **Plausible** oder **Umami** | Privacy-friendly |

### 2.2 Repository Struktur

```
noah-kellner-website/
├── apps/
│   ├── web/                      # Astro Frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/           # Design System Components
│   │   │   │   ├── layout/       # Header, Footer, Navigation
│   │   │   │   ├── sections/     # Page Sections (Hero, etc.)
│   │   │   │   ├── chat/         # AI Chatbot (React Island)
│   │   │   │   ├── cv/           # CV Components + PDF Export
│   │   │   │   └── projects/     # Project Cards, Gallery
│   │   │   ├── layouts/
│   │   │   │   ├── BaseLayout.astro
│   │   │   │   ├── BlogLayout.astro
│   │   │   │   └── ProjectLayout.astro
│   │   │   ├── pages/
│   │   │   │   ├── index.astro
│   │   │   │   ├── about.astro
│   │   │   │   ├── cv.astro
│   │   │   │   ├── projects/
│   │   │   │   │   ├── index.astro
│   │   │   │   │   └── [...slug].astro
│   │   │   │   ├── blog/
│   │   │   │   │   ├── index.astro
│   │   │   │   │   └── [...slug].astro
│   │   │   │   ├── contact.astro
│   │   │   │   └── chat.astro
│   │   │   ├── content/
│   │   │   │   ├── blog/         # Markdown Blog Posts
│   │   │   │   ├── projects/     # Markdown Project Pages
│   │   │   │   └── config.ts     # Content Collections Config
│   │   │   ├── styles/
│   │   │   │   ├── global.css
│   │   │   │   └── fonts.css
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts
│   │   │   │   └── api.ts        # Backend API Client
│   │   │   └── data/
│   │   │       ├── cv.json       # Structured CV Data
│   │   │       ├── skills.json
│   │   │       └── navigation.json
│   │   ├── public/
│   │   │   ├── fonts/
│   │   │   ├── images/
│   │   │   │   ├── projects/
│   │   │   │   └── blog/
│   │   │   └── favicon.svg
│   │   ├── astro.config.mjs
│   │   ├── tailwind.config.mjs
│   │   └── package.json
│   │
│   └── api/                      # FastAPI Backend
│       ├── app/
│       │   ├── main.py
│       │   ├── routers/
│       │   │   ├── chat.py
│       │   │   ├── voice.py
│       │   │   └── contact.py
│       │   ├── services/
│       │   │   ├── claude_service.py
│       │   │   ├── elevenlabs_service.py
│       │   │   └── deepgram_service.py
│       │   ├── models/
│       │   ├── config.py
│       │   └── prompts/
│       │       └── noah_persona.md
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/                     # Shared (falls benötigt)
│   └── types/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md
└── package.json                  # Monorepo Root (pnpm workspaces)
```

---

## 3. Design System

### 3.1 Design Philosophy
**"Editorial Minimalism"** – Clean, sophisticated, content-fokussiert mit subtilen modernen Touches. Kein generischer "AI-generated" Look.

### 3.2 Color Palette

```css
:root {
  /* Base - Dark Theme (Primary) */
  --color-bg-primary: #0A0A0B;        /* Fast schwarz, leicht warm */
  --color-bg-secondary: #141415;       /* Cards, Sections */
  --color-bg-tertiary: #1C1C1E;        /* Hover states, elevated */
  
  /* Text */
  --color-text-primary: #FAFAF9;       /* Warmweiß */
  --color-text-secondary: #A1A1AA;     /* Muted */
  --color-text-tertiary: #71717A;      /* Sehr muted */
  
  /* Accent - Warm Sand/Beige (Signature Color) */
  --color-accent: #E8DCC4;
  --color-accent-hover: #F5EEE1;
  --color-accent-muted: rgba(232, 220, 196, 0.1);
  
  /* Semantic */
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);
  
  /* Status */
  --color-success: #4ADE80;
  --color-warning: #FBBF24;
  --color-error: #F87171;
}
```

### 3.3 Typography

```css
:root {
  /* Font Families */
  --font-display: 'Satoshi', sans-serif;      /* Headlines, Hero */
  --font-body: 'Newsreader', Georgia, serif;  /* Body Text, Blog */
  --font-sans: 'Satoshi', sans-serif;         /* UI Elements */
  --font-mono: 'Geist Mono', monospace;       /* Code */
  
  /* Font Sizes - Fluid Typography */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
  --text-5xl: clamp(3rem, 2rem + 5vw, 5rem);
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

**Font Sources:**
- Satoshi: https://www.fontshare.com/fonts/satoshi (Free)
- Newsreader: Google Fonts
- Geist Mono: https://vercel.com/font

### 3.4 Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
  --space-12: 5rem;     /* 80px */
  --space-16: 8rem;     /* 128px */
  --space-20: 10rem;    /* 160px */
}
```

### 3.5 Animation Tokens

```css
:root {
  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  
  /* Easings */
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 3.6 Visual Effects

**Grain Texture Overlay:**
```css
.grain-overlay::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/textures/grain.png');
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

**Subtle Glow Effect (für Accent Elements):**
```css
.accent-glow {
  box-shadow: 
    0 0 20px rgba(232, 220, 196, 0.1),
    0 0 40px rgba(232, 220, 196, 0.05);
}
```

---

## 4. Page Specifications

### 4.1 Homepage (`/`)

**Ziel:** Sofortiger Eindruck, wer Noah ist und was er kann.

**Sections:**

1. **Hero Section**
   - Großer Name/Titel mit animiertem Text
   - Einzeiler-Tagline: "Head of IT • AI Enthusiast • Builder"
   - Subtle animated background (grain + gradient)
   - CTA: "Explore my work" / "Let's talk"

2. **Brief Intro**
   - 2-3 Sätze über Noah
   - Foto (optional, high-quality)
   - Quick Stats: X Jahre Experience, Y Projekte, etc.

3. **Featured Projects** (3 Projekte)
   - Card-Grid mit Hover-Effekten
   - Projekt-Thumbnail, Titel, kurze Description
   - Link zu Projekt-Detail

4. **Skills Overview**
   - Visuelle Darstellung der Kernkompetenzen
   - Kategorien: AI/ML, Infrastructure, Leadership, etc.
   - Keine langweiligen Progress-Bars

5. **Latest Blog Posts** (Optional, 2-3 Posts)
   - Teaser-Cards

6. **CTA Section**
   - "Let's build something together"
   - Inquiry-Button → Contact/Chat

**Interaktionen:**
- Scroll-triggered fade-in Animationen (staggered)
- Smooth scroll zu Sections
- Command Palette (⌘K) für Navigation

---

### 4.2 About Page (`/about`)

**Ziel:** Persönlichkeit und Background vermitteln.

**Content:**
- Extended Bio (persönlich, nicht nur professionell)
- Journey/Timeline (optional)
- Arbeitsphilosophie
- Interessen außerhalb der Arbeit
- "Fun Facts" oder persönliche Touches

---

### 4.3 CV Page (`/cv`)

**Ziel:** Professioneller, interaktiver Lebenslauf mit Export.

**Features:**
- **Timeline-basierte Darstellung**
  - Berufserfahrung
  - Ausbildung
  - Zertifikate
  
- **Skill Matrix**
  - Kategorisiert nach Bereichen
  - Expertise Level (visuell, keine %-Zahlen)
  
- **PDF Export Button**
  - Generiert professionelles PDF
  - Angepasstes Layout für Print
  - Download mit einem Klick

**Datenstruktur (cv.json):**
```json
{
  "personal": {
    "name": "Noah Kellner",
    "title": "Head of IT",
    "location": "Augsburg, Germany",
    "email": "...",
    "linkedin": "...",
    "github": "..."
  },
  "summary": "...",
  "experience": [
    {
      "company": "Dialog Factory GmbH",
      "title": "Head of IT",
      "period": "2023 - Present",
      "location": "Augsburg",
      "description": "...",
      "highlights": ["...", "..."]
    }
  ],
  "education": [...],
  "skills": {
    "technical": [...],
    "leadership": [...],
    "tools": [...]
  },
  "certifications": [...],
  "languages": [...]
}
```

---

### 4.4 Projects Page (`/projects`)

#### 4.4.1 Index (`/projects`)

**Layout:**
- Filter/Kategorie Navigation (optional)
- Card Grid oder List View
- Jede Card: Hero Image, Titel, Short Description, Tags

#### 4.4.2 Project Detail (`/projects/[slug]`)

**Struktur:**
1. **Hero Section**
   - Full-width Hero Image
   - Projekt-Titel
   - Tagline/Short Description
   - Meta: Jahr, Rolle, Technologien
   - Links: Live Demo, GitHub, etc.

2. **Overview**
   - Problem Statement
   - Lösung
   - Key Features

3. **Gallery**
   - Screenshots/UI Images
   - Lightbox für Vollansicht

4. **Deep Dive** (Markdown Content)
   - Technische Details
   - Herausforderungen
   - Learnings
   - Hintergrundgeschichte

5. **Tech Stack**
   - Verwendete Technologien mit Icons

6. **Related Projects** (optional)

**Content Collection Schema (Astro):**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    gallery: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    technologies: z.array(z.string()),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date(),
    status: z.enum(['completed', 'in-progress', 'concept']),
  }),
});
```

---

### 4.5 Blog (`/blog`)

#### 4.5.1 Index (`/blog`)

**Layout:**
- Liste aller Posts (neueste zuerst)
- Card: Titel, Excerpt, Datum, Reading Time, Tags
- Optional: Kategorie-Filter

#### 4.5.2 Post Detail (`/blog/[slug]`)

**Layout:**
- Clean Reading Experience (Newsreader Font)
- Table of Contents (optional, für lange Posts)
- Code Syntax Highlighting
- Share Buttons
- Related Posts

**Content Collection Schema:**
```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
```

---

### 4.6 Contact Page (`/contact`)

**Ziel:** Intelligente Lead-Qualifizierung.

**"Choose Your Path" Flow:**

```
┌─────────────────────────────────────────┐
│  What brings you here?                  │
├─────────────────────────────────────────┤
│  💼  Job Opportunity / Recruiting       │
│  🚀  Project Inquiry                    │
│  💡  Investment / Partnership           │
│  🤝  Collaboration / Networking         │
│  💬  Just saying hello                  │
└─────────────────────────────────────────┘
```

**Je nach Auswahl:**
- Unterschiedliche Formular-Felder
- Angepasste Fragen
- Relevante Info-Requests

**Form Fields (Beispiel für Project Inquiry):**
- Name
- Email
- Company/Organization
- Project Type (Dropdown)
- Budget Range (Optional)
- Timeline
- Project Description
- How did you find me?

**Alternative:** "Talk to AI Noah" Button → Chat Page

---

### 4.7 Chat Page (`/chat`)

**Ziel:** Full-Screen AI Assistant Experience.

**UI Layout:**
```
┌────────────────────────────────────────────┐
│  ←  Noah Kellner AI                   ⚙️   │
├────────────────────────────────────────────┤
│                                            │
│     [Avatar]                               │
│     Hi! I'm Noah's AI assistant.           │
│     Ask me anything about Noah,            │
│     his work, or how he can help you.      │
│                                            │
│                                            │
│                          [Your Message]    │
│                                            │
├────────────────────────────────────────────┤
│  🎤  │  Type your message...    │  Send ➤  │
│ Voice│                          │          │
│Toggle│                          │          │
└────────────────────────────────────────────┘
```

**Features:**
- Text Input (Default)
- Voice Toggle (Microphone Button)
- Voice Aktiviert:
  - Push-to-talk oder VAD (Voice Activity Detection)
  - Audio visualizer während Recording
  - Antwort wird mit geklonter Stimme vorgelesen
- Suggested Questions/Prompts
- Can navigate user to relevant pages

---

## 5. AI Chatbot Specification

### 5.1 Persona Definition

**Name:** Noah AI / Digital Noah

**Personality Traits:**
- Professionell aber approachable
- Technisch versiert
- Direkt und auf den Punkt
- Leicht humorvoll wenn angemessen
- Hilfsbereit ohne aufdringlich zu sein

**Knowledge Base:**
- CV Daten (vollständig)
- Projekt-Informationen
- Blog-Inhalte
- Allgemeine Infos über Noah's Philosophie
- FAQ-Inhalte

**Capabilities:**
- Fragen über Noah beantworten
- Zu relevanten Seiten navigieren
- Meeting/Call anfragen entgegennehmen
- Technische Fragen zu Projekten beantworten

**Limitations:**
- Keine persönlichen Kontaktdaten teilen (nur Formular)
- Keine Zusagen/Versprechen machen
- Bei unklaren Anfragen: Kontaktformular empfehlen

### 5.2 System Prompt Structure

```markdown
# Noah Kellner AI Assistant

Du bist eine KI-Repräsentation von Noah Kellner. Du sprichst in der ersten Person, 
aber machst klar, dass du eine AI bist wenn direkt gefragt.

## Über Noah
[CV-Daten hier einfügen]

## Projekte
[Projekt-Summaries hier einfügen]

## Kommunikationsstil
- Deutsch und Englisch fließend
- Professionell aber locker
- Technisch präzise
- Direkt und effizient

## Regeln
1. Sei hilfreich und informativ
2. Leite komplexe Anfragen zum Kontaktformular
3. Teile keine privaten Kontaktdaten
4. Empfehle relevante Seiten wenn passend
5. Bei Jobanfragen: CV-Seite empfehlen
6. Bei Projektanfragen: Contact-Seite empfehlen

## Verfügbare Aktionen
- navigate_to(page): Leitet zu einer Seite
- show_project(slug): Zeigt Projekt-Details
- open_contact_form(type): Öffnet Kontaktformular
```

### 5.3 Voice Configuration

**ElevenLabs Settings:**
- Model: `eleven_multilingual_v2`
- Voice: Custom Clone (Noah's Voice)
- Stability: 0.5
- Similarity Boost: 0.75
- Style: 0.2
- Speaker Boost: true

**Voice Clone Requirements:**
- Mindestens 30 Minuten Audio
- Klare Aufnahmen ohne Hintergrundgeräusche
- Verschiedene Sprechstile (normal, enthusiastisch, erklärend)
- Deutsch und Englisch Samples

### 5.4 API Endpoints

```
POST /api/chat
  Body: { message: string, sessionId: string }
  Response: { response: string, actions?: Action[] }

POST /api/chat/voice
  Body: { audio: base64 }
  Response: { 
    transcript: string,
    response: string, 
    audioResponse: base64,
    actions?: Action[]
  }

WebSocket /api/chat/stream
  For real-time voice conversations
```

---

## 6. Additional Features

### 6.1 Command Palette (⌘K / Ctrl+K)

**Functionality:**
- Quick Navigation zu allen Seiten
- Projekt-Suche
- Blog-Suche
- Quick Actions: "Download CV", "Contact", "Chat"

**Implementation:** React Component mit Keyboard Listener

### 6.2 Analytics

**Events to Track:**
- Page Views
- CV Downloads
- Contact Form Submissions (by type)
- Chat Interactions
- Project Views
- Blog Post Reads
- Time on Page

**Tool:** Plausible oder Umami (self-hosted)

### 6.3 SEO

**Requirements:**
- Semantic HTML
- Meta Tags für alle Seiten
- Open Graph Tags
- Twitter Cards
- Structured Data (JSON-LD) für Person, Articles
- Sitemap.xml
- robots.txt

### 6.4 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3s |
| Cumulative Layout Shift | < 0.1 |

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Repository Setup (Monorepo mit pnpm)
- [ ] Astro Project Initialization
- [ ] Design System Implementation (CSS Variables, Components)
- [ ] Base Layout (Header, Footer, Navigation)
- [ ] Homepage (Static Version)
- [ ] Basic Routing

### Phase 2: Content Pages (Week 2-3)
- [ ] About Page
- [ ] CV Page (ohne PDF Export)
- [ ] Projects Index + Detail Pages
- [ ] Content Collections Setup
- [ ] Blog Index + Detail Pages
- [ ] Responsive Design

### Phase 3: Interactive Features (Week 3-4)
- [ ] PDF Export für CV
- [ ] Contact Form mit "Choose Your Path"
- [ ] Command Palette
- [ ] Animations & Transitions
- [ ] Image Optimization

### Phase 4: AI Chatbot (Week 4-6)
- [ ] FastAPI Backend Setup
- [ ] Claude Integration
- [ ] Text Chat Implementation
- [ ] Voice Clone Setup (ElevenLabs)
- [ ] Voice Mode Integration
- [ ] Chat UI Polish

### Phase 5: Launch Prep (Week 6-7)
- [ ] SEO Optimization
- [ ] Analytics Integration
- [ ] Performance Optimization
- [ ] Testing (Cross-browser, Mobile)
- [ ] Domain Setup
- [ ] Deployment Pipeline
- [ ] Content Finalization

### Phase 6: Post-Launch
- [ ] Monitoring Setup
- [ ] Feedback Collection
- [ ] Iterative Improvements
- [ ] Blog Content

---

## 8. Content Requirements

### 8.1 Copy Needed

| Page | Content Required |
|------|------------------|
| Homepage | Hero Tagline, Intro Text, Section Headlines |
| About | Extended Bio (500-800 words) |
| CV | All CV Data in JSON format |
| Projects | 3-5 Project descriptions (each 300-500 words) |
| Blog | At least 1-2 launch posts |
| Contact | Form labels, Success/Error messages |
| Chat | Welcome message, Suggested prompts |

### 8.2 Assets Needed

| Asset | Specification |
|-------|---------------|
| Profile Photo | High-res, professional |
| Project Screenshots | 1920x1080 minimum |
| Project Hero Images | 2400x1600 recommended |
| Favicon | SVG + PNG fallbacks |
| OG Image | 1200x630 |
| Voice Samples | 30+ min clear audio |

---

## 9. Success Metrics

### Launch KPIs (First 3 Months)
- 500+ unique visitors
- 50+ CV downloads
- 10+ quality inquiries
- 100+ chat interactions
- < 3s average page load

### Long-term Goals
- Top 3 Google ranking für "Noah Kellner"
- Regular blog traffic
- Consistent inquiry flow
- Portfolio für neue Opportunities

---

## 10. Open Questions / Decisions Needed

1. **Domain:** `noah-kellner.de` oder `noahkellner.dev` oder andere?
2. **Voice Samples:** Wann/wie aufnehmen?
3. **Initial Projects:** Welche 3-5 Projekte zuerst featuren?
4. **Blog Topics:** Erste 2-3 Post-Ideen?
5. **Professional Photo:** Vorhanden oder neu machen?

---

## Appendix A: Component Library Checklist

### UI Components
- [ ] Button (primary, secondary, ghost, link)
- [ ] Input (text, textarea, select)
- [ ] Card (project, blog, generic)
- [ ] Badge/Tag
- [ ] Navigation (header, mobile menu)
- [ ] Footer
- [ ] Section Container
- [ ] Typography Components (Heading, Text, Link)
- [ ] Icon wrapper
- [ ] Image (optimized, with placeholder)
- [ ] Modal/Dialog
- [ ] Toast/Notification

### Layout Components
- [ ] Container (max-width wrapper)
- [ ] Grid
- [ ] Stack (vertical/horizontal)
- [ ] Divider

### Interactive Components
- [ ] Command Palette
- [ ] Chat Interface
- [ ] Contact Form
- [ ] PDF Download Button
- [ ] Image Gallery/Lightbox
- [ ] Timeline

---

## Appendix B: Environment Variables

```env
# Frontend (.env)
PUBLIC_API_URL=https://api.noah-kellner.de
PUBLIC_SITE_URL=https://noah-kellner.de

# Backend (.env)
ANTHROPIC_API_KEY=sk-ant-...
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID=...
DEEPGRAM_API_KEY=...
DATABASE_URL=...
CORS_ORIGINS=https://noah-kellner.de
```

---

*Dieses Dokument dient als Referenz für die Entwicklung. Updates werden bei Bedarf vorgenommen.*