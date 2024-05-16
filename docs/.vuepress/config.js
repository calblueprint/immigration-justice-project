import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

const globalNavbar = [
  { text: 'Home', link: '/' },
  { text: 'Admin Guide', link: '/admin/' },
  { text: 'Developer Docs', link: '/dev/' },
  { text: 'Design Prototypes', link: '/design/' },
];

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
  }),
});
