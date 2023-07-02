// const withPlugins = require("next-compose-plugins");
// const withTM = require("next-transpile-modules")(["ui"]);
// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: false,
//   // disable: process.env.NODE_ENV === "development",
//   register: true,
//   scope: "/",
//   sw: "service-worker.js",
// });

// module.exports = async (phase) => {
//   const defaultConfig = {};
//   return withPlugins([
//     withPWA({
//       reactStrictMode: true,
//       swcMinify: true,
//       compiler: {
//         removeConsole: process.env.NODE_ENV == "development",
//       },
//     }),
//     withTM,
//   ])(phase, { defaultConfig });
// };

const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withPlugins([], {});
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});
