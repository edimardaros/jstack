module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    camelcase: 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
