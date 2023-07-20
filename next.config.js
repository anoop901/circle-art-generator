/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/circle-art-generator",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/circle-art-generator",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
