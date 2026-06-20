# Portfolio CSS Code — Ready-to-Use

Copy the entire CSS block below into your project's stylesheet. All components are styled. Works standalone (no Tailwind required).

---

## 1. CSS Variables & Global Reset

```css
/* ============================================
   THEME VARIABLES
   ============================================ */

:root {
  /* Light theme (default) */
  --color-surface: 255 255 255;
  --color-surface-secondary: 248 250 252;
  --color-surface-card: 241 245 249;
  --color-surface-raised: 226 232 240;
  --color-border: 203 213 225;
  --color-border-hover: 148 163 184;
  --color-accent: 37 99 235;
  --color-accent-hover: 59 130 246;
  --color-text-primary: 15 23 42;
  --color-text-secondary: 71 85 105;
  --color-text-muted: 148 163 184;

  /* Fonts */
  --font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Spacing */
  --max-width-container: 1200px;
}

.dark {
  --color-surface: 11 17 32;
  --color-surface-secondary: 17 24 39;
  --color-surface-card: 30 41 59;
  --color-surface-raised: 38 53 72;
  --color-border: 51 65 85;
  --color-border-hover: 71 85 105;
  --color-accent: 59 130 246;
  --color-accent-hover: 96 165 250;
  --color-text-primary: 241 245 249;
  --color-text-secondary: 148 163 184;
  --color-text-muted: 100 116 139;
}

/* ============================================
   GLOBAL STYLES
   ============================================ */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  font-family: var(--font-body);
  background: rgb(var(--color-surface));
  color: rgb(var(--color-text-primary));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  transition: background-color 0.3s ease, color 0.3s ease;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

::selection {
  background: rgba(59, 130, 246, 0.3);
  color: #fff;
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: rgb(var(--color-surface)); }
::-webkit-scrollbar-thumb { background: rgb(var(--color-border)); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgb(var(--color-border-hover)); }
```

---

## 2. Utility Classes

```css
/* ============================================
   LAYOUT UTILITIES
   ============================================ */

.container {
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 96px 24px;
}

.section-alt {
  background: rgb(var(--color-surface-secondary));
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(var(--color-accent));
}

.section-title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 700;
  color: rgb(var(--color-text-primary));
  margin-top: 12px;
  letter-spacing: -0.02em;
}

@media (min-width: 640px) {
  .section-title { font-size: 36px; }
}

.section-subtitle {
  font-size: 14px;
  color: rgb(var(--color-text-secondary));
  margin-top: 12px;
  max-width: 512px;
  margin-left: auto;
  margin-right: auto;
}

/* ============================================
   BUTTON UTILITIES
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: rgb(var(--color-accent));
  color: #fff;
}

.btn-primary:hover {
  background: rgb(var(--color-accent-hover));
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgb(var(--color-border));
  color: rgb(var(--color-text-primary));
}

.btn-secondary:hover {
  border-color: rgb(var(--color-border-hover));
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
```

---

## 3. Navigation (Header)

```css
/* ============================================
   HEADER — Fixed Top Navigation
   ============================================ */

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 72px;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(var(--color-surface), 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgb(var(--color-border));
}

.header-inner {
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--color-text-primary));
  letter-spacing: -0.02em;
}

.header-nav {
  display: none;
  align-items: center;
  gap: 4px;
}

@media (min-width: 768px) {
  .header-nav { display: flex; }
}

.header-nav a {
  position: relative;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: color 0.2s ease;
  color: rgb(var(--color-text-secondary));
}

.header-nav a:hover {
  color: rgb(var(--color-text-primary));
}

.header-nav a.active {
  color: rgb(var(--color-text-primary));
}

.header-nav a.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: rgb(var(--color-accent));
  border-radius: 2px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-text-secondary));
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  border: none;
}

.theme-toggle:hover {
  color: rgb(var(--color-text-primary));
  background: rgb(var(--color-surface-card));
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-text-primary));
  font-size: 24px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

@media (min-width: 768px) {
  .menu-toggle { display: none; }
}

/* Mobile Menu */
.mobile-menu {
  display: block;
  background: rgba(var(--color-surface), 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgb(var(--color-border));
  padding: 16px 24px;
}

@media (min-width: 768px) {
  .mobile-menu { display: none; }
}

.mobile-menu a {
  display: block;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--color-text-secondary));
}

.mobile-menu a.active {
  color: rgb(var(--color-accent));
}
```

---

## 4. Hero Section

