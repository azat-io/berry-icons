let config = require('@azat-io/eslint-config-typescript')

module.exports = [
  ...config,
  {
    rules: {
      'import/no-unresolved': [
        'error',
        {
          ignore: ['vscode'],
        },
      ],
    },
  },
]
