import linter from '@hacxy/eslint-config';

export default linter({
  yaml: true,
  rules: {
    'no-console': 0,
    'no-undefined': 0,
    'max-lines': [2, 500],
    'max-params': [2, 5]
  },
});