```css
/* ============================================
   HERO SECTION
   ============================================ */

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px 24px 64px;
  position: relative;
  overflow: hidden;
}

.hero-bg-circle {
  position: absolute;
  top: 33%;
  right: -192px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: rgba(var(--color-accent), 0.05);
  pointer-events: none;
}

.hero-grid {
  max-width: var(--max-width-container);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 10;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 96px;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
}

@media (min-width: 1024px) {
  .hero-content { text-align: left; }
}

.hero-name {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  color: rgb(var(--color-text-primary));
  line-height: 1.05;
  letter-spacing: -0.02em;
}

@media (min-width: 640px) {
  .hero-name { font-size: 60px; }
}

@media (min-width: 1024px) {
  .hero-name { font-size: 72px; }
}

.hero-title {
  font-size: 18px;
  color: rgb(var(--color-accent));
}

.hero-tagline {
  font-size: 16px;
  color: rgb(var(--color-text-secondary));
  line-height: 1.625;
  max-width: 512px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .hero-tagline { margin: 0; }
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

@media (min-width: 1024px) {
  .hero-cta { justify-content: flex-start; }
}

.hero-image {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .hero-image { justify-content: flex-end; }
}

.hero-image figure {
  width: 256px;
  height: 256px;
  border-radius: 50%;
  border: 2px solid rgb(var(--color-border));
  overflow: hidden;
  transition: border-color 0.3s ease;
}

@media (min-width: 640px) {
  .hero-image figure {
    width: 288px;
    height: 288px;
  }
}

@media (min-width: 1024px) {
  .hero-image figure {
    width: 320px;
    height: 320px;
  }
}

.hero-image figure:hover {
  border-color: rgb(var(--color-accent));
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 5. About Section

```css
/* ============================================
   ABOUT SECTION
   ============================================ */

.about {
  padding: 96px 24px;
  background: rgb(var(--color-surface-secondary));
}

.about-inner {
  max-width: var(--max-width-container);
  margin: 0 auto;
}

.about-bio {
  max-width: 896px;
  margin: 0 auto;
}

.bio-card {
  background: rgb(var(--color-surface-card));
  border: 1px solid rgb(var(--color-border));
  border-radius: 12px;
  padding: 32px;
}

@media (min-width: 640px) {
  .bio-card { padding: 40px; }
}

.bio-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: rgb(var(--color-text-secondary));
  line-height: 1.75;
  font-size: 15px;
}

.about-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 32px;
  max-width: 896px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .about-details { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .about-details { grid-template-columns: repeat(3, 1fr); }
}

.detail-card {
  background: rgb(var(--color-surface-card));
  border: 1px solid rgb(var(--color-border));
  border-radius: 8px;
  padding: 20px;
  transition: border-color 0.3s ease;
}

.detail-card:hover {
  border-color: rgb(var(--color-border-hover));
}

.detail-card-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgb(var(--color-accent));
  margin-bottom: 4px;
}

.detail-card-text {
  font-size: 14px;
  color: rgb(var(--color-text-secondary));
}
```

---

## 6. Skills Section

```css
/* ============================================
   SKILLS SECTION
   ============================================ */

.skills {
  padding: 96px 24px;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: var(--max-width-container);
  margin: 0 auto;
}

@media (min-width: 640px) {
  .skills-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .skills-grid { grid-template-columns: repeat(4, 1fr); }
}

.skill-category {
  background: rgb(var(--color-surface-card));
  border: 1px solid rgb(var(--color-border));
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.3s ease;
}

.skill-category:hover {
  border-color: rgb(var(--color-border-hover));
}

.skill-category-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--color-text-primary));
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(var(--color-border));
}

.skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgb(var(--color-text-secondary));
}

.skill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(var(--color-accent), 0.6);
  flex-shrink: 0;
}
```

---

## 7. Projects Section

```css
/* ============================================
   PROJECTS SECTION
   ============================================ */

.projects {
  padding: 96px 24px;
  background: rgb(var(--color-surface-secondary));
}

.projects-list {
  max-width: 672px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-card {
  background: rgb(var(--color-surface-card));
  border: 1px solid rgb(var(--color-border));
  border-radius: 12px;
  overflow: hidden;
}

.project-content {
  padding: 24px;
}

@media (min-width: 640px) {
  .project-content { padding: 32px; }
}

.project-name {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--color-text-primary));
  margin-bottom: 4px;
}

.project-type {
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--color-accent));
  margin-bottom: 16px;
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.project-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(var(--color-accent), 0.1);
  color: rgb(var(--color-text-secondary));
  border: 1px solid rgba(var(--color-accent), 0.2);
}

.project-footer {
  padding: 16px 24px;
  border-top: 1px solid rgb(var(--color-border));
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (min-width: 640px) {
  .project-footer { padding: 16px 32px; }
}
```

---

## 8. Journey Section (Experience / Timeline)

```css
/* ============================================
   JOURNEY / EXPERIENCE SECTION
   ============================================ */

.journey {
  padding: 96px 24px;
}

.journey-list {
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.journey-item {
  position: relative;
  padding-left: 32px;
}

/* Timeline line */
.journey-item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 12px;
  width: 2px;
  height: calc(100% + 8px);
  background: rgb(var(--color-border));
}

.journey-item:last-child::before {
  display: none;
}

/* Timeline dot */
.journey-dot {
  position: absolute;
  left: 5px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgb(var(--color-accent));
  border: 2px solid rgb(var(--color-surface));
}

.journey-card {
  background: rgb(var(--color-surface-card));
  border: 1px solid rgb(var(--color-border));
  border-radius: 8px;
  padding: 20px;
  transition: border-color 0.3s ease;
}

.journey-card:hover {
  border-color: rgb(var(--color-border-hover));
}

.journey-card-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--color-text-primary));
  margin-bottom: 4px;
}

