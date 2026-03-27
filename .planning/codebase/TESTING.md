# Testing Patterns

**Analysis Date:** 2026-03-26

## Test Framework

**Status:** No testing framework configured

**Runner:**
- Not detected
- `package.json` contains no test script (only `dev`, `build`, `preview`, `lint`)

**Assertion Library:**
- Not detected

**Run Commands:**
- Not applicable — no test command defined
- To run linting: `npm run lint`
- To run development: `npm run dev`
- To build: `npm run build`

## Test File Organization

**Location:**
- No test files found in source tree (`src/` directory)
- Test files exist in `.aiox-core/` and other framework directories but are not part of project's application code
- No `__tests__` or `test` directories in `src/`

**Naming:**
- Not applicable — project uses no test files

**Structure:**
- Not applicable — project uses no test files

## Test Coverage

**Requirements:** No testing framework means coverage cannot be measured

**View Coverage:**
- Not applicable

## Testing Status

**Current State:**
- Application code (`src/`) has **zero test coverage**
- No unit tests for components (e.g., Button, Input, ProgressBar, etc.)
- No tests for utility functions (e.g., `calcularEstilo()`)
- No tests for page logic (e.g., quiz state management, navigation)
- No integration tests for React Router flows

**Critical Untested Areas:**

| Component | File | What's Not Tested | Risk |
|-----------|------|------------------|------|
| `calcularEstilo()` | `src/data/scoring.js` | Scoring logic, tie-breaking priority | Score misalignment with incorrect style calculation |
| `QuizB` | `src/pages/QuizB.jsx` | State transitions, localStorage persistence, double-click protection, 400ms delay | User state loss, duplicate answers, broken quiz flow |
| `Button` | `src/components/Button/Button.jsx` | Variant rendering, loading state, disabled state | UI inconsistency, accessibility issues |
| `Input` | `src/components/Input/Input.jsx` | Validation error display, aria attributes, ID generation | Form errors not shown, accessibility broken |
| Analytics | `src/components/Analytics/Analytics.jsx` | Script injection idempotency, env var handling | Duplicate pixel fires, missing analytics |
| Router flows | `src/App.jsx` | Route navigation, parameter validation | Invalid routes not redirected, broken user journeys |

## Error Handling Testing

**No Error Tests:**
- localStorage failures silently return null — no test validates fallback behavior
- Invalid quiz parameters (`/resultado/invalid`) redirects to home — no test validates this
- Missing data assumptions (e.g., `QUESTIONS[currentIndex]`) could throw at runtime — untested

**Recommended Test Cases:**
```javascript
// Example: calcularEstilo tie-breaking
test('calcularEstilo with tie returns highest priority style', () => {
  const answers = ['A', 'B', 'C', 'A', 'B', 'C'] // all tied at 2 each
  const result = calcularEstilo(answers)
  expect(result).toBe('desorganizado') // highest priority per PRIORITY array
})

// Example: localStorage failure handling
test('loadState returns null when localStorage.getItem throws', () => {
  localStorage.getItem = jest.fn(() => { throw new Error('quota exceeded') })
  const result = loadState()
  expect(result).toBeNull()
})

// Example: double-click protection
test('handleAnswer ignores second click while selecting', async () => {
  const { getByText } = render(<QuizB />)
  const card = getByText('Option text')
  userEvent.click(card)
  userEvent.click(card) // Second click should be ignored
  expect(answers).toHaveLength(1) // Only one answer recorded
})
```

## Test Data & Fixtures

**Fixtures:**
- Data exists in `src/data/` but is meant for production, not testing
- `QUESTIONS` array: 20 questions with 4 options each
- `RESULTS` object: 4 attachment styles with descriptions
- No test fixtures or mock data files created

**Recommended Test Data Location:**
- `src/__tests__/fixtures/` for test-specific data
- `src/__tests__/mocks/` for mock implementations

**Example Missing Fixture:**
```javascript
// src/__tests__/fixtures/mockAnswers.js
export const mockAnswers = {
  allAnxious: Array(20).fill('A'),
  allDistant: Array(20).fill('B'),
  allSecure: Array(20).fill('C'),
  allDisorganized: Array(20).fill('D'),
  balanced: ['A', 'B', 'C', 'D'].repeat(5), // 20 answers, balanced
  tied: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'].concat(Array(12).fill('A')), // tie at 5 each, A wins
}
```

## What Would Tests Look Like

