//https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: [
    'airbnb-base'
  ],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'warn',
    'eol-last': 'off',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'no-plusplus': 'warn',
    'consistent-return': 'off',
    'no-restricted-syntax': 'warn',
    'prefer-destructuring': 'warn',
    'no-continue': 'warn',
  }
}