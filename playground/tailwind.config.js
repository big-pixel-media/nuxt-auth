/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                xs: ".75rem",
                DEFAULT: ".8rem",
                sm: "1.25rem",
                lg: "1.5rem",
                xl: "3rem",
                "2xl": "4rem",
            },
        },
        extend: {},
    },
    plugins: [],
};
