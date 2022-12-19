// next.config.js
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withSvgr = require("next-svgr");

const isDev = process.env.NODE_ENV !== "production";
module.exports = withPlugins([
  withSvgr({
    includeFileLoader: true,
    svgrOptions: {
      configFile: path.resolve(__dirname, "svgr.config.js"),
    },
  }),
  withPWA({
    pwa: {
      dest: "public",
      disable: isDev,
    },
  }),
  
]);
module.exports = {
  reactStrictMode: false
}
module.exports.images = {
  loader: 'custom',
    domains: ['images.unsplash.com'],
}
