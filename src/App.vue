<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView name="AppHeader" />
  <section class="relative flex min-h-[calc(100vh-4.375rem)] w-full max-w-[100vw]">
    <RouterView name="AppSidebar" />
    <RouterView />
    <RouterView name="AppPagination" />
  </section>
</template>
