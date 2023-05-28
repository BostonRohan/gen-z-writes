/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turn off React StrictMode for now, as react-aria (used by Plasmic)
  // has some troubles with it. See
  // https://github.com/adobe/react-spectrum/labels/strict%20mode
  reactStrictMode: false,
  images: {
    domains: ["img.youtube.com", "serpapi.com", "img.plasmic.app"],
  },
};

module.exports = nextConfig;
