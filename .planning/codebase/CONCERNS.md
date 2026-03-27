# Codebase Concerns

**Analysis Date:** 2026-03-26

## Tech Debt

**Hardcoded Payment URLs:**
- Issue: Multiple payment gateway URLs hardcoded in components instead of centralized configuration
- Files: `src/pages/Checkout.jsx` (lines 32-37), `src/pages/Obrigado.jsx` (lines 14-18)
- Impact: Changes to payment URLs require code modifications and redeployment. Creates consistency risk if URLs become desynchronized. Violates environment-driven configuration principles.
- Fix approach: Move all Kiwify URLs to environment variables (VITE_CHECKOUT_BASE, VITE_CHECKOUT_OB1, VITE_CHECKOUT_OB2, VITE_CHECKOUT_OB1OB2, VITE_UPSELL_CHECKOUT). Reference these consistently across codebase.

**Missing Test Coverage:**
- Issue: Zero test files present in project
- Files: No `*.test.js`, `*.spec.js`, or test directory found
- Impact: No automated validation of quiz logic, scoring calculations, or component behavior. Regressions go undetected. State persistence logic untested.
- Fix approach: Add Jest or Vitest configuration. Write unit tests for: (1) `calcularEstilo()` scoring logic with edge cases, (2) localStorage state management in QuizB, (3) AnswerCard and Button components, (4) Analytics injection logic.

**No TypeScript:**
- Issue: Project uses JavaScript throughout instead of TypeScript, despite having @types/react dependencies
- Files: All `.jsx` and `.js` files
- Impact: No type safety on props, state, or API integrations. Props passed to components lack documentation and validation. Silent bugs possible at runtime.
- Fix approach: Migrate to TypeScript incrementally. Start with components (`src/components/**/*.tsx`), then pages, then data files. This will require renaming, adding tsconfig.json, and updating eslint config.

**Missing ESLint Configuration:**
- Issue: ESLint installed but no `.eslintrc` file present (no visible config found)
- Files: Root directory lacks config file
- Impact: Linting rules undefined. `npm run lint` behavior depends on default ESLint. No custom rules enforced for project conventions.
- Fix approach: Create `.eslintrc.cjs` with React-specific rules (react/prop-types, react-hooks/rules-of-hooks), import ordering, and naming conventions. Add pre-commit hook to enforce linting.

## Known Bugs

**Analytics Script Injection Race Condition:**
- Symptoms: Third-party scripts (GA4, TikTok, Clarity) may not load if page navigates too quickly. Analytics data lost if user leaves before scripts initialize.
- Files: `src/components/Analytics/Analytics.jsx` (lines 26-55)
- Trigger: User completes quiz and navigates to `/resultado/:estilo` immediately after analytics component mounts
- Workaround: Scripts have `async` flag so they load independently, but there's no guarantee they've initialized before navigation
- Fix approach: Add onload callbacks that set window flags (e.g., `window._analyticsReady`). In Resultado page, add `useEffect` that waits for flag before allowing checkout navigation. Or use MutationObserver to detect script tags in DOM.

**LocalStorage State Persistence Bug:**
- Symptoms: Quiz state persists between sessions even if user refreshes midway. User can resume partial progress indefinitely, creating stale state.
- Files: `src/pages/QuizB.jsx` (lines 10-31, 43-47)
- Trigger: Complete quiz to question 15, refresh browser, navigate back to quiz. LocalStorage persists answers for 15 questions. Logout/login with different user shows wrong person's progress.
- Workaround: User must manually clear browser storage or accept continuing previous progress
- Fix approach: (1) Add quiz session timeout (clear state after 24 hours), (2) Add "Start Over" button that explicitly calls clearState(), (3) Clear state on logout or account switch, (4) Bind state to user ID if auth exists later.

**Default Payment URL Fallback Issue:**
- Symptoms: Payment links fail if environment variables not configured
- Files: `src/pages/Obrigado.jsx` (lines 15-17) — provides hardcoded fallback URL "Rf1DTRA"
- Trigger: Environment variable VITE_KIWIFY_UPSELL_ID not set in deployment
- Workaround: Fallback uses specific static URL, but this may be outdated or incorrect
- Fix approach: (1) Remove hardcoded fallback URLs or document their purpose clearly with expiry dates, (2) Add validation that env vars are loaded before render, (3) Show error message if config missing instead of silently using wrong URL.

## Security Considerations

