import { createResolver, defineNuxtModule, addImports, addPlugin, addTemplate, addRouteMiddleware } from "@nuxt/kit";
import { defu } from "defu";

import { moduleDefaults } from "./runtime/defaults";

export default defineNuxtModule({
    meta: {
        name: "@big-pixel-media/nuxt-auth",
        configKey: "auth",
    },
    async setup(options, nuxt) {
        const moduleOptions = defu(options, moduleDefaults);

        nuxt.options.runtimeConfig.auth = moduleOptions;
        nuxt.options.runtimeConfig.public.auth = {
            global: moduleOptions.global,
            pages: moduleOptions.pages,
        };

        const { resolve } = createResolver(import.meta.url);

        addImports([
            {
                name: "useAuth",
                from: resolve(`./runtime/composables/useAuth`),
            },
        ]);

        addTemplate({
            filename: "types/auth.d.ts",
            getContents: () =>
                [
                    "declare module '#auth' {",
                    `  const getServerSession: typeof import('${resolve("./runtime/server")}').getServerSession`,
                    `  const AuthHandler: typeof import('${resolve("./runtime/server")}').AuthHandler`,
                    `  const Credentials: import('${resolve("./runtime/types")}').Credentials`,
                    `  const Session: import('${resolve("./runtime/types")}').Session`,
                    "}",
                ].join("\n"),
        });

        nuxt.hook("nitro:config", (nitroConfig) => {
            nitroConfig.alias = nitroConfig.alias || {};

            nitroConfig.externals = defu(typeof nitroConfig.externals === "object" ? nitroConfig.externals : {}, {
                inline: [resolve("./runtime")],
            });

            nitroConfig.alias["#auth"] = resolve("./runtime");
        });

        nuxt.hook("prepare:types", (options) => {
            options.references.push({
                path: resolve(nuxt.options.buildDir, "types/auth.d.ts"),
            });
        });

        addRouteMiddleware({
            name: "auth",
            path: resolve("./runtime/middleware/auth"),
        });

        addPlugin(resolve("./runtime/plugin"));
    },
});
