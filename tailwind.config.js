/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './html/desktop-game.html',
    './html/config-game.html',    
    './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dracula"],
  },
  plugins: [require("daisyui")],
}
