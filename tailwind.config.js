/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ADAD",
        "primary-active": "#008A8A",
        "primary-hover": "#009B9B",
        danger: "#F1416C",
        "danger-light": "#FFF5F8",
        info: "#3E97FF",
        "info-light": "#EEF6FF",
        success: "#50CD89",
        "success-light": "#E8FFF3",
        warning: "#F6C000",
        "warning-light": "#FFF8DD",
      },
      screens: {
        "2xl": "1400px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
