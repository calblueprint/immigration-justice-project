import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/admin": [
          { 
            text: "Admin Intro",
            link: "/admin/intro",
            icon: "door-open",

        },
        {
            text: "Retool",
            link: "/admin/retool",
            icon: "wrench",
            children: ["listing-portals", "reviewing-interests", "users-directory"]
        },
        {
            text: "LegalServer",
            link: "/admin/legalserver",
            icon: "briefcase"
        },
        {
            text:"Brevo",
            link: "/admin/brevo",
            icon: "envelope"

        }
    ],
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
