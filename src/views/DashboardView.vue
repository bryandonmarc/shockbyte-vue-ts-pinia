<template>
  <div class="p-8">
    <KeepAlive>
      <Suspense>
        <DashboardSlot />

        <template #fallback>
          <div class="flex h-fit flex-row flex-wrap gap-6">
            <DashboardCardSkeleton v-for="i in getPageSize" :key="i" />
          </div>
        </template>
      </Suspense>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination'
import { storeToRefs } from 'pinia'

const paginationStore = usePaginationStore()
const { getPageSize } = storeToRefs(paginationStore)
</script>
