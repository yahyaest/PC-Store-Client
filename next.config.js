/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: { domains: ["mk-media.mytek.tn", "codedesign.org"] },
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "secret",
  },
};
