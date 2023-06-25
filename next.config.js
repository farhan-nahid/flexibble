/** @type {import('next').NextConfig} */
const nextConfig = {
  // add the image domain to the list of allowed domains
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
