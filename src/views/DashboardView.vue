<template>
  <div class="flex h-fit flex-row flex-wrap gap-6 p-8">
    <Suspense>
      <DashboardSlot />

      <template #fallback>
        <DashboardCardSkeleton v-for="i in getPageSize" :key="i" />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination'
import { storeToRefs } from 'pinia'

const paginationStore = usePaginationStore()
const { getPageSize } = storeToRefs(paginationStore)
</script>
