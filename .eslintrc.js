module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    extends: [
        'standard',
        'airbnb-base',
        'plugin:vue/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        //eslint-config-airbnb-base/rules/style.js
        indent: ['error', 4],
        'no-mixed-operators': 0,
        camelcase: 0,
        'spaced-comment': 0,
        'no-plusplus': 0,
        //eslint-config-airbnb-base/rules/best-practices.js
        'consistent-return': 0,
        radix: 0,
        //eslint-config-airbnb-base/rules/variables.js
        'no-restricted-globals': 0,
        'no-use-before-define': 0,
        'array-callback-return': 0,
        'no-param-reassign': 0,
        'no-restricted-syntax': 0,
        'max-len': [
            'error',
            { code: 120, tabWidth: 4, ignoreUrls: true },
        ],
    },
    parserOptions: {
        ecmaVersion: 2017,
        parser: 'babel-eslint',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
                'vue/html-indent': ['error', 4, {
                    attribute: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                    ignores: [],
                }],
                'vue/script-indent': ['error', 4, { baseIndent: 1 }],
                'vue/max-attributes-per-line': [2, {
                    singleline: 3,
                    multiline: {
                        max: 1,
                        allowFirstLine: false,
                    },
                }],
                'vue/html-closing-bracket-newline': ['error', {
                    singleline: 'never',
                    multiline: 'always',
                }],
                'vue/prop-name-casing': ['error', 'snake_case'],
            },
        },
    ],
};
