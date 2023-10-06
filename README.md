<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: @big-pixel-media/nuxt-auth
- Description: Auth module for Nuxt3
-->

# Nuxt Auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This is a nuxt-auth module for nuxt 3, currently early stages but open to contributions or fixes!
Features are limited but development is very much active so let me know if there is anything that needs addressing.

-   [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

-   🔒 &nbsp;Username/password authentication

## Quick Setup

1. Add `@big-pixel-media/nuxt-auth` dependency to your project

```bash
# Using pnpm
pnpm add -D @big-pixel-media/nuxt-auth

# Using yarn
yarn add --dev @big-pixel-media/nuxt-auth

# Using npm
npm install --save-dev @big-pixel-media/nuxt-auth
```

2. Add `@big-pixel-media/nuxt-auth` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
    modules: ["@big-pixel-media/nuxt-auth"],
});
```

That's it! You can now use nuxt-auth in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@big-pixel-media/nuxt-auth/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@big-pixel-media/nuxt-auth
[npm-downloads-src]: https://img.shields.io/npm/dm/@big-pixel-media/nuxt-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@big-pixel-media/nuxt-auth
[license-src]: https://img.shields.io/npm/l/@big-pixel-media/nuxt-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@big-pixel-media/nuxt-auth
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
