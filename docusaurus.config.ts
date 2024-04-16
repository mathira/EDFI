import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const organizationName = "mathira";
const projectName = "EDFI";

const config: Config = {
  organizationName,
  projectName,
  title: "EDFI",
  tagline: "Make your docu page",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  // url: "https://your-docusaurus-site.example.com",
  url: `https://${organizationName}.github.io`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: "/",
  baseUrl: `/${projectName}/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: "mathira", // Usually your GitHub org/user name.
  // projectName: "EDFI", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
        },
        blog: {
          showReadingTime: true,
          // editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "EDFI",
      logo: {
        srcDark: "img/logo_light.png",
        alt: "EDFI Logo",
        src: "img/logo_dark.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorials",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/mathira",
          label: "GitHub",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/Tutorials/Docusaurus/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "UTEC",
              href: "https://utec.edu.uy/en/news/community/",
            },
            {
              label: "FAB LAB BCN",
              href: "https://fablabbcn.org/blog",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/mathira",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EFDI, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

const baseUrl = `/${projectName}/`;
export default config;
