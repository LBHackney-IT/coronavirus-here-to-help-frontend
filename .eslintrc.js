const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
    .reduce((acc, rule) => { acc[`jsx-a11y/${rule}`] = 'off'; return acc }, {})

module.exports = {
    root: true, // Make sure eslint picks up the config at the root of the directory
    parserOptions: {
        ecmaVersion: 2020, // Use the latest ecmascript standard
        sourceType: 'module', // Allows using import/export statements
        ecmaFeatures: {
            jsx: true // Enable JSX since we're using React
        }
    },
    settings: {
        react: {
            version: 'detect' // Automatically detect the react version
        }
    },
    env: {
        browser: true, // Enables browser globals like window and document
        amd: true, // Enables require() and define() as global variables as per the amd spec.
        node: true, // Enables Node.js global variables and Node.js scoping.
        'jest/globals': true // For jest describe, expect etc
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
    ],
    plugins: ['jest'],
    rules: {
        "react/prop-types": "off",
        // 'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'prettier/prettier': 0,
        'react/react-in-jsx-scope': 'off',
        ...a11yOff
        // 'jsx-a11y/anchor-is-valid': [
        //     'error',
        //     {
        //         components: ['Link'],
        //         specialLink: ['hrefLeft', 'hrefRight'],
        //         aspects: ['invalidHref', 'preferButton']
        //     }
        // ]
    }
};
