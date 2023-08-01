/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      colors: {
        cardinal: '#8C1515',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
