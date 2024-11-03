/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "/",
        permanent: false,
      },
      {
        source: "/forgot-password",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
