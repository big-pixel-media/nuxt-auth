export default defineNuxtConfig({
    modules: ["../src/module"],
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    auth: {
        global: false,
    },
});
