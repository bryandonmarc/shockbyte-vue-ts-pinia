<script setup lang="ts">
import HeroiconsArrowRight20Solid from '~icons/heroicons/arrow-right-20-solid'
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-6">
    <h1 class="text-center font-display text-2xl font-semibold">Home page</h1>
    <RouterLink to="/admin">
      <button class="button button-primary button-active font-display">
        To BirdHouses Overview
        <HeroiconsArrowRight20Solid class="ml-2" />
      </button>
    </RouterLink>
  </div>
</template>
