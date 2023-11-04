/** @type {import('next').NextConfig} */
const path = require("path");
//temporary fix for resend https://github.com/resendlabs/react-email/issues/868
const { NormalModuleReplacementPlugin } = require("webpack");

const nextConfig = {
  images: {
    domains: ["img.youtube.com", "lh3.googleusercontent.com", "cdn.sanity.io"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /email\/render/,
        path.resolve(__dirname, "./renderEmailFix.js")
      )
    );
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
