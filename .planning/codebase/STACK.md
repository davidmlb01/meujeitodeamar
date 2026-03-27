# Technology Stack

**Analysis Date:** 2026-03-26

## Languages

**Primary:**
- JavaScript/JSX - React component implementation and client-side logic
- CSS - Styling (Global, component, and layout styles)

## Runtime

**Environment:**
- Node.js (18+) - Development and build

**Package Manager:**
- npm - Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.3.1 - UI framework for component-based SPA
- React DOM 18.3.1 - DOM rendering for React

**Routing:**
- React Router DOM 6.27.0 - Client-side routing and navigation

**Build/Dev:**
- Vite 5.4.10 - Build tool and dev server
  - Plugin: @vitejs/plugin-react 4.3.3 - React JSX support
  - Config: `vite.config.js`

**Code Quality:**
- ESLint 9.13.0 - Linting
  - Plugin: eslint-plugin-react 7.37.2 - React-specific linting rules
  - Plugin: eslint-plugin-react-hooks 5.0.0 - React Hooks linting
  - Plugin: eslint-plugin-react-refresh 0.4.14 - Fast Refresh validation

**Testing:**
- Not detected in current stack

## Key Dependencies

**Critical:**
- React 18.3.1 - Core UI rendering
- React Router DOM 6.27.0 - Navigation and routing between pages
- Vite 5.4.10 - Build system and dev server with HMR

**Infrastructure:**
- @vitejs/plugin-react 4.3.3 - React JSX transformation during build
- @types/react 18.3.12 - TypeScript types for React (dev only)
- @types/react-dom 18.3.1 - TypeScript types for React DOM (dev only)

## Configuration

**Environment:**
- `.env` file present - Environment configuration
- `.env.example` file present - Configuration template
- `.env.local` file present - Local development overrides
- Environment variables via `import.meta.env` in Vite

**Build:**
- `vite.config.js` - Vite build configuration with React plugin
- `package.json` - Project metadata and scripts

**Deployment:**
- `vercel.json` - Vercel deployment configuration with SPA rewrites

## Platform Requirements

**Development:**
- Node.js 18 or higher
- npm 9+ (based on package-lock.json version)
- Modern web browser (no IE support required)

**Production:**
- Vercel (static hosting for SPA)
- HTTPS required for external service integrations

## Key Scripts

```bash
npm run dev              # Start Vite dev server with HMR
npm run build            # Build optimized production bundle
npm run preview          # Preview production build locally
npm run lint             # Run ESLint on all JS/JSX files
```

## Build Output

- Build tool: Vite
- Output directory: `dist/`
- Module type: ES modules (`"type": "module"` in package.json)
- Target: Modern browsers with ES2020+ support

## Type System

**TypeScript:**
- Not used in source code (JSX via React plugin)
- Type definitions installed for development (`@types/react`, `@types/react-dom`)
- Suggests gradual migration to TypeScript is possible

---

*Stack analysis: 2026-03-26*
