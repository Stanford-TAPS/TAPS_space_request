/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cardinal: "#8C1515",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        playfair: ["Playfair", "serif"],
      },
      textShadow: {
        "outline-white": "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
      },
    },
  },
  plugins: [],
};
