/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    // set darkTheme config to another theme name so the user's OS dark theme doesn't activate the dark theme
    darkTheme: 'light',
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#facc15",
          "primary-content": "#422006",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "primary": "red",
          "primary-content": "black",
        }
      },
    ]
  }
}