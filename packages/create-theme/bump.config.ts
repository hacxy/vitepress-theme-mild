import { defineConfig } from 'bumpp';

export default defineConfig({
  tag: false,
  noGitCheck: true,
  all: true,
  commit: 'release CLI v%s',
  execute: 'npm run sync'
});
