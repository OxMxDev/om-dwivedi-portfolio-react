# 🚀 Om Dwivedi — Developer Portfolio

A modern, high-performance developer portfolio built with **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Features a brutalist-inspired dark aesthetic, dynamic GitHub stats, and interactive animations — designed to showcase full-stack MERN and Data Science expertise.

## ✨ Features

- **Terminal Boot-Up Preloader** — Cinematic typing sequence with "System Ready" reveal (~2.4s, fully unmounts from DOM)
- **Kinetic Typography** — Staggered word-by-word hero animation with spring physics
- **Interactive Code Window** — Syntax-highlighted floating editor displaying Express + MongoDB + TensorFlow code
- **Asymmetrical Bento Grid** — Projects displayed in a modern layout with browser-frame mockups
- **Dynamic GitHub Stats** — Live `public_repos` and `followers` fetched from the GitHub REST API with skeleton loaders and graceful fallback
- **Glassmorphic About Cards** — 4-card modular layout (Engineer, Data Scientist, Credentials timeline, Philosophy)
- **Squishy UI Buttons** — Framer Motion spring-physics `whileTap` deformation on all CTAs
- **Functional Contact Form** — Powered by [Web3Forms](https://web3forms.com) with inline validation and toast notifications
- **Accessibility** — `prefers-reduced-motion` support, WCAG AA contrast, semantic HTML, skip-to-content link, `aria` attributes
- **Core Web Vitals Optimized** — Lazy loading, skeleton loaders for zero CLS, `LazyMotion` for tree-shaking

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Typography** | Outfit (via @fontsource) |
| **Icons** | Remix Icon |
| **Contact** | Web3Forms API |
| **Stats** | GitHub REST API |

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Responsive nav with scroll-aware active states
│   ├── Preloader.jsx     # Terminal boot-up animation
│   ├── Hero.jsx          # Kinetic typography + code window + GitHub stats
│   ├── About.jsx         # Bento grid about cards
│   ├── Projects.jsx      # Asymmetrical project grid with browser mockups
│   ├── Skills.jsx        # Skills section
│   ├── Contact.jsx       # Web3Forms contact form
│   ├── Footer.jsx        # Footer
│   └── SquishyButton.jsx # Reusable spring-physics button
├── styles/
│   └── font.css          # @fontsource imports + base styles
├── assets/               # Project screenshots & images
├── App.jsx               # Root layout + scroll observer + preloader state
├── index.css             # Tailwind + design system CSS variables
└── main.jsx              # Entry point
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/OxMxDev/Portfolio_MERN.git
cd Portfolio_MERN/portfolio

# Install dependencies
npm install

# Create .env file for contact form
echo VITE_WEB3FORMS_ACCESS_KEY=your_key_here > .env

# Start dev server
npm run dev
```

> Get a free Web3Forms access key at [web3forms.com](https://web3forms.com) — just enter your email, no signup required.

## 🌐 Featured Projects

| Project | Description | Live Demo |
|---------|-------------|-----------|
| **ShopSphere** | Full-stack e-commerce with JWT auth, real-time cart, Cloudinary CDN | [Live](https://shop-sphere-frontend-sepia.vercel.app) |
| **Real-Time Chat App** | Socket.io messaging with typing indicators, Zustand state | [Live](https://real-time-chat-application-frontend-tawny.vercel.app) |
| **JobPortal** | Dual-persona recruitment platform with role-based access | [Live](https://job-portal-frontend-z7u1.onrender.com) |

## 📄 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Your Web3Forms access key for the contact form |

## 📬 Contact

- **GitHub**: [@OxMxDev](https://github.com/OxMxDev)
- **LinkedIn**: [Om Dwivedi](https://www.linkedin.com/in/om-dwivedi129/)

---

Built with ☕ and Framer Motion.
