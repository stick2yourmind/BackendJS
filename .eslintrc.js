module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'sort-keys-fix'
  ],
  rules: {
    'sort-keys-fix/sort-keys-fix': 'warn'
  }
}
