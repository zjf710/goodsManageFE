// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    document: true,
    device: true
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['off', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'import/no-unresolved': [0, {commonjs: true, amd: true}],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'comma-dangle': ['error', 'never'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
