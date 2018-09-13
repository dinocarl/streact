module.exports = {
  env: {
    browser: true,
    node: true
  },
  globals: {
    ga: true,
  },
  extends: `airbnb`,
  rules: {
    quotes: [`error`, `backtick`],
    'no-console': [
      `warn`,
      {
        allow: [
          `info`,
          `time`,
          `timeEnd`,
          `warn`,
          `error`,
        ],
      },
    ],
    'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
    'react/prop-types': 0,
    'react/no-unknown-property': 0,
    'max-len': [`error`, 120],
    'linebreak-style': 0,
    'comma-dangle': 'off',
    'arrow-parens': 'off',
  },
};
