/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/expertise/storybook",
        destination: "/expertise/storybook-ecosystems",
        permanent: true,
      },
      {
        source: "/expertise/governance",
        destination: "/expertise/frontend-governance",
        permanent: true,
      },
      {
        source: "/expertise/dx-engineering",
        destination: "/expertise/developer-experience-engineering",
        permanent: true,
      },
      {
        source: "/expertise/angular-enterprise",
        destination: "/expertise/angular-enterprise-patterns",
        permanent: true,
      },
      {
        source: "/insights",
        has: [
          {
            type: "query",
            key: "cluster",
            value: "(?<cluster>.*)",
          },
        ],
        destination: "/expertise/:cluster",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
