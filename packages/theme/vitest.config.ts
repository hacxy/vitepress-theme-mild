import { defineConfig } from 'vitest/config';

const timeout = 60_000;

export default defineConfig({
  test: {
    testTimeout: timeout,
    hookTimeout: timeout,
    teardownTimeout: timeout,
    globals: true,
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['text-summary', 'html'],
      include: ['src/**/*.ts'],
    },
  }
});
