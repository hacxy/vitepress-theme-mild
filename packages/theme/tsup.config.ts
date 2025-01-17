import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/node/index.ts'],
  format: ['esm'],
  outDir: 'config',
  target: 'node18',
  platform: 'node',
  bundle: true,
  minify: true,
  dts: true,
  clean: true,
});
