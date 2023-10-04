import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
    // hook into auth redirect to alter the url
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nuxtApp.hook("auth:redirect", (event) => {
        // event.target = "/locale" + event.route.fullPath;
    });
});
