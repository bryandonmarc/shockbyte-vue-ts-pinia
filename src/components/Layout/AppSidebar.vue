<template>
  <aside class="flex min-h-[calc(100vh-4.375rem)] min-w-[5rem] items-stretch bg-dark">
    <nav>
      <ul class="flex flex-col items-center gap-3 px-4 py-5">
        <li
          v-for="route in $router.options.routes.filter((route) => Boolean(route.meta?.icon))"
          :key="route.path"
        >
          <RouterLink
            :to="route.path"
            :active-class="'button-active'"
            class="button button-primary button-icon font-display"
          >
            <component v-if="route.meta" :is="route.meta.icon"></component>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
