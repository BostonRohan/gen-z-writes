/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.projectgenzwrites.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  exclude: [
    "/forgot-password",
    "/profile",
    "/studio/*",
    "/user/*",
    "/login",
    "/signup",
    "/profile",
  ],
};
