/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        secondary: '#1F2937',
        accent: '#6366F1',
        success: '#10B981',
        danger: '#EF4444',
        text: '#F9FAFB',
      },
    },
  },
  plugins: [],
}

