# Test Organization

This directory contains all tests for the multi-step-form project, organized with a clear separation of concerns.

## Directory Structure

```
tests/
├── playwright/           # Playwright-specific tests
│   └── multisteps/      # Test suite for multistep functionality
│       ├── stories/     # Test spec files (*.spec.ts)
│       ├── helpers/     # Test-specific helper functions (future use)
│       └── types/       # Test-specific type definitions (future use)
└── shared/              # Shared test resources
    ├── helpers/         # Shared helper functions and utilities
    └── types/           # Shared type definitions
```

## Organization Principles

### `tests/playwright/`
Contains all Playwright end-to-end tests, organized by feature or module.

- **`multisteps/stories/`**: Contains all test specification files (*.spec.ts)
  - Test files describe user stories and scenarios
  - Tests import helpers from `tests/shared/helpers/`

- **`multisteps/helpers/`**: Reserved for test-specific helpers (currently empty)
  - Use this for helpers specific to multisteps tests only

- **`multisteps/types/`**: Reserved for test-specific types (currently empty)
  - Use this for type definitions specific to multisteps tests only

### `tests/shared/`
Contains resources shared across all test suites.

- **`shared/helpers/`**: Reusable helper functions and utilities
  - `helpers.ts`: General-purpose test helpers (shouldSee, clickNextButton, etc.)
  - `constant-helpers.ts`: Test constants and selectors
  - `fill-steps.ts`: Functions to fill form steps
  - `error-steps.ts`: Functions to test error scenarios
  - `update-steps.ts`: Functions to test update scenarios
  - `as-user.ts`: User simulation helpers
  - `index.ts`: Re-exports all helpers for easy importing

- **`shared/types/`**: Reusable type definitions
  - `helpers-types.ts`: Type definitions for test helpers
  - `index.ts`: Re-exports all types

## Usage

Import shared helpers in your test files:

```typescript
import {
  asUser,
  fillPersonalInfo,
  shouldSee,
  INFO_TITLE,
} from "../../../shared/helpers";
```

## Adding New Tests

1. **New test specs**: Add to `tests/playwright/[feature]/stories/`
2. **Feature-specific helpers**: Add to `tests/playwright/[feature]/helpers/`
3. **Feature-specific types**: Add to `tests/playwright/[feature]/types/`
4. **Shared helpers**: Add to `tests/shared/helpers/`
5. **Shared types**: Add to `tests/shared/types/`
