const RemarkablePlugins = require("./core/RemarkablePlugins");

const repoUrl = "https://github.com/kunyora/kunyora";

const siteConfig = {
  title: "Kunyora",
  tagline: "A flexible and disposable Rest Client for Javascript applications",
  url: "https://kunyora.github.io",
  baseUrl: "/kunyora/",
  headerLinks: [
    { doc: "getting_started", label: "Docs" },
    { page: "community", label: "Community" },
    { blog: true, label: "Blog" },
    { href: repoUrl, label: "Github" },
    {
      href: "https://github.com/kunyora/react-kunyora",
      label: "React-Kunyora (0.1.1)"
    },
    { search: true }
  ],
  headerIcon: "img/headerIcon.png",
  footerIcon: "img/headerIcon.png",
  favicon: "img/tabIcon.png",
  colors: {
    primaryColor: "#0d47a1",
    secondaryColor: "#1976d2"
  },
  copyright: "Copyright © " + new Date().getFullYear() + " StackBench",
  organizationName: "kunyora",
  projectName: "kunyora",
  editUrl: "https://github.com/kunyora/kunyora-website/blob/master/docs/",
  scripts: ["https://buttons.github.io/buttons.js"],
  repoUrl,
  markdownPlugins: [
    RemarkablePlugins.SnackPlayer,
    RemarkablePlugins.ReactNativeWebPlayer
  ],
  highlight: {
    theme: "solarized-dark"
  },
  algolia: {
    apiKey: "d39fbbb67f85db6ed167f93a427b9456",
    indexName: "kunyora"
  },
  gaTrackingId: "UA-117938006-1",
  ogImage: "img/tabIcon.png"
};

module.exports = siteConfig;
