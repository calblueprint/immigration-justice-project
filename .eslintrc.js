module.exports = {
  extends: [
    '@calblueprint/eslint-config-react',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Add any custom rules here
    // Disable the rule that requires React to be in scope -- we don't need this with React 18
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    "jsx-a11y/label-has-associated-control": [ 2, {
      "assert": "either",
    }],
    "import/prefer-default-export": [ "off" ]
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ]
};