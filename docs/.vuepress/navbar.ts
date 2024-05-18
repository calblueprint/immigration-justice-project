import { navbar } from "vuepress-theme-hope";

export default navbar([
    {
        text: "Admins",
        icon: "user",
        link: "/admin/intro"
    },
    {
        text: "Developers",
        icon: "code",
        link: "/dev/overview"
    },
    {
        text: "Designers",
        icon: "pen-nib",
        link: "/design/"
    }
]);
