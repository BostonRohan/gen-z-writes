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
      { protocol: "https", hostname: "www.projectgenzwrites.com" },
      // We use the og image from the site for the resources cards
      { protocol: "https", hostname: "alcottmagazine.com" },
      { protocol: "https", hostname: "cdn.getmidnight.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "sistertimelitmag.wordpress.com" },
      { protocol: "https", hostname: "seesawlit.com" },
      { protocol: "https", hostname: "sturgeonmoonreview.com" },
      { protocol: "https", hostname: "coterieyouthmental.wixsite.com" },
      { protocol: "https", hostname: "disjointedmagazine.wordpress.com" },
      { protocol: "https", hostname: "themilkingcat.com" },
      { protocol: "https", hostname: "assembly.malala.org" },
      { protocol: "https", hostname: "accessiblescience.net" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "abpositiveart.com" },
      { protocol: "https", hostname: "decameronproject.org" },
      { protocol: "https", hostname: "juneoh31.wixsite.com" },
      { protocol: "https", hostname: "sunhouseliterary.com" },
      { protocol: "https", hostname: "polyphonylit.org" },
      { protocol: "https", hostname: "castofwonders.org" },
      { protocol: "https", hostname: "stonesoup.com" },
      { protocol: "https", hostname: "newmoongirls.com" },
      { protocol: "https", hostname: "youngwritersproject.org" },
      { protocol: "https", hostname: "hypernovalit.com" },
      { protocol: "https", hostname: "hangingloosepress.com" },
      { protocol: "https", hostname: "emberjournal.org" },
      { protocol: "https", hostname: "tcr.org" },
      { protocol: "https", hostname: "curieuxjournal.wordpress.com" },
      { protocol: "https", hostname: "bluemarblereview.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "eunoiareview.wordpress.com" },
      { protocol: "https", hostname: "ethicthreadsreview.com" },
      { protocol: "https", hostname: "theemptyinkwellreview.org" },
      { protocol: "https", hostname: "fleetingdazemag.com" },
      { protocol: "https", hostname: "zaum.sonoma.edu" },
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "149444733.v2.pressablecdn.com" },
      { protocol: "https", hostname: "assets.zyrosite.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
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
