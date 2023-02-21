module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
      },
    },
    boxShadow: {
      cart: "0 3px 6px rgba(0,0,0,0.12)",
      product: "0 6px 12px rgba(0,0,0,.08)",
      listProduct: "0 2px 4px rgba(0,0,0,.08)",
      navigation: "0 3px 6px rgba(0, 0, 0, 0.16)",
      navigationReverse: "0 -3px 6px rgba(0, 0, 0, 0.16)",
      header: "0 2px 3px rgba(0, 0, 0, 0.08)",
      subMenu: "1px 2px 3px rgba(0, 0, 0, 0.08)",
      bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
      cookies: "0 -2px 3px rgba(0, 0, 0, 0.04)",
      avatar: "0px 15px 30px rgba(0, 0, 0, 0.16)",
    },
  },
  plugins: [],
 // important: true,
};
