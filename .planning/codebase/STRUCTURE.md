# Codebase Structure

**Analysis Date:** 2026-03-26

## Directory Layout

```
meujeitodeamar/                          # Project root
├── src/                                 # Application source code
│   ├── App.jsx                          # Root router setup
│   ├── main.jsx                         # React DOM entry point
│   ├── components/                      # Reusable UI components
│   │   ├── index.js                     # Barrel export (all components)
│   │   ├── Analytics/                   # Analytics integration component
│   │   ├── Button/                      # Button component + styles
│   │   ├── Input/                       # Input component + styles
│   │   ├── Badge/                       # Badge component + styles
│   │   ├── ProgressBar/                 # Progress bar component + styles
│   │   └── AnswerCard/                  # Quiz answer option card + styles
│   ├── pages/                           # Page-level route components
│   │   ├── LandingPage.jsx              # Home page (route: /)
│   │   ├── QuizB.jsx                    # Quiz flow (route: /quiz/b)
│   │   ├── Resultado.jsx                # Result display (route: /resultado/:estilo)
│   │   ├── Checkout.jsx                 # Payment page (route: /checkout)
│   │   ├── Obrigado.jsx                 # Thank you page (route: /obrigado)
│   │   ├── Privacidade.jsx              # Privacy policy (route: /privacidade)
│   │   ├── Termos.jsx                   # Terms of service (route: /termos)
│   │   └── *.css                        # Page-specific styles
│   ├── data/                            # Static data and algorithms
│   │   ├── questions.js                 # Quiz question definitions (INTRO, TRANSITION, QUESTIONS)
│   │   ├── scoring.js                   # Score calculation algorithm (calcularEstilo)
│   │   ├── results.js                   # Result content mapping (RESULTS, LOCKED_TOPICS, VALID_ESTILOS)
│   │   └── .gitkeep                     # Placeholder
│   └── styles/                          # Global and utility styles
│       ├── tokens.css                   # Design tokens (colors, spacing, typography)
│       ├── global.css                   # Global reset and base styles
│       └── layout.css                   # Layout utilities
├── package.json                         # Dependencies and scripts
├── vite.config.js                       # Vite bundler configuration
├── index.html                           # HTML entry point
└── dist/                                # Build output (generated)
```

## Directory Purposes

**src/:**
- Purpose: All application source code; contains components, pages, data, styles
- Contains: React components, pages, data modules, CSS files
- Key files: `App.jsx`, `main.jsx`, route components, UI components

**src/components/:**
- Purpose: Reusable, single-responsibility UI components
- Contains: Presentation-only components (Button, Input, Badge, ProgressBar, AnswerCard) and integration components (Analytics)
- Key files: `index.js` (barrel export), each component folder with `.jsx` + `.css`

**src/pages/:**
- Purpose: Route-level page components; each maps to a URL path
- Contains: QuizB (multi-step quiz state), Resultado (dynamic result display), marketing pages (Landing, Checkout, Obrigado, Legal)
- Key files: QuizB.jsx, Resultado.jsx, LandingPage.jsx

**src/data/:**
- Purpose: Static quiz content, scoring logic, result definitions
- Contains: Question definitions with 4 blocks × 5 questions, scoring algorithm, result copy templates
- Key files: questions.js, scoring.js, results.js

**src/styles/:**
- Purpose: Global CSS and design system tokens
- Contains: Color tokens (--ansioso, --distante, --seguro, --desorganizado), typography, spacing, layout utilities
- Key files: tokens.css (primary design reference), global.css, layout.css

## Key File Locations

**Entry Points:**
- `src/main.jsx`: React DOM bootstrap; mounts App to #root element
- `src/App.jsx`: BrowserRouter + route registration; imports all page components
- `index.html`: HTML entry point (Vite build target)

**Configuration:**
- `package.json`: Dependencies (React 18, React Router 6, Vite), npm scripts (dev, build, lint)
- `vite.config.js`: Vite setup with React plugin

**Core Logic:**
- `src/components/index.js`: Barrel export for all components (imported by pages as `import { Button, ... } from '../components'`)
- `src/data/questions.js`: INTRO, TRANSITION, QUESTIONS array — quiz content definition
- `src/data/scoring.js`: calcularEstilo() — converts answer array to attachment style
- `src/data/results.js`: RESULTS lookup table, VALID_ESTILOS whitelist, LOCKED_TOPICS — result content

**Testing:**
- Not yet present in codebase (no test files detected)

## Naming Conventions

**Files:**
- Page components: PascalCase (e.g., `QuizB.jsx`, `Resultado.jsx`, `LandingPage.jsx`)
- Utility/data files: camelCase (e.g., `scoring.js`, `questions.js`)
- Component folders: PascalCase matching export name (e.g., `Button/`, `AnswerCard/`)
- CSS files: Match their component or page (e.g., `Button.css`, `QuizB.css`)
- Barrel exports: `index.js`

**Directories:**
- Plural for collections: `components/`, `pages/`, `styles/`
- Singular for singular purpose: `data/`

**JavaScript Identifiers:**
- Functions: camelCase (e.g., `calcularEstilo`, `handleAnswer`, `loadState`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `STORAGE_KEY`, `INTRO`, `QUESTIONS`, `RESULTS`)
- React component names: PascalCase (e.g., `QuizB`, `Button`, `Analytics`)
- CSS classes: kebab-case with BEM-like nesting (e.g., `btn`, `btn--primary`, `btn__spinner`)

## Where to Add New Code

**New Feature (page or flow):**
- Primary code: `src/pages/{FeatureName}.jsx` for page-level logic, `src/pages/{FeatureName}.css` for styles
- Tests: Not yet established (no test structure present)
- Router: Add route to `src/App.jsx` Routes array
- Data: If feature needs static content, add to `src/data/` (e.g., `src/data/feature-content.js`)

**New Component/Module:**
- Implementation: `src/components/{ComponentName}/{ComponentName}.jsx` + `src/components/{ComponentName}/{ComponentName}.css`
- Export: Add to `src/components/index.js` barrel export
- Usage: Import from `src/components` in pages (e.g., `import { ComponentName } from '../components'`)

**Utilities (shared helpers):**
- Shared helpers: `src/data/` if domain-specific (quiz scoring, data transformation) or create `src/utils/` for general utilities
- Pure functions: No dependencies on React; focus on data transformation (e.g., scoring algorithm)

## Special Directories

**src/components/:**
- Purpose: Reusable presentation components only
- Generated: No
- Committed: Yes

**src/pages/:**
- Purpose: Route-level page components
- Generated: No
- Committed: Yes

**src/data/:**
- Purpose: Static quiz content and algorithms
- Generated: No (authored by product team and developers)
- Committed: Yes

**src/styles/:**
- Purpose: CSS design tokens and global styles
- Generated: No
- Committed: Yes

**dist/:**
- Purpose: Built JavaScript/CSS bundles
- Generated: Yes (by Vite `npm run build`)
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-03-26*
