# Architecture

**Analysis Date:** 2026-03-26

## Pattern Overview

**Overall:** Client-side Single Page Application (SPA) with component-based UI and route-driven navigation.

**Key Characteristics:**
- React 18 with functional components and hooks
- React Router v6 for client-side routing
- Declarative, stateless component composition
- Quiz/questionnaire domain with multi-step progression
- localStorage-based session state persistence
- Static result content mapping

## Layers

**Presentation Layer (Pages & Components):**
- Purpose: UI rendering, user interaction, visual presentation
- Location: `src/pages/`, `src/components/`
- Contains: Page-level components (QuizB, Resultado, LandingPage), reusable UI components (Button, Input, Badge, ProgressBar, AnswerCard)
- Depends on: React Router for navigation, local data from `src/data/`, components from barrel export
- Used by: App root, interacted with by users through the browser

**Data & Logic Layer:**
- Purpose: Quiz question definitions, scoring algorithms, result content mapping, static question data
- Location: `src/data/` (questions.js, scoring.js, results.js)
- Contains: Question definitions with multi-block structure, option-to-style mappings, result headlines/copy, priority tiebreaker logic
- Depends on: Nothing (pure data and algorithms)
- Used by: QuizB page (questions, scoring), Resultado page (results display)

**Routing & Entry Point:**
- Purpose: Application bootstrap, route registration, global layout
- Location: `src/App.jsx` (router configuration), `src/main.jsx` (React DOM mount)
- Contains: Route definitions, Analytics component wrapper, BrowserRouter setup
- Depends on: React Router, page components, Analytics
- Used by: Browser entry point (index.html)

**Styling Layer:**
- Purpose: Global styles, design tokens, layout utilities, component-scoped CSS
- Location: `src/styles/` (tokens.css, global.css, layout.css), component-scoped .css files
- Contains: CSS custom properties (--ansioso, --distante, --seguro, --desorganizado color tokens), reset styles, component-specific styles
- Depends on: Nothing (pure CSS)
- Used by: All pages and components

**Utility Components:**
- Purpose: Cross-cutting concerns and analytics
- Location: `src/components/Analytics/`
- Contains: Analytics integration (unspecified provider)
- Depends on: React
- Used by: App root (renders on all routes)

## Data Flow

**Quiz Start → Answer → Result Display:**

1. User lands on LandingPage (route: `/`)
2. User navigates to QuizB (route: `/quiz/b`)
3. QuizB displays intro screen with INTRO copy
4. User clicks "Estou pronta. Vamos lá"
5. QuizB transitions to question screen
6. User selects answer option (A/B/C/D) for current question
7. handleAnswer callback records answer in answers state array
8. After 400ms delay (for visual feedback), question index advances
9. When all 20 questions answered, TRANSITION screen displays (4000ms delay)
10. calcularEstilo() algorithm processes answers array → determines estilo (attachment style)
11. useNavigate() redirects to `/resultado/{estilo}`
12. Resultado component loads result content from RESULTS[estilo]
13. Result displays headline, intro copy, locked content teaser
14. User can navigate to Checkout or view Privacy/Terms pages

**State Management:**
- Quiz progress: `[screen, currentIndex, answers, selecting]` local state in QuizB
- Session persistence: localStorage (STORAGE_KEY = 'mjda_quiz_state') stores: `{ started, currentIndex, answers }`
- Recovery: loadState() on component mount restores interrupted quiz
- Global: No global state manager (Redux, Zustand, etc.) — all state is local to pages

## Key Abstractions

**Quiz Question Structure:**
- Purpose: Represents a single survey question with 4 attachment-style options
- Examples: `src/data/questions.js` QUESTIONS array, each question object
- Pattern: `{ id: number, text: string, options: [{ id: 'A'|'B'|'C'|'D', text: string }] }`

**Scoring Algorithm:**
- Purpose: Aggregates answers to determine dominant attachment style
- Examples: `src/data/scoring.js` → calcularEstilo()
- Pattern: Count each style (A→ansioso, B→distante, C→seguro, D→desorganizado), find max, apply tiebreaker priority

**Result Content Mapping:**
- Purpose: Immutable lookup table from estilo to rich result content (headline, body, locked copy)
- Examples: `src/data/results.js` → RESULTS object keys: ansioso, distante, seguro, desorganizado
- Pattern: Object-keyed content; VALID_ESTILOS whitelist for route validation

**Reusable Components:**
- Purpose: Composable UI primitives used across pages
- Examples: `src/components/Button/`, `src/components/AnswerCard/`, `src/components/ProgressBar/`
- Pattern: Props-based configuration (variant, disabled, loading states), CSS class name composition, semantic HTML

## Entry Points

**Browser Entry:**
- Location: `src/main.jsx`
- Triggers: Document ready (Vite/browser loads index.html)
- Responsibilities: Mount React app to DOM element with id="root", load global CSS, enable StrictMode

**Application Root:**
- Location: `src/App.jsx`
- Triggers: React render from main.jsx
- Responsibilities: Initialize BrowserRouter, register all routes, render Analytics component globally

**Quiz Entry:**
- Location: `src/pages/QuizB.jsx`
- Triggers: Route match on `/quiz/b`
- Responsibilities: Manage quiz flow state, handle answer selection, calculate results, redirect on completion

**Result Display:**
- Location: `src/pages/Resultado.jsx`
- Triggers: Route match on `/resultado/:estilo`
- Responsibilities: Validate estilo param, retrieve result content, render headline + body + locked content

## Error Handling

**Strategy:** Minimal error handling; assumes happy path in most cases. Graceful degradation for localStorage.

**Patterns:**
- localStorage failures: Wrapped in try-catch, silently falls back to in-memory state only (no persistence)
- Invalid result routes: Redirect to home (`/`) via useEffect + navigate with replace
- Missing result data: Guard returns null (React renders nothing)
- Answer selection: Select flag prevents double-click submission during 400ms feedback delay

## Cross-Cutting Concerns

**Logging:** No explicit logging framework. Analytics component handles telemetry (provider unspecified).

**Validation:** Route params validated in Resultado via VALID_ESTILOS whitelist; estilo must be one of 4 attachment styles.

**Authentication:** Not applicable — public quiz, no user accounts.

**Accessibility:** Semantic HTML buttons, aria-pressed state on AnswerCard selections, aria-label on question lists.

---

*Architecture analysis: 2026-03-26*
