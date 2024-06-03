import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/admin": ["/admin/intro", "/admin/retool", "/admin/legal-server"],
    "/dev": [
        {
            text: "Project Overview",
            link: "/dev/overview",
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
            text: "Admin Dashboard",
            link: "/dev/retool",
            icon: "gauge"
        },
        {
            text: "Deployment",
            link: "/dev/deployment",
            icon: "rocket"
        }
    ],
    "/design": ["/design/"]
});
