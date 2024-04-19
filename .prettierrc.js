const blueprintPrettier = require("@calblueprint/prettier-config");

module.exports = {
  ...blueprintPrettier,
  importOrder: ['^react$', '^next/?.$','<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '<TYPES>', '^@/', '^~', '^[.]']
};
