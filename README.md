# shockbyte-vue-ts-pinia

My submission to Shockbyte's coding test as the next step of the interview process. I tried incorporating as much concepts that I have learned from my previous projects, as well as challenging myself with new libraries and technologies whilst developing the project.

✨ [Demo live website](https://shockbyte-vue-ts-pinia.vercel.app/)

## Features

Coded with maintainability and extensibility in mind

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/) - built with speed
- 📦 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - on-demand components auto importing
- 🍍 [Pinia](https://pinia.vuejs.org/), [
  pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate) - persisted state management
- 🎨 [TailwindCSS](https://tailwindcss.com/) - utility-first CSS framework with reusable component styles
- 😃 [unplugin-icons](https://github.com/antfu/unplugin-icons) - icons on-demand universally
- 🖌️ [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) - elegantly import local SVG as Vue components
- 📈 [Chart.js](https://www.chartjs.org/), [vue-chartjs](https://github.com/apertureless/vue-chartjs/) - powerful, customizable charts
- 📃 [vue-use-paginator](https://github.com/Sun0fABeach/vue-use-paginator) - reactive paginated data based on route with a single shared paginator component
- ☁️ [useFetch()](https://vueuse.org/core/useFetch/) - stable reactive Fetch API from [@vueuse/core](https://github.com/vueuse/vueuse)
- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa) - with workbox caching strategies
- 📡 Emulated layouts using [Named Views](https://router.vuejs.org/guide/essentials/named-views.html)
- 🦥 Asynchronously pre-loaded local fonts
- ⏯️ Using `<Suspense>` for loading state management with top-level await and skeleton placeholders
- 🦾 Built with TypeScript
- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Playwright](https://playwright.dev/)

## Installation

Clone the repo locally and use your preferred package manager to install dependencies. I personally used [pnpm](https://pnpm.io/) to develop the project.

```bash
pnpm install --frozen-lockfile
```

### Docker

You can view the Docker repository [here](https://hub.docker.com/repository/docker/bryandonmarc/shockbyte-vue-ts-pinia/). To pull the image locally:

```bash
docker pull bryandonmarc/shockbyte-vue-ts-pinia:1.3
```

## Usage

To develop a local development environment, defaulting to `localhost:5173`

```bash
pnpm dev
```

To start up the docker environment:

```bash
pnpm dev:docker
# or
docker run --rm -it -p 5173:5173 bryandonmarc/shockbyte-vue-ts-pinia:1.3
```

## Testing

As it was not necessarily required, I only included basic tests

### Unit Tests with [Vitest](https://vitest.dev/)

```bash
pnpm test:unit
```

### End-to-end Tests with [Playwright](https://playwright.dev/)

```bash
# Install browsers for the first run, not required for Docker
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/vue.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug

# View test reports
pnpm test:e2e:report
```

## Thoughts on development

I spent most of my time trying to re-invent wheels, testing which is better, and deciding which to use:

- [Smart Views](https://itnext.io/vue-tricks-smart-layouts-for-vuejs-5c61a472b69b), [Named Views](https://vueschool.io/articles/vuejs-tutorials/composing-layouts-with-vue-router/), [Vue Portals](https://blog.logrocket.com/dynamic-component-rendering-with-vue-portal/) for emulating layouts like in Nuxt
- Using `@layer components` directive, or `addComponent()` plugin using vanilla CSS or `theme()` in composing reusable component styles in [Tailwind](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer)
- Using native Fetch API and composing my own function, `useFetch()` from this Vue [example](https://vuejs.org/guide/reusability/composables.html#async-state-example), or `useFetch()` from [@vueuse/core](https://vueuse.org/core/useFetch/)
- Handling my own loading state management logic, or using the built-in `<Suspense>` [experimental feature](https://vuejs.org/guide/built-ins/suspense.html#loading-state).

Since I was given free reign on how would I personally code the project, I made sure that the codebase is clean, organized, and easy to read and understand. I assumed that I would be developing the project with other developers in mind that will look and maintain my code in the future. So I chose decisions that would most follow this coding style.

This sometimes led to _over-engineering_, but I call it polishing and making it better. Better is a very subjective word, but to me, it means maintaining a coding style that is as efficient as possible, while maintaining readability and extensibility. I try to make my code easy to read so that other developers could look through it and basically start working on it as quickly as possible.

In addition to the decision problems mentioned above, I also encountered bugs that are seemingly _ghostly_ in nature as I couldn't at first glance find the reasons why they were occurring, even with the help of strong typing. These usually involves simple syntax errors, for example:

```typescript
import type { Occupancy } from '@/types/data'

interface OverviewProps {
  items: Occupancy[]
}
^^^
Default export of the module has or is using private name 'OverviewProps'.ts(4082)

const props = defineProps<OverviewProps>()
```

In this example, I couldn't understand the error prompt, but basically all I had to do was add an `export` keyword before the `interface`.

```bash
FROM node:lts

WORKDIR /app

# install pnpm
RUN apt-get install git
RUN npm install -g pnpm

# install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
RUN npx playwright install-deps

CMD ["pnpm", "dev", "--", "--host", "0.0.0.0"]
```

In this example, after running the docker instance, `localhost:5173` was not sending any data and I was only getting a blank screen. I searched for so long for a solution, but I was only missing a `COPY . .` line before the `CMD` layer.

I solved these problems by going through them step-by-step whilst trying to explain and rant about the bugs to my fellow Discord members in a VC (even if they were not developers themselves). While explaining, I realized the solutions were so much simpler😅
