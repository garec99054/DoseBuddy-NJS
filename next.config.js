const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/DoseBuddy-NJS/',
  basePath: '/DoseBuddy-NJS',
  trailingSlash: true,
};

module.exports = nextConfig;