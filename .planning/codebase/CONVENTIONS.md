# Coding Conventions

**Analysis Date:** 2026-03-26

## Naming Patterns

**Files:**
- Component files: PascalCase with file extension (e.g., `Button.jsx`, `AnswerCard.jsx`)
- Page files: PascalCase (e.g., `LandingPage.jsx`, `QuizB.jsx`, `Resultado.jsx`)
- Style files: Match component name (e.g., `Button.css`, `QuizB.css`)
- Utility/data files: camelCase (e.g., `scoring.js`, `questions.js`, `results.js`)
- State persistence keys: SCREAMING_SNAKE_CASE (e.g., `STORAGE_KEY`)

**Functions:**
- React components: PascalCase for exported components
- Helper/utility functions: camelCase (e.g., `calcularEstilo`, `loadState`, `saveState`, `clearState`, `injectScript`, `injectInlineScript`, `handleAnswer`, `handleStart`)
- Functions handling state operations: prefixed with verb (e.g., `loadState()`, `saveState()`, `clearState()`, `getCheckoutUrl()`)

**Variables:**
- State variables: camelCase (e.g., `answers`, `currentIndex`, `screen`, `selecting`, `saved`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `STORAGE_KEY`, `QUESTIONS`, `INTRO`, `TRANSITION`, `PRICE_BASE`, `CHECKOUT_URLS`)
- Props destructuring: camelCase with consistent naming across similar components
- Data structures: camelCase keys (e.g., `{ started, currentIndex, answers }`)

**Types/Interfaces:**
- CSS classes: kebab-case with BEM-like pattern (e.g., `quiz__header`, `btn--primary`, `field__input--error`, `btn__spinner`)
- CSS custom properties: prefixed with component context (e.g., `--color-token` used inline as `colorToken` prop)
- ARIA labels: Human-readable Portuguese strings (e.g., "Opções de resposta", "Conteúdo bloqueado")

## Code Style

**Formatting:**
- No formal formatter configured (no `.prettierrc`, no `eslint` config file)
- Implicit style conventions observed:
  - 2-space indentation
  - Single quotes preferred in JSX attributes and strings
  - Props spread operator used for forward compatibility (`...props`)
  - Component bodies are compact, favoring single logical functions

**Linting:**
- ESLint 9.13.0 with:
  - `eslint-plugin-react` (7.37.2)
  - `eslint-plugin-react-hooks` (5.0.0)
  - `eslint-plugin-react-refresh` (0.4.14)
- Command: `npm run lint` (applies to `.js` and `.jsx` files, max warnings: 0, unused disable directives reported)
- No `.eslintrc` config file present — uses default ESLint 9 behavior
- All lint violations must be fixed before commits

## Import Organization

**Order:**
1. External libraries (React, React Router, etc.)
2. Internal components (from `../components`)
3. Internal data/utilities (from `../data`)
4. Style imports (always last in the file, using relative imports like `'./Button.css'`)

**Path Aliases:**
- No path aliases configured
- Relative imports used throughout (e.g., `import { QUESTIONS } from '../data/questions'`)
- Barrel exports used for components: `src/components/index.js` exports all component functions

**Example from `src/pages/QuizB.jsx`:**
```javascript
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ProgressBar, AnswerCard } from '../components'
import { QUESTIONS, INTRO, TRANSITION } from '../data/questions'
import { calcularEstilo } from '../data/scoring'
import './QuizB.css'
```

## Error Handling

**Patterns:**
- Silent error suppression in localStorage operations (try-catch without logging):
  ```javascript
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }
  ```
- No error logging or user-facing error messages for storage failures
- Functions return sensible defaults (null, empty array, etc.) on error
- Script injection includes idempotency check before appending to DOM:
  ```javascript
  function injectScript(src, id, onLoad) {
    if (document.getElementById(id)) return
    // ... script injection logic
  }
  ```

**No defensive validation:**
- Routes assume valid URL parameters (e.g., `useParams()` estilo not validated until render-time redirect)
- Data structures trusted to have expected shape (e.g., `QUESTIONS[currentIndex]` accessed without bounds checking)
- Component prop validation relies on React's runtime checks, no PropTypes or TypeScript

## Logging

**Framework:** `console` object (browser environment)

**Patterns:**
- No console logging found in source code
- Error handling uses silent failures instead of logging
- All external script injections and initialization happen without logging output
- Component render logic is declarative without debug logging

## Comments

**When to Comment:**
- Inline comments used to mark sections in Analytics component (e.g., `// ── GA4 ──────────────────────────────────────────`)
- JSDoc-style comments for utility functions:
  ```javascript
  /**
   * Calcula o estilo de apego dominante a partir das respostas.
   * @param {string[]} answers - Array de 20 letras (A/B/C/D), uma por pergunta
   * @returns {'ansioso'|'distante'|'seguro'|'desorganizado'}
   */
  export function calcularEstilo(answers) { ... }
  ```
