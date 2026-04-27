import type { Config } from "tailwindcss";

const config: Config = {
  // This tells Tailwind: "Look inside these folders for my styling classes!"
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
