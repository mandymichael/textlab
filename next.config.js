module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  assetPrefix: "/",
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