**Exposure of Kiwify Payment URLs in Source Code:**
- Risk: Payment URLs are hardcoded public strings that could be modified if repository is compromised. If Kiwify links are proprietary product codes, they're now visible to anyone.
- Files: `src/pages/Checkout.jsx` (lines 32-37), `src/pages/Obrigado.jsx` (line 17)
- Current mitigation: URLs are non-sensitive (redirect to Kiwify payment page), no API keys or secrets stored alongside
- Recommendations: (1) Move all payment URLs to environment variables, (2) Consider if product IDs should be private (they link to specific offers), (3) Add Content Security Policy (CSP) header to restrict external script loading to known domains (analytics.tiktok.com, googletagmanager.com, clarity.ms).

**Third-Party Script Injection Without Integrity Checks:**
- Risk: GA4, TikTok Pixel, and Clarity scripts are injected directly without Subresource Integrity (SRI) hashes. If CDN is compromised, malicious scripts execute.
- Files: `src/components/Analytics/Analytics.jsx` (lines 29, 44, 51-52)
- Current mitigation: Scripts loaded from official CDNs (googleapis, tiktok, clarity.ms), async flag prevents render blocking
- Recommendations: (1) Add SRI hashes to external script URLs, (2) Implement Content Security Policy (CSP) with script-src directives, (3) Add script load error handling and fallback, (4) Audit analytics dependencies quarterly for updates.

**No Input Validation on Quiz Answers:**
- Risk: Quiz answers stored directly in localStorage without validation. Malicious user could modify localStorage to inject invalid data.
- Files: `src/pages/QuizB.jsx` (lines 51-75) — accepts optionId blindly
- Current mitigation: Answers only used for scoring (calcularEstilo), which filters for valid A/B/C/D
- Recommendations: (1) Validate each answer against QUESTIONS data on load, (2) Clear state if invalid answers detected, (3) Add answer count validation (must have exactly 20 answers).

## Performance Bottlenecks

