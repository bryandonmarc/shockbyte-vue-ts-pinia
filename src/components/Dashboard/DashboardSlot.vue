<template>
  <div class="flex h-fit flex-row flex-wrap gap-6">
    <DashboardCard
      v-for="item in getItems.filter((item) => Boolean(item.birdhouse)).slice(start, end)"
      :key="item.value"
      :birdhouse="item.birdhouse"
    />
  </div>
</template>

<script setup lang="ts">
import { useFetch, type UseFetchReturn } from '@vueuse/core'
import { reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useRegistrationStore } from '@/stores/registration'
import { usePaginationStore } from '@/stores/pagination'
import type { RegistrationResponse } from '@/types/data'

const registrationStore = useRegistrationStore()
const paginationStore = usePaginationStore()

const { getItems, getMeta } = storeToRefs(registrationStore)
const { getSlice } = storeToRefs(paginationStore)

const start = computed(() => getSlice.value[0])
const end = computed(() => getSlice.value[1])

if (getItems.value.slice(start.value, end.value).length) {
  paginationStore.setPage(getMeta.value.currentPage)
  paginationStore.setPageSize(getMeta.value.itemsPerPage)
  paginationStore.setNumItems(getMeta.value.totalItems)
} else {
  const params = reactive({
    page: getMeta.value.currentPage.toString(),
    limit: getMeta.value.itemsPerPage.toString()
  })
  const url = computed(
    () =>
      'https://be-02-birdhouse-dev-rec.shockbyte.dev/registration?' +
      new URLSearchParams(params).toString()
  )

  const { data, error }: UseFetchReturn<RegistrationResponse> =
    await useFetch<RegistrationResponse>(url, { method: 'GET' }, { refetch: true }).json()

  if (!error.value && data.value) {
    registrationStore.recordRegistration(data.value)

    const { currentPage, itemsPerPage, totalItems } = data.value.meta

    paginationStore.setPage(currentPage)
    paginationStore.setPageSize(itemsPerPage)
    paginationStore.setNumItems(totalItems)
  }
}
</script>
