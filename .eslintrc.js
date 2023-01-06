//https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: ['airbnb-base'],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'warn',
    'eol-last': 'off',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'consistent-return': 'off',
    'no-restricted-syntax': 'warn',
    'prefer-destructuring': 'warn',
    'no-continue': 'warn',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'spaced-comment': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-else-return': 'off',
    'no-use-before-define': 'off',
    'arrow-parens': 'warn',
    'no-tabs': 'off',
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'prefer-template': 'warn'
  },
};
