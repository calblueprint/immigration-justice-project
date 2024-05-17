import { viteBundler } from '@vuepress/bundler-vite';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { searchPlugin } from '@vuepress/plugin-search';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

const globalNavbar = [
  { text: 'Home', link: '/' },
  { text: 'Admin Guide', link: '/admin/' },
  { text: 'Developer Docs', link: '/dev/' },
  { text: 'Design Prototypes', link: '/design/' },
];

const adminSidebar = ['/admin/', '/admin/retool', '/admin/legal-server'];

const devSidebar = [
  '/dev/',
  {
    text: 'Application',
    link: '/dev/app/',
    collapsible: true,
    sidebarDepth: 2,
    children: [
      '/dev/app/auth',
      '/dev/app/onboarding',
      '/dev/app/listings',
      '/dev/app/settings',
      '/dev/app/supabase',
    ],
  },
  '/dev/retool',
  '/dev/deployment',
];

const designSidebar = ['/design/'];

export default defineUserConfig({
  title: 'Immigration Justice Project',
  description:
    'Documentation for the user portal developed by Cal Blueprint for the Immigration Justice Project.',
  bundler: viteBundler(),
  theme: defaultTheme({
    repo: 'calblueprint/immigration-justice-project',
    docsDir: 'docs',
    docsBranch: 'docs',
    editLinkText: 'Edit this page on GitHub',
    editLink: true,
    navbar: globalNavbar,
    sidebar: {
      '/admin': adminSidebar,
      '/dev': devSidebar,
      '/design': designSidebar,
    },
    logo: '/images/ijp_logo_black.png',
    logoDark: '/images/ijp_logo_white.png',
  }),
  plugins: [searchPlugin(), backToTopPlugin()],
});
