# Parchai

<div align="center">

**You don't need advice. You need clarity.**

A premium dark-themed single-page application for 1-on-1 clarity sessions helping people navigate life and career decisions.

[Live Demo](#) • [Book a Session](https://forms.gle/nFpEEZSKGkfwhkNm6)

</div>

---

## 🌟 Overview

Parchai is a modern, premium web application designed to help people find clarity in their life and career decisions through personalized 1-on-1 sessions. Built with React and featuring a stunning dark theme with glowing blue accents, the application provides an immersive and professional user experience.

### Key Features

- ✨ **Premium Dark Theme** - Deep navy/black background with bright blue accents and glowing effects
- 🎨 **3D Animated Navigation** - Bold navbar links with perspective transforms and smooth animations
- 💎 **Glassmorphic Design** - Dark semi-transparent cards with backdrop blur effects
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- ♿ **Accessible** - WCAG AA compliant with semantic HTML and ARIA labels

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Parchai

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

---

## 📁 Project Structure

```
parchai/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   ├── logo-full.png
│   └── founder.jpg
├── src/
│   ├── components/
│   │   ├── Hero.jsx              # Hero section with CTA
│   │   ├── HowItWorks.jsx        # 4-step process
│   │   ├── WhyItMatters.jsx      # Value propositions
│   │   ├── WhoIsItFor.jsx        # Target personas
│   │   ├── TryForFree.jsx        # Early access CTA
│   │   ├── Contact.jsx           # Contact information
│   │   ├── Founder.jsx           # About the founder
│   │   ├── Navbar.jsx            # Navigation with 3D effects
│   │   └── ScrollReveal.jsx      # Scroll animation wrapper
│   ├── ui/
│   │   ├── Button.jsx            # Reusable button component
│   │   └── SectionTitle.jsx      # Section heading component
│   ├── styles/
│   │   └── globals.css           # Global styles and theme
│   ├── App.jsx                   # Main application
│   └── main.jsx                  # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Design System

### Color Palette

```css
/* Dark Theme */
--color-bg-premium: #020617;      /* Deep navy/black */
--color-bg-subtle: #0f172a;       /* Slightly lighter navy */
--color-bg-card: rgba(15, 23, 42, 0.6);  /* Glassmorphic cards */

/* Text */
--color-white: #FFFFFF;           /* Primary text */
--color-grey-400: #94a3b8;        /* Secondary text */
--color-grey-600: #475569;        /* Muted text */

/* Accent */
--color-accent: #3b82f6;          /* Bright blue */
--color-accent-light: #60a5fa;    /* Light blue */
--color-accent-glow: rgba(59, 130, 246, 0.5);  /* Glow effect */
```

### Typography

- **Font Family:** Inter (Google Fonts)
- **H1:** 48-72px (responsive, bold)
- **H2:** 36-48px (responsive, bold)
- **Body:** 17px base, 1.7 line-height

### Visual Effects

- **Glassmorphism:** Semi-transparent backgrounds with `backdrop-filter: blur(12px)`
- **Glow Effects:** Box shadows with blue accent color
- **3D Transforms:** Perspective and rotation on navbar links
- **Smooth Animations:** Cubic-bezier easing for premium feel

---

## 🧩 Components

### Page Sections (in order)

1. **Hero** - Main headline with glowing CTA button
2. **How It Works** - 4-step process with numbered badges
3. **Why Parchai** - 4 value propositions in glassmorphic cards
4. **Stories** - 5 persona cards showing who it's for
5. **Try For Free** - Early access CTA section
6. **Contact** - Email, WhatsApp, and social links
7. **About Founder** - Founder bio with photo and quote
8. **Footer** - Company info, resources, and legal links

### UI Components

- **Button** - Glowing blue button with hover effects
- **SectionTitle** - Centered heading with blue accent line
- **Navbar** - Fixed navigation with 3D animated links
- **ScrollReveal** - Fade-in animation wrapper for sections

---

## 🔧 Configuration

### Google Form Integration

The booking form is already configured at:
```javascript
// src/components/Hero.jsx, TryForFree.jsx, Navbar.jsx
const GOOGLE_FORM_URL = "https://forms.gle/nFpEEZSKGkfwhkNm6"
```

### Contact Information

Update contact details in `src/components/Contact.jsx`:
```javascript
const EMAIL = "hello@parchai.com"
const WHATSAPP_LINK = "https://wa.me/YOUR_NUMBER"
const INSTAGRAM_LINK = "https://instagram.com/parchai"
const LINKEDIN_LINK = "https://linkedin.com/company/parchai"
```

### Analytics (Optional)

Add tracking scripts in:
- `index.html` - Google Tag Manager in `<head>`
- `src/App.jsx` - Analytics initialization

---

## 📱 Responsive Design

Breakpoints:
- **Mobile:** 360px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

Mobile-first approach with CSS Grid and Flexbox for flexible layouts.

---

## ♿ Accessibility

- ✅ Semantic HTML5 elements
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ ARIA labels on interactive elements
- ✅ High contrast text (white on dark)
- ✅ Keyboard navigation support
- ✅ Alt text for all images
- ✅ Focus states for interactive elements

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` folder with optimized static files

### Deployment Platforms

**Vercel** (Recommended)
```bash
npm i -g vercel
vercel --prod
```

**Netlify**
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

**GitHub Pages**
```bash
npm run build
# Deploy dist/ to gh-pages branch
```

**Other Static Hosts**
- Upload contents of `dist/` folder to any static hosting service

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Vanilla CSS** - Custom styling with CSS variables
- **Google Fonts** - Inter font family

### Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.8"
}
```

---

## 🎯 Performance

- ⚡ **Fast Load Times** - Optimized bundle size
- 🎨 **Smooth Animations** - Hardware-accelerated CSS transforms
- 📦 **Code Splitting** - Vite's automatic optimization
- 🖼️ **Optimized Assets** - Compressed images and fonts

---

## 🔐 SEO

- ✅ Semantic HTML structure
- ✅ Meta tags for social sharing (Open Graph)
- ✅ Descriptive title and meta description
- ✅ Proper heading hierarchy
- ✅ Fast page load times

---

## 📄 License

© 2025 Parchai — All rights reserved.

---

## 🤝 Support

For questions or support:
- **Email:** hello@parchai.com
- **Book a Session:** [Google Form](https://forms.gle/nFpEEZSKGkfwhkNm6)

---

## 👨‍💻 About

Built by **Chaman**, founder of Parchai - a final-year student, builder, and clarity-obsessed founder creating genuine emotional clarity for people's lives.

---

<div align="center">

**Built with clarity. 🌑**

</div>
