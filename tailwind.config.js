/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      prymary: "#6562FC",
      secondery: "#4D4B52",
      active: "#4D4B52",
      in_active: "#3E3D40",
      grey_main: "#3D3C40",
      grey_lite: "#313033",
      black: "#1C1C1E",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
