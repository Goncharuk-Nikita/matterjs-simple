/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './tech-demo.html', 
    './mobile-intro.html', 
    './mobile-game.html',
    './desktop-game.html', 
    './game-rules.html',
    './game-settings.html',
    './results.html',
    './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dracula"],
  },
  plugins: [require("daisyui")],
}
