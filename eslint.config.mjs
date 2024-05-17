import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        ignores: [
            "docs/.vuepress/.cache",
            "docs/.vuepress/.temp",
            "docs/.vuepress/dist"
        ]
    }
];
