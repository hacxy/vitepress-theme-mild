import { defineConfig } from 'bumpp';

export default defineConfig({
  tag: false,
  all: true,
  commit: 'release CLI version %s',
  execute: 'npm run sync'
});
