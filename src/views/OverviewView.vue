<template>
  <div class="flex w-full flex-col p-8">
    <header class="flex min-h-[7rem] w-full flex-col items-start gap-5 rounded-xl bg-dark">
      <span class="inline-flex w-full items-center justify-between px-6 pt-6">
        <h1 class="font-display text-2xl font-semibold">{{ birdhouse?.name }}</h1>
        <span class="inline-flex items-center font-medium">
          <IconLocation class="mr-2 h-5 w-5" />
          ({{ birdhouse?.longitude }}, {{ birdhouse?.latitude }})
        </span>
      </span>

      <nav role="tablist" class="relative inline-flex h-9 gap-8 px-6 font-display" ref="tabs">
        <div
          role="tab"
          v-for="item in Object.keys(tabsList)"
          :key="item"
          class="mb-3 cursor-pointer select-none transition-colors"
          :class="[activeTab === item ? 'text-primary' : 'text-white/40']"
          @click="setActiveTab($event, item)"
        >
          {{ item }}
        </div>

        <div
          aria-hidden="true"
          class="absolute bottom-0 block h-1 transform-gpu bg-primary transition-all duration-300"
          :style="{ width: underlineWidth, '--tw-translate-x': translateX }"
        ></div>
      </nav>
    </header>

    <section class="mt-6 mb-16 flex flex-1 flex-col">
      <KeepAlive>
        <component :is="getComponent" :items="occupancy?.items"></component>
      </KeepAlive>
    </section>
  </div>
</template>

<script setup lang="ts">
import IconLocation from '@/assets/svg/location.svg?component'

import { useRegistrationStore } from '@/stores/registration'
import { useOccupancyStore } from '@/stores/occupancy'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const registrationStore = useRegistrationStore()
const occupancyStore = useOccupancyStore()
const route = useRoute()

const { getItems: getRegistrationItems } = storeToRefs(registrationStore)
const { getItems: getOccupancyItems } = storeToRefs(occupancyStore)

const registration = computed(() =>
  getRegistrationItems.value.find((item) => item.value === route.params.id)
)
const birdhouse = ref(registration.value?.birdhouse)

const occupancy = computed(() =>
  getOccupancyItems.value.find((item) => item.value === route.params.id)
)

const activeTab = ref('Overview')
const tabsList = {
  Overview: defineAsyncComponent(() => import('@/components/Overview/OverviewList.vue')),
  Graph: defineAsyncComponent(() => import('@/components/Overview/OverviewGraph.vue'))
}

// https://stackoverflow.com/a/61400956
// get component based on active tab (computed)
const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key]
const getComponent = computed(() => getKeyValue(activeTab.value)(tabsList))

// reactive style
const underlineWidth = ref('0px')
const translateX = ref('0px')

// set underline on mount
const tabs = ref(null)
onMounted(() => {
  const tabsList = tabs.value as unknown as HTMLElement
  const firstTab = tabsList.firstElementChild as HTMLElement
  underlineWidth.value = `${firstTab.getBoundingClientRect().width ?? 0}px`
  translateX.value = `${firstTab.offsetLeft - 24}px`
})

// set underline on tab click
function setActiveTab(e: MouseEvent, name: string) {
  activeTab.value = name
  const currentTab = e.target as HTMLElement
  underlineWidth.value = `${currentTab.getBoundingClientRect().width ?? 0}px`
  translateX.value = `${currentTab.offsetLeft - 24}px`
}
</script>
