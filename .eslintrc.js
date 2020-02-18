module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/return-in-computed-property": "off",
    "vue/no-unused-components": "off",
    "no-prototype-builtins": "off",
    "no-unused-vars": "off"
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
