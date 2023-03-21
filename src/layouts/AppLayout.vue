<!-- https://itnext.io/vue-tricks-smart-layouts-for-vuejs-5c61a472b69b -->
<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup lang="ts">
import AppLayoutDefault from './AppLayoutDefault.vue'
import { markRaw, watch } from 'vue'
import { useRoute } from 'vue-router'

const layout = markRaw(AppLayoutDefault)
const route = useRoute()

watch(
  () => route.meta,
  async (meta) => {
    try {
      const component = await meta.layout

      layout.value = component || AppLayoutDefault
    } catch (e) {
      layout.value = AppLayoutDefault
    }
  },
  { immediate: true }
)
</script>
