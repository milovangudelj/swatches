import defaultTheme from "tailwindcss/defaultTheme";
import formsPlugin from "@tailwindcss/forms";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"Geist Mono"', ...defaultTheme.fontFamily.mono],
      },
      dropShadow: {
        inv: ["0 -1px 2px rgb(0 0 0 / 0.1)", "0 -1px 1px rgb(0 0 0 / 0.06)"],
      },
    },
  },
  plugins: [
    formsPlugin,
    plugin(function ({ addVariant }) {
      addVariant("mouse", "@media (pointer: fine)");
      addVariant("touch", "@media (pointer: coarse), (pointer: none)");
    }),
  ],
};
