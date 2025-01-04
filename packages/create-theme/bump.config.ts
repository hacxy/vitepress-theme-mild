import { defineConfig } from 'bumpp';

export default defineConfig({
  tag: false,
  all: true,
  commit: 'release CLI v%s',
  execute: 'npm run sync'
});
