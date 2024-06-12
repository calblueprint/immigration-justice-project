import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/admin": ["/admin/", "/admin/retool", "/admin/legal-server"],
    "/dev": [
        {
            text: "Project Overview",
            link: "/dev/",
            icon: "book-open"
        },
        {
            text: "Application",
            icon: "window-restore",
            prefix: "/dev/app/",
            link: "/dev/app/",
            children: ["auth", "onboarding", "listings", "settings", "supabase", "styling"]
        },
        {
            text: "Retool",
            prefix: "/dev/retool",
            link: "/dev/retool/",
            icon: "wrench",
            children: ["app", "workflow"]
        },
        {
            text: "Deployment",
            link: "/dev/deployment",
            icon: "rocket"
        }
    ],
    "/design": ["/design/"]
});
