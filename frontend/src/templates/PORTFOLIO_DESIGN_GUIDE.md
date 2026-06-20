# Portfolio Design Guide

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                      HEADER                          │
│  [Logo]          [Nav Links]              [Theme Toggle] │
│  Fixed top, 72px height, bg-surface/95 on scroll    │
├─────────────────────────────────────────────────────┤
│                                                      │
│                    HERO SECTION                      │
│  2-column grid (1.1fr / 0.9fr)                      │
│  ┌─────────────────┐  ┌──────────────┐              │
│  │ Name             │  │              │              │
│  │ Title            │  │   Profile    │              │
│  │ Tagline          │  │   Photo      │              │
│  │ [CTA] [CTA]      │  │   (circle)   │              │
│  └─────────────────┘  └──────────────┘              │
│  Min-height: 100vh, decorative radial bg element     │
├─────────────────────────────────────────────────────┤
│                                                      │
│                   ABOUT SECTION                      │
│  Max-width: 1200px, centered                         │
│  ┌──────────────────────────────────────────────┐   │
│  │  Section label (uppercase, accent color)      │   │
│  │  Heading: "About Me"                          │   │
│  ├──────────────────────────────────────────────┤   │
│  │  Card with 4 bio paragraphs                   │   │
│  ├──────────────────────────────────────────────┤   │
│  │  6 detail cards in 3-column grid              │   │
│  │  [Focus] [University] [Interest]              │   │
│  │  [Approach] [Mindset] [Goal]                  │   │
│  └──────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│                                                      │
│                   SKILLS SECTION                     │
│  4-column responsive grid                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐│
│  │ Frontend │ │ Backend  │ │ Database │ │ Tools   ││
│  │ React    │ │ Node.js  │ │ MongoDB  │ │ Git     ││
│  │ HTML     │ │ Express  │ │PostgreSQL│ │ Docker  ││
│  │ CSS      │ │          │ │          │ │ VS Code ││
│  │ Tailwind │ │          │ │          │ │ Vite    ││
│  └──────────┘ └──────────┘ └──────────┘ └─────────┘│
├─────────────────────────────────────────────────────┤
│                                                      │
│                  PROJECTS SECTION                    │
│  Single card (max-w-2xl)                             │
│  ┌─────────────────────────────────────────────┐    │
│  │  Project Name                                │    │
│  │  Project Type (accent label)                 │    │
│  │  [tech] [tech] [tech] tags                   │    │
│  ├─────────────────────────────────────────────┤    │
│  │  [Live Demo]  [GitHub]                       │    │
│  └─────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────┤
│                                                      │
│                  JOURNEY SECTION                     │
│  Timeline (vertical, max-w-3xl)                      │
│  ┌── Timeline line with dot indicators               │
│  │  ┌─────────────────────────────────────────┐      │
│  │  │  Milestone Title                        │      │
│  │  │  Description text                       │      │
│  │  └─────────────────────────────────────────┘      │
│  │  ┌─────────────────────────────────────────┐      │
│  │  │  Milestone Title                        │      │
│  │  │  Description text                       │      │
│  │  └─────────────────────────────────────────┘      │
│  │  ...                                               │
├─────────────────────────────────────────────────────┤
│                                                      │
│                  CONTACT SECTION                     │
│  2-column grid (1.2fr / 0.8fr)                       │
│  ┌────────────────────┐ ┌────────────────────┐       │
│  │   Contact Form      │ │   Contact Info     │       │
│  │   Name input        │ │   Email            │       │
│  │   Email input       │ │   Phone            │       │
│  │   Message textarea  │ │   Location         │       │
│  │   [Send] button     │ │   GitHub           │       │
│  └────────────────────┘ │   Social icons      │       │
│                          └────────────────────┘       │
├─────────────────────────────────────────────────────┤
│                     FOOTER                            │
│  Name + Title (left)    Social icons (right)          │
│  Copyright (centered bottom)                          │
└─────────────────────────────────────────────────────┘
```

## Color Scheme

### Dark Theme (default)
| Token | Hex | Purpose |
|-------|-----|---------|
| `--color-surface` | `#0B1120` | Page background |
| `--color-surface-secondary` | `#111827` | Alternate section bg |
| `--color-surface-card` | `#1E293B` | Card/component bg |
| `--color-surface-raised` | `#263548` | Raised elements |
| `--color-border` | `#334155` | Borders, dividers |
| `--color-border-hover` | `#475569` | Border hover state |
| `--color-accent` | `#3B82F6` | Primary accent (buttons, links) |
| `--color-accent-hover` | `#60A5FA` | Accent hover state |
| `--color-text-primary` | `#F1F5F9` | Headings, body text |
| `--color-text-secondary` | `#94A3B8` | Secondary text |
| `--color-text-muted` | `#64748B` | Muted/placeholder text |

