/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: "User1",
    image: "/test-site/img/docusaurus.svg",
    infoLink: "https://www.facebook.com",
    pinned: true
  }
];

const siteConfig = {
  title: "Kunyora" /* title for your website */,
  tagline: "A flexible Rest Client for Javascript web and native applications",
  url: "https://kunyora.github.io" /* your website url */,
  baseUrl: "/kunyora/" /* base url for your project */,
  projectName: "Kunyora",
  headerLinks: [
    { doc: "getting_started", label: "Docs" },
    { doc: "getting_started", label: "Community" },
    { blog: true, label: "Blog" },
    { page: "help", label: "Help" },
    { doc: "getting_started", label: "Github" },
    { doc: "getting_started", label: "React" }
  ],
  users,
  /* path to images for header/footer */
  // headerIcon: "img/docusaurus.svg",
  // footerIcon: "img/docusaurus.svg",
  favicon: "img/favicon.png",
  /* colors for website */
  colors: {
    primaryColor: "#0d47a1",
    secondaryColor: "#1976d2"
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: "Copyright © " + new Date().getFullYear() + " StackBench",
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: "solarized-dark"
  },
  scripts: ["https://buttons.github.io/buttons.js"],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: "https://github.com/kunyora/kunyora"
  /* On page navigation for the current documentation page */
  // onPageNav: 'separate',
};

module.exports = siteConfig;
