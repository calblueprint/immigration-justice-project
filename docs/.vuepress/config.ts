import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
    base: "/",

    lang: "en-US",
    description:
        "Documentation for the user portal developed by Cal Blueprint for the Immigration Justice Project.",

    theme

    // Enable it with pwa
    // shouldPrefetch: false,
});
