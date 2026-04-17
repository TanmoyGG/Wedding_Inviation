import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "wedding-journey": {
          platform: {
            50: "#fff8ef",
            100: "#f8e8d6",
            200: "#efcfab",
            300: "#dfab79",
            400: "#c9854d",
          },
          maroon: "#8d2c3c",
          brass: "#d8a766",
          "ticket-paper": "#fff3de",
          charcoal: "#2f2a28",
          "rail-steel": "#6f747a",
          "signal-green": "#36735d",
          "sunset-amber": "#df7c39",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair-display)", "serif"],
      },
      boxShadow: {
        ticket: "0 14px 38px rgba(42, 32, 25, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
