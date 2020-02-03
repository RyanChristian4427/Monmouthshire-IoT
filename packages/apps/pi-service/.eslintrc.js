module.exports =  {
    parser: '@typescript-eslint/parser',
    extends:  [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    rules: {
        'indent': ['warn', 4, { "SwitchCase": 1 }],
        "quotes": "off",
        "@typescript-eslint/quotes": ["warn", "single"],
        "@typescript-eslint/no-use-before-define": ["off"],
        "arrow-parens": "warn",
        "@typescript-eslint/ban-ts-ignore": ["warn"],
        "@typescript-eslint/interface-name-prefix": "off",
        "semi": "off",
        "@typescript-eslint/semi": ["warn"]
    }
};
