import linter from '@hacxy/eslint-config/nodejs';

export default linter({
  yaml: true,
  rules: {
    'no-console': 0,
    'complexity': ['error', 30]
  },
  ignores: ['template/*']
});
