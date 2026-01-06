/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#111111",
        primary: "#b1ff33", // The lime green from the image
        secondary: "#b488ff", // Purple accent
        accent: "#ff4d4d", // Red/orange accent
        card: "#161616",
        muted: "#888888",
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0,0,0,0.5)',
        'glow': '0 0 20px rgba(177,255,51,0.2)',
      }

    },
  },
  plugins: [],
}