### Light Theme
| Token | Hex | Purpose |
|-------|-----|---------|
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-surface-secondary` | `#F8FAFC` | Alternate section bg |
| `--color-surface-card` | `#F1F5F9` | Card/component bg |
| `--color-surface-raised` | `#E2E8F0` | Raised elements |
| `--color-border` | `#CBD5E1` | Borders, dividers |
| `--color-border-hover` | `#94A3B8` | Border hover state |
| `--color-accent` | `#2563EB` | Primary accent (buttons, links) |
| `--color-accent-hover` | `#3B82F6` | Accent hover state |
| `--color-text-primary` | `#0F172A` | Headings, body text |
| `--color-text-secondary` | `#475569` | Secondary text |
| `--color-text-muted` | `#94A3B8` | Muted/placeholder text |

**Principle:** Colors are defined as RGB triplets in CSS variables so Tailwind opacity modifiers (e.g. `bg-surface/95`) work via `rgb(var(--color-surface) / 0.95)`.

## Component Breakdown

### Navigation (Header)
- **Position:** Fixed top, z-50, 72px height
- **Background:** Transparent by default → `bg-surface/95 backdrop-blur-xl` on scroll (>50px)
- **Logo:** Font-display (Space Grotesk), text-xl, bold, initials only
- **Nav Links:** Hidden on mobile (`md:flex`), text-sm, font-medium
  - Active link gets text-primary, inactive gets text-secondary
  - Active indicator: 20px wide, 2px tall accent rounded bar (absolute positioned bottom)
- **Theme Toggle:** 36×36px button, sun/moon icon, hover effect with bg-surface-card
- **Mobile Menu:** Hamburger icon on mobile, AnimatePresence slide-down with backdrop-blur

### Hero Section
- **Layout:** 2-column grid (`1.1fr / 0.9fr`), full viewport height
- **Text Column:** Stacks vertically with 1.5rem gap
  - Name: 5xl (mobile) → 6xl (tablet) → 7xl (desktop), display font, bold, tracking-tight
  - Title: text-lg, accent color
  - Tagline: text-base, text-secondary, max-w-lg
  - CTAs: Two buttons side-by-side
    - Primary: bg-accent, white text, rounded-lg, hover lifts 2px
    - Secondary: border, text-primary, hover border-brightens
- **Photo Column:** Circular image (rounded-full), 256px → 320px, border-2
  - Hover: border changes to accent color
- **Decorative:** Absolute radial gradient circle (500px), accent/5 opacity, top-right

### About Section
- **Layout:** Centered, max-w-4xl, alternating bg-surface-secondary
- **Section Header:** Centered, 64px bottom margin
  - Label: 12px, uppercase, tracking-widest, accent color
  - Heading: 3xl→4xl, display font, bold
- **Bio Card:** bg-surface-card, border, rounded-xl, padding 32px→40px
  - 4 paragraphs, 15px font, text-secondary, 1.75 line-height, 20px gap
- **Detail Cards:** 3-column grid (responsive: 1→2→3 cols), 12px gap
  - Each: bg-surface-card, border, rounded-lg, padding 20px
  - Title: 12px, uppercase, accent
  - Text: 14px, text-secondary

### Skills Section
- **Layout:** 4-column grid (responsive: 1→2→4 cols), 16px gap
- **Category Cards:** bg-surface-card, border, rounded-xl, padding 24px
  - Title: border-bottom divider, 16px, semibold
  - Skills: Stacked list with dot indicators (8px accent dots)
  - Hover: border brightens to border-hover

### Projects Section
- **Layout:** Single featured project, max-w-2xl, centered
- **Project Card:** Two-part card (content + footer)
  - Content: Title (1xl, bold) + Type label (accent, 12px) + Tech tags (flex wrap)
  - Tags: 12px, bg-accent/10, border-accent/20, rounded
  - Footer: Border-t divider, [Live Demo] primary button + [GitHub] secondary button

### Journey Section (Experience)
- **Layout:** Vertical timeline, max-w-3xl, centered
- **Timeline Line:** 2px wide pseudo-element (`::before`), border color
- **Dot Indicators:** 14px circles, accent fill, 2px surface border
- **Cards:** bg-surface-card, border, rounded-lg, padding 20px
- **Spacing:** 16px gap between timeline items

### Contact Section
- **Layout:** 2-column grid (1.2fr / 0.8fr), max-w-4xl
- **Form Column:**
  - Inputs: Full width, padding 10px 16px, bg-surface, border, rounded-lg
  - Focus: border-accent, ring-1 ring-accent/30
  - Submit: bg-accent, white text, hover lifts 2px
