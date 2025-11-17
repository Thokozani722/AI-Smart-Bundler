/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          brandBlue: "#1E40AF",
          brandBlack: "#000000",
        },
        boxShadow: {
          glow: "0 25px 50px -12px rgba(30, 64, 175, 0.35)",
        },
      },
    },
  plugins: [],
};
