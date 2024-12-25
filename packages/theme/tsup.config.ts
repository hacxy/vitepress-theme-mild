import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./node.ts'],
  format: ['esm'],
  target: 'node18',
  platform: 'node',
  bundle: true,
  minify: true,
  dts: true,
  clean: false,
  // watch: ['./node.ts'],
  // treeshake: true,
});
