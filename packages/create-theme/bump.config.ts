import { defineConfig } from 'bumpp';

export default defineConfig({
  tag: false,
  all: true,
  commit: 'release CLi version %s',
  execute: 'npm run sync && git add .'
});
