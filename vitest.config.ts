import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

const timeout = 60_000;
const dir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  test: {
    testTimeout: timeout,
    hookTimeout: timeout,
    teardownTimeout: timeout,
    globals: true,
    include: ['__tests__/unit/**'],
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['text-summary', 'html'],
      include: ['src/**/*.ts'],
    },
  },
  resolve: {
    alias: [
      { find: 'client', replacement: resolve(dir, 'src/client') },
      { find: 'node', replacement: resolve(dir, 'src/node') },
    ]
  }
});
