/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#FF5A5F",
                "primary-dark": "#e04e53",
                "background-light": "#f8f5f5",
                "background-dark": "#230f0f",
                "text-main": "#484848",
                "text-muted": "#767676",
                "border-neutral": "#DCE0E0",
                "neutral-surface": "#ffffff",
                blush: "#FDEDF0",
            },
            fontFamily: {
                display: ["Manrope", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                "2xl": "1rem",
                full: "9999px",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
