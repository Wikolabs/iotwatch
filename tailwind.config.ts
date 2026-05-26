import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Russo One'", "sans-serif"],
        body: ["'Titillium Web'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
