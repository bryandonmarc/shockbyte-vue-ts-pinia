<template>
  <div class="flex flex-col items-start gap-4">
    <OverviewListItem
      v-for="item in props.items.slice(start, end)"
      :key="item.id"
      :date="item.created_at"
      :pets="item.birds"
      :eggs="item.eggs"
    />
  </div>
</template>

<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination'
import { useOccupancyStore } from '@/stores/occupancy'

import type { Occupancy } from '@/types/data'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export interface OverviewProps {
  items: Occupancy[]
}

const props = defineProps<OverviewProps>()

const occupancyStore = useOccupancyStore()
const paginationStore = usePaginationStore()

const { getMeta } = storeToRefs(occupancyStore)
const { getSlice } = storeToRefs(paginationStore)

paginationStore.setPage(getMeta.value.currentPage)
paginationStore.setPageSize(getMeta.value.itemsPerPage)
paginationStore.setNumItems(getMeta.value.totalItems)

const start = computed(() => getSlice.value[0])
const end = computed(() => getSlice.value[1])
</script>
