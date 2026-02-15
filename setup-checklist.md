Checklist for Project set up

## Dependencies

- Run the dependency setup script (`dependencies.cmd`)

```bash
.\dependencies.cmd
```

## Environment Variables

- Copy `.env.example` to `.env`:

````bash
cp .env.example .env
- Update `VITE_APP_STORAGE_KEY` in `.env` if you need a custom storage key (default: `app`)
- Create `tests/vitest-setup.ts` file

## Add config

- update `tsconfig.app.json` with:
  - paths property:

  ```json
  paths: {
      "@/*": ["./src/*"]
  }
````

- types property with vitest types:

```json
types: ["...", "vitest/globals"]
```

- create `tests/vitest-setup.ts` file
- Update `vite.config.ts` with vitest, alias and basepath config

````ts
/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  ...otherConfigs,
  base: "/multi-step-form/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
});
``` Checklist for Project set up

## Dependencies

- Run the dependency setup script (`dependencies.cmd`)

```bash
.\dependencies.cmd
````

## Environment Variables

- Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

- Update `VITE_APP_STORAGE_KEY` in `.env` if you need a custom storage key (default: `multi-step-form`)

## Add config

- update `tsconfig.app.json` with:
  - paths property:

  ```json
  paths: {
      "@/*": ["./src/*"]
  }
  ```

  - types property with vitest types:

  ```json
  types: ["...", "vitest/globals"]
  ```

- create `./src/tests/vitest-setup.ts` file

- Update `vite.config.ts` with vitest, alias, and basepath config reflecting the current setup:

```ts
/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  ...otherConfigs,
  // Set base to "" or "/" unless deploying to a subpath
  base: "",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
});
```

- Update `vite.config.ts` with vitest, alias, and basepath config reflecting the current setup:

```ts
/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  ...otherConfigs,
  // Set base to "" or "/" unless deploying to a subpath
  base: "",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
});
```

- Update `vite.config.ts` with vitest, alias, and basepath config reflecting the current setup:

```ts
/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  ...otherConfigs,
  // Set base to "" or "/" unless deploying to a subpath
  base: "",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
});
```

- Update `vite.config.ts` with vitest, alias, and basepath config reflecting the current setup:

```ts
/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  ...otherConfigs,
  // Set base to "" or "/" unless deploying to a subpath
  base: "",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
});
```

- Update `vite.config.ts` with vitest, alias and basepath config

```ts
/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  ...otherConfigs,
  base: "/multi-step-form/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
});
```