- **Info Column:**
  - Info items: 4 rows with icon boxes (36×36px, bg-accent/10, rounded-lg)
  - Social icons: 40×40px boxes, border, hover → accent color
- **Error State:** Red box, bg-red-500/10, border-red-500/30
- **Loading State:** Spinner icon (FaSpinner animate-spin), button disabled

### Footer
- **Layout:** 2-column flex (row on desktop, column on mobile)
- **Left:** Name (18px, bold) + Title (14px, secondary text)
- **Right:** Social icon boxes (40×40px), same style as contact section
- **Copyright:** Centered below divider, 12px, muted text

## Typography Scale

| Size | Class | Usage |
|------|-------|-------|
| 12px | `text-xs` | Section labels, tech tags, copyright |
| 14px | `text-sm` | Body copy, skill items, detail text |
| 15px | `text-[15px]` | About section paragraphs |
| 16px | `text-base` | Hero tagline, project descriptions |
| 18px | `text-lg` | Hero title, footer name, contact headings |
| 20px | `text-xl` | Logo, project card titles |
| 24px | `text-2xl` | Mobile section headings (not used directly) |
| 30px | `text-3xl` | Section headings (mobile) |
| 36px | `text-4xl` | Section headings (desktop) |
| 48px | `text-5xl` | Hero name (mobile) |
| 60px | `text-6xl` | Hero name (tablet) |
| 72px | `text-7xl` | Hero name (desktop) |

**Fonts:**
- Display: `Space Grotesk` — weights 400, 500, 600, 700
- Body: `Inter` — weights 300–900

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` | 4px | Nav link spacing |
| `gap-2` | 8px | Icon spacing, tag gaps |
| `gap-3` | 12px | Button groups, detail card gaps |
| `gap-4` | 16px | Skill card grid, timeline spacing |
| `gap-6` | 24px | Hero section element gaps, section padding |
| `gap-16` | 64px | Hero column gap (mobile) |
| `px-6` | 24px | Section horizontal padding |
| `py-24` | 96px | Section vertical padding |
| `py-12` | 48px | Footer vertical padding |
| `py-3` | 12px | Button vertical padding |
| `px-6` | 24px | Button horizontal padding |
| `p-6` | 24px | Card padding |
| `p-8` | 32px | Card padding (desktop) |
| `mb-16` | 64px | Section header bottom margin |
| `max-w-container` | 1200px | Maximum content width |

## Responsive Breakpoints

| Breakpoint | Width | Column Changes |
|------------|-------|----------------|
| **Mobile** | < 768px | 1 column everywhere, hamburger nav, smaller hero text |
| **Tablet** | 768px+ (`sm:`) | Skills 2-col, detail cards 2-col, hero 5xl→6xl |
| **Desktop** | 1024px+ (`lg:`) | Hero 2-col grid, skills 4-col, detail cards 3-col, contact 2-col, nav visible |

## Hover States & Interactions

| Element | Default | Hover | Transition |
|---------|---------|-------|------------|
| Primary buttons | bg-accent | bg-accent-hover, -translate-y-0.5 | all 0.3s ease |
| Secondary buttons | border-border | border-border-hover, -translate-y-0.5 | all 0.3s ease |
| Nav links | text-secondary | text-primary | colors 0.2s ease |
| Cards | bg-surface-card, border-border | border-border-hover | colors 0.3s ease |
| Social icons | text-secondary | text-accent, border-accent | colors 0.3s ease |
| Photo circle | border-border | border-accent | border 0.3s ease |
| Input fields | border-border | border-accent + ring | all 0.3s ease |
| Submit button (disabled) | bg-accent | opacity-60, cursor-not-allowed | all 0.3s ease |

## Design Principles

1. **Dark-first:** The dark theme is the default because it reduces eye strain for code-heavy portfolios and gives a modern, professional feel.
2. **Consistent rhythm:** All spacing follows a 4px grid (Tailwind defaults), creating visual harmony across sections.
3. **Subtle depth:** Cards use borders and hover border-brightening instead of box-shadows, keeping the design clean.
4. **Accent as wayfinding:** The blue accent (#3B82F6) is used sparingly — section labels, active nav, buttons — to guide the eye to interactive elements.
5. **Typography hierarchy:** Display font (Space Grotesk) for headings, body font (Inter) for text. Weights: 700 for headings, 400/500/600 for body.
6. **Scroll animations:** Framer Motion provides staggered fade-in-up animations on scroll, making the page feel dynamic without being distracting.
7. **Mobile-first responsive:** Every section starts as single-column on mobile and progressively enhances to multi-column on larger screens.
8. **Theme variables:** All colors are CSS custom properties, enabling instant light/dark theme switching without touching component code.
