import daisyui from "daisyui";
import { light } from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        custom: {
          ...light,
          primary: "rgb(113 100 202)",
          secondary: "rgb(56 189 248)",
          // info: "rgb()",
          // accent: "rgb()",
          // success: "rgb()",
          warning: "rgb(251 191 36)",
          error: "rgb(221 86 88)",
        },
      },
    ],
  },
  plugins: [daisyui],
};
