/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

/**
 * Github pages
 */
if (
  process.env.GITHUB_REPOSITORY &&
  ["phase-production-build", "phase-export"].includes(phase)
) {
  const repositoryName = process.env.GITHUB_REPOSITORY.split("/")[1];

  nextConfig = {
    ...nextConfig,
    assetPrefix: `/${repositoryName}/`,
    basePath: `/${repositoryName}`,
  };
}

module.exports = nextConfig;

// const webpack = (config, options) => {

//   return config
// }

// module.exports = (phase, defaultConfig) => {
//   if (phase !== 'phase-production-server') {
//     const withBundleAnalyzer = require('@next/bundle-analyzer')({
//       enabled: process.env.ANALYZE === 'true',
//     })

//     /**
//      * Github pages
//      */
//     if (
//       process.env.GITHUB_REPOSITORY &&
//       ['phase-production-build', 'phase-export'].includes(phase)
//     ) {
//       const repositoryName = process.env.GITHUB_REPOSITORY.split('/')[1]

//       config = {
//         ...config,
//         assetPrefix: `/${repositoryName}/`,
//         basePath: `/${repositoryName}`,
//       }
//     }

//     return config
//   }

//   // else
//   // return defaultConfig

//   return {
//     ...defaultConfig,
//     webpack,
//     generateEtags: false,
//   }
// }
