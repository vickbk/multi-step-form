# Checklist for Project set up

## Dependancies

- Run `dependancies.cmd` file

```bash
.\dependancies.cmd
```

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

- create `./src/test/vitest-setup.ts` file
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
    setupFiles: "./src/test/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
});
```
