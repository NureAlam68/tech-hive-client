import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      light: {
        // eslint-disable-next-line no-undef
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#2563eb",
        accent: "#0f766e",
      },
    }],
  },
}

