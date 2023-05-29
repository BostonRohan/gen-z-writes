/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turn off React StrictMode for now, as react-aria (used by Plasmic)
  // has some troubles with it. See
  // https://github.com/adobe/react-spectrum/labels/strict%20mode
  reactStrictMode: false,
  images: {
    domains: [
      "img.youtube.com",
      "serpapi.com",
      "img.plasmic.app",
      "images.squarespace-cdn.com",
      "static.wixstatic.com",
      "images.gr-assets.com",
      "i.harperapps.com",
      "craigleener.com",
      "www.jenstjude.com",
      "twitter.com",
      "i0.wp.com",
      "yt3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
