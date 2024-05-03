/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './tech-demo.html', 
    './mobile-intro.html', 
    './mobile-game.html', 
    './game-rules.html',
    './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dracula"],
  },
  plugins: [require("daisyui")],
}
