# Frontend UI Design System (Reference Style Guide)

> **Purpose**
> This document defines the visual, interaction, and layout language inspired by the provided reference UIs. It is intended to be used as **context for AI models (e.g., Antigravity / Opus 4.6)** so that all generated frontends follow a consistent, human-crafted, premium aesthetic.

---

## 1. Overall Design Philosophy

- Dark-first, cinematic, high-contrast UI
- Human-crafted, editorial feel — **never playful or cartoony**
- Calm confidence > loud marketing
- Interfaces should feel *engineered*, not decorated
- Visual hierarchy is created through **scale, spacing, and contrast**, not color overload

Core adjectives:
- Cinematic
- Minimal
- Intelligent
- Serious
- Premium

---

## 2. Color System

### 2.1 Base Palette

**Dark Mode (Primary)**
- Background Primary: `#0A0A0B` to `#0E0F12`
- Background Secondary: `#121318`
- Surface / Panels: `#15171C`
- Elevated Surface: `#1A1D23`

**Light Mode (Secondary, optional)**
- Background: `#F6F6F2`
- Surface: `#FFFFFF`
- Borders: `#E5E5E0`

### 2.2 Text Colors

- Primary Text: `#FFFFFF` (never pure white on large areas; slightly softened with opacity if needed)
- Secondary Text: `rgba(255,255,255,0.65)`
- Muted Text: `rgba(255,255,255,0.45)`
- Light-mode Primary Text: `#121212`
- Light-mode Secondary Text: `#555555`

### 2.3 Accent Colors (Use Sparingly)

- Neutral Accent: `#9CA3AF` (icons, dividers)
- Cool Accent: `#6EE7B7` or `#5EEAD4`
- Warm Accent (data viz / focal visuals only): `#F97316`, `#FB923C`, `#EF4444`

**Rules:**
- Max **1 accent color per screen**
- Accents indicate *meaning* (action, status), never decoration

---

## 3. Typography System

### 3.1 Font Families

Preferred:
- `Inter`
- `SF Pro Display`
- `Geist`

Fallback:
- `system-ui`, `-apple-system`, `BlinkMacSystemFont`

### 3.2 Heading Style

- Large, bold, editorial
- Tight tracking
- Calm presence

Example:
- H1: 48–64px, font-weight 500–600, letter-spacing `-0.02em`
- H2: 36–44px, font-weight 500
- H3: 24–28px, font-weight 500

### 3.3 Body Text

- Size: 15–17px
- Line height: 1.5–1.65
- No heavy weights for body text

### 3.4 Typography Rules

- No more than **2 font families total**
- No decorative fonts
- No gradient text except rare hero emphasis
- Text should feel *typeset*, not default

---

## 4. Layout & Spacing

### 4.1 Grid & Width

- Max content width: **1200–1280px**
- Generous outer padding: 64–96px (desktop)
- Sections are clearly separated by vertical rhythm

### 4.2 Spacing Scale

Use an 8px base system:
- XS: 8px
- S: 16px
- M: 24px
- L: 40px
- XL: 64px
- XXL: 96px+

### 4.3 Composition Rules

- Avoid perfectly centered layouts everywhere
- Prefer **left-aligned content with visual counterweight**
- Hero sections should breathe — never crowded

---

## 5. Components

### 5.1 Navigation

- Minimal, low-height
- Transparent or subtle background blur
- Text links over buttons (except primary CTA)

### 5.2 Buttons

**Primary Button**
- Background: Near-black or white (depending on mode)
- Border-radius: 10–12px
- Padding: 12px 20px
- Font-weight: 500

**Hover Behavior**
- Subtle brightness or background shift
- No scale-up
- No glow unless explicitly cinematic

### 5.3 Cards & Panels

- Soft edges (radius 12–16px)
- Low-contrast borders or shadows
- Depth through layering, not heavy shadows

### 5.4 Dashboards / Data UI

- Dark surfaces
- Clear grouping
- Charts use muted grids and soft lines
- Numbers are the visual focus, not chart chrome

---

## 6. Motion & Interaction

### 6.1 Timing

- Duration: 200–400ms
- Ease: `cubic-bezier(0.4, 0, 0.2, 1)`

### 6.2 Animation Philosophy

- Motion explains state changes
- Scroll animations only if meaningful
- Avoid gimmicks (parallax-for-the-sake-of-it)

### 6.3 Hover & Focus

- Opacity shifts
- Subtle translation (1–2px max)
- Clear focus rings for accessibility

---

## 7. Imagery & Visuals

### 7.1 Hero Visuals

- Cinematic imagery
- Abstract 3D, particle fields, scientific visuals
- High contrast, controlled noise/grain

### 7.2 Human Subjects

- Realistic silhouettes or authentic humans
- Avoid mannequin-like or stock-photo poses
- Often small in frame to emphasize scale

### 7.3 Background Treatments

- Gradients are soft and atmospheric
- Noise/grain is subtle and intentional
- Dark vignette allowed

---

## 8. Data Visualization

- Dark UI-friendly charts
- Accent color for key metric only
- Labels are minimal
- Gridlines are barely visible

---

## 9. Accessibility

- Contrast ratio ≥ WCAG AA
- Font sizes never below 14px
- Click targets ≥ 40px

---

## 10. Anti-Patterns (STRICTLY AVOID)

- Overused neon gradients
- Excessive glow effects
- Glassmorphism by default
- Perfectly centered everything
- Cheap futuristic HUD UI
- Emoji usage in UI
- Stock illustration packs

---

## 11. Usage Instruction for AI Models

When generating UI:

> “Follow the `frontend_ui.md` design system strictly. Do not introduce new visual styles, colors, or components outside this document. The UI must feel cinematic, minimal, and human-crafted — not AI-generated.”

---

**End of Design System**