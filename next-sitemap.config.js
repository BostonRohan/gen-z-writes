const exclude = [
  "/forgot-password",
  "/profile",
  "/studio/*",
  "/login",
  "/signup",
  "/profile",
];

// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  "/*.json$",
  "/*_buildManifest.js$",
  "/*_middlewareManifest.js$",
  "/*_ssgManifest.js$",
  "/*.js$",
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.projectgenzwrites.com",
  generateRobotsTxt: true,
  exclude,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: NEXT_SSG_FILES,
      },
    ],
    additionalSitemaps: [
      "https://www.projectgenzwrites.com/api/server-sitemap-index.xml",
    ],
  },
};