- Portuguese comments explaining non-obvious behavior:
  ```javascript
  // storage indisponível — continua sem persistência
  // bloqueia duplo clique
  // Avança após 400ms (feedback visual antes de trocar)
  ```

**JSDoc/TSDoc:**
- Minimal JSDoc usage
- Only essential function signatures documented with `@param` and `@returns`
- No TypeScript, so type annotations in comments only

## Function Design

**Size:**
- Small, focused functions preferred
- Event handlers (`handleStart`, `handleAnswer`) typically 5-25 lines
- Utility functions (`calcularEstilo`, `loadState`) typically 10-15 lines
- Page/component render logic can be 80+ lines when handling multiple screen states

**Parameters:**
- Destructuring used for component props:
  ```javascript
  export function Button({
    children,
    variant = 'primary',
    loading = false,
    disabled = false,
    onClick,
    type = 'button',
    ...props
  }) { ... }
  ```
- Default values provided in destructuring
- Rest operator (`...props`) used to forward unhandled attributes
- Callback functions passed as prop functions (e.g., `onClick={() => handleAnswer(opt.id)}`)

**Return Values:**
- Components return JSX elements or `null`
- Utility functions return primitives or objects (e.g., `calcularEstilo()` returns string, `loadState()` returns object or null)
- Event handlers typically return undefined (side effects only)
- Conditional returns used for state-based rendering:
  ```javascript
  if (screen === 'intro') {
    return ( /* intro JSX */ )
  }
  if (screen === 'transition') {
    return ( /* transition JSX */ )
  }
  return ( /* question JSX */ )
  ```

## Module Design

**Exports:**
- Named exports for utility functions:
  ```javascript
  export function calcularEstilo(answers) { ... }
  export function Button({ ... }) { ... }
  ```
- Default exports for page components:
  ```javascript
  export default function QuizB() { ... }
  ```
- Barrel file (`src/components/index.js`) uses named exports for component library:
  ```javascript
  export { Analytics } from './Analytics/Analytics'
  export { Button } from './Button/Button'
  // ... etc
  ```

**Barrel Files:**
- Used in `src/components/index.js` to centralize component exports
- Enables cleaner imports: `import { Button, ProgressBar } from '../components'` instead of `from '../components/Button/Button'`
- No barrel files in data or pages directories

**Module Cohesion:**
- Each component owns its styling (e.g., `Button.jsx` and `Button.css` in same directory)
- Data organized by purpose (e.g., `questions.js`, `scoring.js`, `results.js`)
- Pages handle routing and complex state management; components handle UI rendering

## React-Specific Patterns

**Hooks Usage:**
- `useState` for simple state (e.g., screen state, current index, answers array)
- `useEffect` for side effects and persistence (e.g., saving quiz state to localStorage)
- `useCallback` for memoized callbacks with dependency arrays:
  ```javascript
  const handleAnswer = useCallback((optionId) => {
    if (selecting) return
    // ... handler logic
  }, [answers, currentIndex, selecting, navigate])
  ```
- `useNavigate` from react-router-dom for programmatic navigation
- `useParams` from react-router-dom for accessing route parameters

**Props Pattern:**
- Props destructuring at function signature
- Default prop values in destructuring
- Spread operator for unhandled props forwarding
- No prop drilling avoidance strategy (no context API, Redux, or state management library)

**Accessibility (a11y):**
- ARIA attributes used appropriately:
  - `aria-label` for interactive elements and groups
  - `aria-pressed` for button toggle state
  - `aria-invalid` and `aria-describedby` for form validation
  - `aria-live="polite"` for dynamic content updates
  - `aria-hidden="true"` for decorative elements
- Semantic HTML (e.g., `<button>`, `<label>`, `<input>`, `<fieldset>`)
- Text labels associated with form inputs via `htmlFor` attribute

**Rendering Patterns:**
- Conditional rendering using `&&` and ternary operators:
  ```javascript
  {label && <label>...</label>}
  {error && <span>...</span>}
  className={`field__input${error ? ' field__input--error' : ''}`}
  ```
- Array mapping for list rendering with `key` prop:
  ```javascript
  {question.options.map((opt) => (
    <AnswerCard key={opt.id} ... />
  ))}
  ```
- Filter used to build class lists:
  ```javascript
  className={[
    'answer-card',
    selected && 'answer-card--selected',
    disabled && 'answer-card--disabled',
  ].filter(Boolean).join(' ')}
  ```

---

*Convention analysis: 2026-03-26*
