/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#2a2a2a",
        surface: "#3a3a3a",
        primary: "#ff6b35",
        accent: "#ffc857",
        card: "#404040",
        muted: "#6b6b6b",
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.3)',
        'glow': '0 0 20px rgba(255,107,53,0.3)',
      }
    },
  },
  plugins: [],
}
