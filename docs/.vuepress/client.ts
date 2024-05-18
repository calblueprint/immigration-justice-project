import { defineClientConfig } from "vuepress/client";
import Card from "./components/Card.vue";
import CardContainer from "./components/CardContainer.vue";

export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
        app.component("Card", Card);
        app.component("CardContainer", CardContainer);
    }
});
