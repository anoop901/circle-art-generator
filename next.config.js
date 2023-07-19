/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/mandala-generator",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/mandala-generator",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