**Unit Test Example (if Jest was configured):**
```javascript
// src/data/__tests__/scoring.test.js
import { calcularEstilo } from '../scoring'

describe('calcularEstilo', () => {
  it('should count answers and return dominant style', () => {
    const answers = ['A', 'A', 'A', 'B', 'B', 'C', 'D'].concat(Array(13).fill('A')) // 7 A's
    expect(calcularEstilo(answers)).toBe('ansioso')
  })

  it('should handle all equal counts with priority order', () => {
    const answers = ['A', 'B', 'C', 'D'].repeat(5) // all 5 each
    expect(calcularEstilo(answers)).toBe('desorganizado') // highest priority
  })

  it('should return seguro as fallback', () => {
    // This test is actually unreachable in current implementation
    // since fallback will never trigger with valid input
  })

  it('should ignore invalid letters', () => {
    const answers = ['A', 'X', 'B', 'Y', 'C', 'D', 'Z'].concat(Array(13).fill('A'))
    expect(calcularEstilo(answers)).toBe('ansioso') // 7 A's, X/Y/Z ignored
  })
})
```

**Component Test Example (if Jest/React Testing Library was configured):**
```javascript
// src/components/Button/__tests__/Button.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('should render with primary variant by default', () => {
    const { container } = render(<Button>Click me</Button>)
    const btn = container.querySelector('.btn--primary')
    expect(btn).toBeInTheDocument()
  })

  it('should apply variant class', () => {
    const { container } = render(<Button variant="secondary">Click me</Button>)
    const btn = container.querySelector('.btn--secondary')
    expect(btn).toBeInTheDocument()
  })

  it('should disable when loading is true', () => {
    const { container } = render(<Button loading>Click me</Button>)
    expect(container.querySelector('button')).toBeDisabled()
  })

  it('should show spinner when loading', () => {
    const { container } = render(<Button loading>Click me</Button>)
    expect(container.querySelector('.btn__spinner')).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    await userEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when disabled', async () => {
    const onClick = jest.fn()
    render(<Button disabled onClick={onClick}>Click me</Button>)
    await userEvent.click(screen.getByText('Click me'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
```

**Integration Test Example (if Jest/React Testing Library was configured):**
```javascript
// src/pages/__tests__/QuizB.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import QuizB from '../QuizB'

describe('QuizB page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should show intro screen initially', () => {
    render(
      <BrowserRouter>
        <QuizB />
      </BrowserRouter>
    )
    expect(screen.getByText(/qual é o seu jeito de amar/i)).toBeInTheDocument()
  })

  it('should start quiz when button is clicked', async () => {
    render(
      <BrowserRouter>
        <QuizB />
      </BrowserRouter>
    )
    const startButton = screen.getByText(/começar/i)
    await userEvent.click(startButton)
    expect(screen.getByText(/pergunta 1/i)).toBeInTheDocument()
  })

  it('should save state to localStorage when answering', async () => {
    render(
      <BrowserRouter>
        <QuizB />
      </BrowserRouter>
    )
    await userEvent.click(screen.getByText(/começar/i))
    const firstCard = screen.getAllByRole('button')[0]
    await userEvent.click(firstCard)

    const savedState = JSON.parse(localStorage.getItem('mjda_quiz_state'))
    expect(savedState.answers).toHaveLength(1)
    expect(savedState.currentIndex).toBe(0)
  })

  it('should block double-click answers', async () => {
    render(
      <BrowserRouter>
        <QuizB />
      </BrowserRouter>
    )
    await userEvent.click(screen.getByText(/começar/i))
    const card = screen.getAllByRole('button')[0]

    await userEvent.click(card)
    await userEvent.click(card) // Second click immediately

    await waitFor(() => {
      // Only one answer should be recorded despite two clicks
      const savedState = JSON.parse(localStorage.getItem('mjda_quiz_state'))
      expect(savedState.answers).toHaveLength(1)
    })
  })

  it('should navigate to result page after all questions answered', async () => {
    // This would require mocking navigate and QUESTIONS array
    // Complex multi-step test simulating all 20 answers
  })
})
```

## Recommended Testing Setup

**To add testing to this project:**

1. Install testing dependencies:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @babel/preset-react babel-jest
   ```

2. Create `jest.config.js`:
   ```javascript
   export default {
     testEnvironment: 'jsdom',
     moduleNameMapper: {
       '\\.css$': 'identity-obj-proxy',
     },
     transform: {
       '^.+\\.(js|jsx)$': 'babel-jest',
     },
     setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
     collectCoverageFrom: [
       'src/**/*.{js,jsx}',
       '!src/main.jsx',
       '!src/data/**',
     ],
     coverageThreshold: {
       global: {
         branches: 70,
         functions: 70,
         lines: 70,
         statements: 70,
       },
     },
   }
   ```

3. Add test script to `package.json`:
   ```json
   "test": "jest",
   "test:watch": "jest --watch",
   "test:coverage": "jest --coverage"
   ```

4. Create `src/setupTests.js` for shared test configuration

5. Create test files in `src/**/__tests__/` directories matching source structure

---

*Testing analysis: 2026-03-26*
