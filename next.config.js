/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  images: { domains: ["mk-media.mytek.tn", "codedesign.org"] },
  i18n,
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "secret",
  },
};
