<template>
  <DashboardCard
    v-for="item in getItems.filter((item) => Boolean(item.birdhouse)).slice(start, end)"
    :key="item.value"
    :birdhouse="item.birdhouse"
  />
</template>

<script setup lang="ts">
import { useFetch, type UseFetchReturn } from '@vueuse/core'
import { reactive, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useRegistrationStore } from '@/stores/registration.js'
import { usePaginationStore } from '@/stores/pagination'
import type { RegistrationResponse } from '@/types/data'

const registrationStore = useRegistrationStore()
const paginationStore = usePaginationStore()

const { getItems, getMeta } = storeToRefs(registrationStore)
const { getSlice } = storeToRefs(paginationStore)
const start = ref(getSlice.value[0])
const end = ref(getSlice.value[1])

if (!getItems.value.slice(start.value, end.value).length) {
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