**Unused Type Dependencies:**
- Problem: `@types/react` and `@types/react-dom` installed but project doesn't use TypeScript
- Files: `package.json` (lines 18-19)
- Cause: Accidental installation, increases bundle size in node_modules
- Improvement path: Remove @types/* packages or migrate project to TypeScript to justify their presence.

**Large Inline Script in Analytics Component:**
- Problem: TikTok Pixel and Clarity tracking scripts are very long inline scripts (minified, unreadable) embedded in JavaScript string. This increases component bundle size and reduces maintainability.
- Files: `src/components/Analytics/Analytics.jsx` (lines 44-46, 51-52)
- Cause: Analytics library provides minified code that must be injected inline
- Improvement path: (1) Extract minified code to separate comment file with source reference, (2) Consider using official tracking libraries (npm packages) instead of inline injection if available, (3) Lazy-load Analytics component only if analytics env vars exist.

## Fragile Areas

**Quiz State Management Logic:**
- Files: `src/pages/QuizB.jsx` (lines 33-75)
- Why fragile: Complex setTimeout orchestration with multiple state transitions (question → transition → redirect). Timing bugs possible. The 400ms and TRANSITION.delay (4000ms) are magic numbers. Race conditions between setAnswers, setScreen, and navigate.
- Safe modification: (1) Add console.log statements to trace state transitions, (2) Extract setTimeout logic to a custom hook with event emitter pattern, (3) Use React.memo for components to prevent unnecessary re-renders, (4) Add stale closure comment explaining dependency array.
- Test coverage: No tests for state transitions. Should add tests for: quiz completion flow, transition timing, early navigation (user navigates before transition ends), localStorage recovery.

**Scoring Algorithm Edge Cases:**
- Files: `src/data/scoring.js` (lines 17-33)
- Why fragile: Tie-breaking logic uses hardcoded PRIORITY array. If new attachment styles added (e.g., a 5th style), this array must be updated manually. If scores are tied between multiple styles, fallback behavior may be unexpected.
- Safe modification: (1) Document the priority order and reasoning clearly, (2) Add unit tests with all 4-style tie scenarios, (3) Consider returning tie info (e.g., "ansioso and distante tied at 5 each") for transparency.
- Test coverage: No tests. Should validate: all single-style cases, all two-style ties, three-way ties, four-way ties, zero answers.

**Analytics Environment Variable Validation:**
- Files: `src/components/Analytics/Analytics.jsx` (lines 22-24)
- Why fragile: Uses `import.meta.env` without checking if values exist before template literals. If env vars are undefined, scripts load with invalid IDs (e.g., "https://...?id=undefined"), causing silent failures.
- Safe modification: (1) Add explicit null checks: `if (ga4Id) { injectScript(...) }` (already done), (2) Log warnings if env vars missing, (3) Add runtime validation that injected scripts loaded successfully.
- Test coverage: No tests. Should test: all three env vars present, partial env vars, no env vars.

## Scaling Limits

**LocalStorage Quota:**
- Current capacity: Browser localStorage typically 5-10MB per domain
- Limit: Quiz state for 20 answers is tiny (~200 bytes). Not a concern for single user. But if future versions store images, documents, or multiple quiz attempts, quota fills quickly.
- Scaling path: (1) Implement IndexedDB for larger payloads, (2) Add server-side session storage if backend exists, (3) Compress state before localStorage if necessary, (4) Implement state cleanup (delete old sessions > 30 days).

**Component Scaling (Adding More Pages/Routes):**
- Current capacity: 7 routes defined in `src/App.jsx`. Each page component is a separate file, manageable.
- Limit: App.jsx import list becomes unwieldy at ~20+ pages. Route definitions not centralized.
- Scaling path: (1) Create `src/routes.js` that exports route definitions as data, (2) Use dynamic imports: `const LazyComponent = lazy(() => import('../pages/PageName'))`, (3) Implement route guards/layouts if patterns emerge, (4) Consider route-based code splitting to reduce initial bundle size.

## Dependencies at Risk

**React Router Minor Version:**
- Risk: `react-router-dom: ^6.27.0` — semantic versioning allows minor updates automatically. React Router has had breaking changes in minor versions historically (useNavigate return type changed, etc.).
- Impact: Unexpected breaking changes in minor updates. Types may not match if later migrating to TypeScript.
- Migration plan: (1) Lock version to `6.27.0` (remove `^`) until TypeScript migration is planned, (2) Test dependency updates in CI before auto-update, (3) Monitor changelog for breaking changes before upgrading.

**ESLint Configuration Mismatch:**
- Risk: ESLint v9.13.0 with React plugin v7.37.2 — version 9 of ESLint changed config format significantly (moved to flat config). Old `.eslintrc.cjs` files may not work.
- Impact: Lint failures or unexpected behavior if eslint/plugin versions drift
- Migration plan: (1) Create ESLint flat config (`eslint.config.js`) compatible with v9, (2) Document config format in project README, (3) Pin versions: `eslint: "9.13.0"`, `eslint-plugin-react: "7.37.2"`.

## Missing Critical Features

**No Build Optimization Configuration:**
- Problem: Vite config is minimal (`vite.config.js` is 6 lines). No minification, sourcemap, or asset optimization configured.
- Blocks: Cannot control production bundle size, debug minified code in production, or optimize asset loading.
- Path: Add vite build configuration: minification strategy (esbuild vs terser), sourcemap generation, asset chunking strategy, CSS minimization.

**No Error Boundary:**
- Problem: React app has no error boundary to catch component rendering errors.
- Blocks: Single component error crashes entire app with white screen.
- Path: Create `src/components/ErrorBoundary.jsx` that catches errors and displays fallback UI. Wrap `<App />` with it in main.jsx.

**No 404 / Not Found Route:**
- Problem: Invalid route params (e.g., `/resultado/invalid-estilo`) navigate to home (line 12-14 in Resultado.jsx), but no explicit 404 page exists.
- Blocks: User confusion if they land on undefined routes. No way to show "page not found" message.
- Path: Create `src/pages/NotFound.jsx`. Add catch-all route: `<Route path="*" element={<NotFound />} />`.

## Test Coverage Gaps

**Quiz Logic Untested:**
- What's not tested: calcularEstilo() function with various answer combinations, tie-breaking behavior, edge cases (0 answers, 20 answers, invalid letters)
- Files: `src/data/scoring.js`
- Risk: Scoring algorithm could silently produce wrong results. Regressions undetected.
- Priority: HIGH — This is core business logic.

**Component Rendering Untested:**
- What's not tested: Button, AnswerCard, ProgressBar, Badge, Input components
- Files: `src/components/**/*.jsx`
- Risk: UI breaks silently. Props validation missing. Accessible markup may regress.
- Priority: MEDIUM — Components are simple but critical to UX.

**State Management Untested:**
- What's not tested: QuizB state transitions, localStorage persistence, resume-from-checkpoint flow
- Files: `src/pages/QuizB.jsx`
- Risk: Complex state flow has timing bugs and race conditions.
- Priority: HIGH — State bugs are hard to debug manually.

**Analytics Injection Untested:**
- What's not tested: Analytics component loads correct scripts, handles missing env vars gracefully, doesn't break page
- Files: `src/components/Analytics/Analytics.jsx`
- Risk: Silent script loading failures. Analytics data lost.
- Priority: MEDIUM — Failure is silent but impacts business metrics.

**Routing Untested:**
- What's not tested: Invalid route params redirect correctly, all routes render without errors
- Files: `src/App.jsx`, `src/pages/Resultado.jsx`
- Risk: Broken routing could trap user. Invalid estilo values not validated.
- Priority: MEDIUM — Routing is simple but user-facing.

---

*Concerns audit: 2026-03-26*
