<template>
  <div class="flex h-[4.5rem] w-full flex-row items-center gap-9 rounded-xl bg-dark py-6 px-5">
    <time :datetime="props.date">
      {{
        new Date(props.date).toLocaleDateString(...[,], {
          dateStyle: 'short'
        })
      }}
    </time>

    <div class="flex flex-row gap-x-[0.625rem]">
      <span class="inline-flex items-center">
        <IconPets class="mr-2 h-5 w-5" />
        {{ props.pets }}
      </span>
      <span class="inline-flex items-center">
        <IconEgg class="mr-2 h-5 w-5" />
        {{ props.eggs }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPets from '@/assets/svg/pets.svg?component'
import IconEgg from '@/assets/svg/egg.svg?component'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  pets: {
    type: Number,
    required: true
  },
  eggs: {
    type: Number,
    required: true
  }
})
</script>
