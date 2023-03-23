<script setup lang="ts">
import IconLocation from '@/assets/svg/location.svg?component'
import IconPets from '@/assets/svg/pets.svg?component'
import IconEgg from '@/assets/svg/egg.svg?component'
</script>

<template>
  <article
    class="h-[9.75rem] min-w-[15.375rem] animate-pulse rounded-xl bg-darker p-6 font-display ring-2 ring-dark"
  >
    <div class="flex flex-col gap-4">
      <h1 class="h-8 w-[11.625rem] rounded-sm bg-dark"></h1>

      <footer class="flex flex-col gap-y-2">
        <span class="inline-flex w-full items-center font-medium">
          <IconLocation class="mr-2 h-5 w-5" />
          <span class="h-5 w-[9.25rem] bg-dark"></span>
        </span>
        <div class="flex flex-row gap-x-[0.625rem]">
          <span class="inline-flex items-center">
            <IconPets class="mr-2 h-5 w-5" />
            <span class="h-5 w-10 bg-dark"></span>
          </span>
          <span class="inline-flex items-center">
            <IconEgg class="mr-2 h-5 w-5" />
            <span class="h-5 w-10 bg-dark"></span>
          </span>
        </div>
      </footer>
    </div>
  </article>
</template>
