module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        blue_gray: { 100: "#d3d3d3" },
        black: { 900: "#000000", "900_3f": "#0000003f" },
        yellow: { A100: "#fff78a" },
        green: { "900_7e": "#056d1c7e" },
        white: { A700: "#ffffff" },
        teal: { 200: "#85d4c4" },
      },
      fontFamily: {
        poppins: "Poppins",
        roboto: "Roboto",
        montserrat: "Montserrat",
      },
      boxShadow: {
        bs: "0px 2px  4px 1px #0000003f",
        bs1: "0px 4px  4px 0px #0000003f",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
