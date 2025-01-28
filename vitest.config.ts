import { defineConfig } from 'vitest/config';

const timeout = 60_000;

export default defineConfig({
  test: {
    testTimeout: timeout,
    hookTimeout: timeout,
    teardownTimeout: timeout,
    globals: true,
    include: ['__tests__/unit/**'],
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['text-summary', 'html'],
      include: ['__tests__/unit/**', 'src/**/*.ts'],
    },
  }
});
