module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:@typescript-eslint/recommended',
    'standard',
    'standard-preact'
  ],
  settings: {
    react: { pragma: 'h' },
  },
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
  },
  rules:  {
    'no-unused-vars': ['off'],
    'indent': ['warn', 4],
    'react/jsx-indent': ['warn', 4],
    'react/jsx-indent-props': ['warn', 4],
    'react/no-unknown-property': ['error', { ignore: ['class'] }],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['warn', 'single'],
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, 'classes': false,  }],
    'arrow-parens': 'warn',
    '@typescript-eslint/ban-ts-ignore': ['off'],
    '@typescript-eslint/interface-name-prefix': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': ['warn'],
  },
};
