import linter from '@hacxy/eslint-config/vue';

export default linter({
  typescript: {
    parserOptions: {
      project: ['./tsconfig.json', 'packages/theme/tsconfig.json']
    }
  },
  rules: {
    'regexp/no-unused-capturing-group': 0,
    'no-restricted-globals': 0,
    'vue/custom-event-name-casing': 0
  },
  ignores: [
    'packages/demo/**/*',
    'packages/theme/node.js'
  ],
});
