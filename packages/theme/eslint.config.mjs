import linter from '@hacxy/eslint-config/vue';

export default linter({
  typescript: true,
  rules: {
    'regexp/no-unused-capturing-group': 0,
    'no-restricted-globals': 0,
    'vue/custom-event-name-casing': 0,
    'no-undefined': 0,
    'complexity': [2, 20]
  },
  ignores: [
    'packages/demo/**/*',
    'packages/theme/node.js'
  ],
});
