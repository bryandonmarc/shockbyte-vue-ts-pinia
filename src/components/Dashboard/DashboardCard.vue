<template>
  <RouterLink
    :to="{
      path: `/admin/${props.birdhouse.ubidValue}`,
      name: 'overview',
      params: {
        id: props.birdhouse.ubidValue,
        longitude: props.birdhouse.longitude,
        latitude: props.birdhouse.latitude
      }
    }"
  >
    <article class="h-[9.75rem] rounded-xl bg-dark p-6 font-display">
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold">{{ props.birdhouse.name }}</h1>
        <footer class="flex flex-col gap-y-2">
          <span class="inline-flex items-center font-medium">
            <IconLocation class="mr-2 h-5 w-5" />
            ({{ props.birdhouse.longitude }}, {{ props.birdhouse.latitude }})
          </span>
          <div class="flex flex-row gap-x-[0.625rem]">
            <span class="inline-flex items-center">
              <IconPets class="mr-2 h-5 w-5" />
              {{ (birdhouse.items || []).reduce((pets, curr) => pets + curr?.birds, 0) }}
            </span>
            <span class="inline-flex items-center">
              <IconEgg class="mr-2 h-5 w-5" />
              {{ (birdhouse.items || []).reduce((eggs, curr) => eggs + curr?.eggs, 0) }}
            </span>
          </div>
        </footer>
      </div>
    </article>
  </RouterLink>
</template>

<script setup lang="ts">
import IconLocation from '@/assets/svg/location.svg?component'
import IconPets from '@/assets/svg/pets.svg?component'
import IconEgg from '@/assets/svg/egg.svg?component'

import type { Birdhouse } from '@/types/data'

import { useOccupancyStore } from '@/stores/occupancy'
import type { OccupancyResponse } from '@/types/data'
import { useFetch, type UseFetchReturn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export interface IProps {
  birdhouse: Birdhouse
}

const props = defineProps<IProps>()

const occupancyStore = useOccupancyStore()
const { getItems } = storeToRefs(occupancyStore)

const birdhouse = computed(() =>
  getItems.value.find((item) => item.value === props.birdhouse.ubidValue)
)

if (!birdhouse.value) {
  const { data, error }: UseFetchReturn<OccupancyResponse> = await useFetch<OccupancyResponse>(
    `https://be-02-birdhouse-dev-rec.shockbyte.dev/house/${props.birdhouse.ubidValue}/occupancy`,
    { method: 'GET' }
  ).json()

  if (!error.value && data.value) {
    // remove duplicate birdhouses
    const items = data.value.items.filter(
      (
        (set) => (o) =>
          set.has(o.id) ? false : set.add(o.id)
      )(new Set())
    )

    occupancyStore.recordOccupancy({
      value: props.birdhouse.ubidValue,
      items: items
    })

    occupancyStore.recordMeta(data.value.meta)
  }
}
</script>
