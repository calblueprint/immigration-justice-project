import blueprintEslint from '@calblueprint/eslint-config-react'

module.exports = {
  extends: [blueprintEslint],
  rules: {
    // Add any custom rules here
    // Disable the rule that requires React to be in scope -- we don't need this with React 18
  },
};