.journey-card-desc {
  font-size: 14px;
  color: rgb(var(--color-text-secondary));
  line-height: 1.625;
}
```

---

## 9. Contact Section

```css
/* ============================================
   CONTACT SECTION
   ============================================ */

.contact {
  padding: 96px 24px;
  background: rgb(var(--color-surface-secondary));
}

.contact-grid {
  max-width: 896px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.form-card,
.info-card {
  background: rgb(var(--color-surface-card));
  border: 1px solid rgb(var(--color-border));
  border-radius: 12px;
  padding: 32px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: rgb(var(--color-text-primary));
  margin-bottom: 4px;
}

.card-subtitle {
  font-size: 14px;
  color: rgb(var(--color-text-secondary));
  margin-bottom: 24px;
}

/* Form styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--color-text-secondary));
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 16px;
  border-radius: 8px;
  background: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-border));
  color: rgb(var(--color-text-primary));
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgb(var(--color-text-muted));
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgb(var(--color-accent));
  box-shadow: 0 0 0 1px rgba(var(--color-accent), 0.3);
}

.form-group textarea {
  resize: vertical;
  min-height: 96px;
}

/* Info items */
.info-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-border));
}

.info-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(var(--color-accent), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-accent));
  flex-shrink: 0;
}

.info-label {
  font-size: 14px;
  color: rgb(var(--color-text-secondary));
}

/* Social icons */
.social-links {
  display: flex;
  gap: 8px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-border));
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-text-secondary));
  transition: all 0.3s ease;
}

.social-link:hover {
  color: rgb(var(--color-accent));
  border-color: rgb(var(--color-accent));
}

/* Error state */
.error-message {
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  font-size: 14px;
  color: rgb(248, 113, 113);
}
```

---

## 10. Footer

```css
/* ============================================
   FOOTER
   ============================================ */

.footer {
  background: rgb(var(--color-surface));
  border-top: 1px solid rgb(var(--color-border));
  padding: 48px 24px;
}

.footer-inner {
  max-width: var(--max-width-container);
  margin: 0 auto;
}

.footer-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

@media (min-width: 768px) {
  .footer-main {
    flex-direction: row;
  }
}

.footer-info {
  text-align: center;
}

@media (min-width: 768px) {
  .footer-info { text-align: left; }
}

.footer-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: rgb(var(--color-text-primary));
  margin-bottom: 4px;
}

.footer-title {
  font-size: 14px;
  color: rgb(var(--color-text-secondary));
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-social .social-link {
  width: 40px;
  height: 40px;
}

.footer-divider {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgb(var(--color-border));
  text-align: center;
}

.footer-copyright {
  font-size: 12px;
  color: rgb(var(--color-text-muted));
}
```

---

## 11. Responsive Media Queries

```css
/* ============================================
   RESPONSIVE BREAKPOINTS
   ============================================ */

/* Mobile: < 640px (default styles above) */

/* Tablet: 640px+ */
@media (min-width: 640px) {
  .section-title { font-size: 36px; }
  .hero-name { font-size: 60px; }
  .hero-image figure { width: 288px; height: 288px; }
  .bio-card { padding: 40px; }
  .about-details { grid-template-columns: repeat(2, 1fr); }
  .skills-grid { grid-template-columns: repeat(2, 1fr); }
  .project-content { padding: 32px; }
  .project-footer { padding: 16px 32px; }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .header-nav { display: flex; }
  .menu-toggle { display: none; }
  .hero-grid { grid-template-columns: 1.1fr 0.9fr; gap: 96px; }
  .hero-content { text-align: left; }
  .hero-name { font-size: 72px; }
  .hero-tagline { margin: 0; }
  .hero-cta { justify-content: flex-start; }
  .hero-image figure { width: 320px; height: 320px; }
  .about-details { grid-template-columns: repeat(3, 1fr); }
  .skills-grid { grid-template-columns: repeat(4, 1fr); }
  .contact-grid { grid-template-columns: 1.2fr 0.8fr; }
  .footer-main { flex-direction: row; }
  .footer-info { text-align: left; }
}

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) {
  .container { padding: 0 32px; }
}
```

---

## 12. Scroll Animations (CSS-only fallback)

```css
/* ============================================
   SCROLL REVEAL (CSS-only, no JS needed)
   Add class "reveal" to any element
   ============================================ */

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays */
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
```

---

## Quick Start

1. Copy the **CSS Variables & Global Reset** section into your CSS
2. Add the **Utility Classes** section
3. Copy the component CSS for each section you need
4. Add the **Responsive Media Queries** at the bottom
5. Add the dark class to `<html>` to enable dark mode: `<html class="dark">`

HTML structure follows the component names as class names (e.g., `<header class="header">`, `<section class="hero">`).
