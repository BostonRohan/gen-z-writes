const exclude = [
  "/forgot-password",
  "/profile",
  "/studio/*",
  "/user/*",
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
const config = {
  siteUrl: "https://www.projectgenzwrites.com",
  generateRobotsTxt: true,
  exclude,
  additionalPaths: ["/api/server-sitemap-index.xml"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: NEXT_SSG_FILES,
      },
    ],
  },
};

export default config;
