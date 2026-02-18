/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/multi-step-form/" : "/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@tests": resolve(__dirname, "./tests"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./tests/vitest-setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/tests/*", "src/mocks/*"],
    },
  },
}));
