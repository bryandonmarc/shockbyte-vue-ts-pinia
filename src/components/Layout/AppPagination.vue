<template>
  <nav class="fixed inset-x-0 bottom-0 flex h-16 items-center justify-center bg-dark">
    <ol
      class="inline-flex min-w-[24rem] justify-between gap-0.5 font-display font-medium text-white/40"
    >
      <li
        class="button button-primary button-pagination px-1.5 text-primary"
        :class="{ disabled: !hasPrev }"
        @click="goPrev"
      >
        <HeroiconsChevronLeftSolid class=" " />
      </li>
      <li
        v-for="button in buttons"
        :key="button.page"
        :class="{ 'button-active': button.active }"
        @click="page = button.page"
        class="button button-primary button-pagination px-3"
      >
        {{ button.ellipsis ? '...' : button.page }}
      </li>
      <li
        class="button button-primary button-pagination px-1.5 text-primary"
        :class="{ disabled: !hasNext }"
        @click="goNext"
      >
        <HeroiconsChevronRightSolid />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import HeroiconsChevronLeftSolid from '~icons/heroicons/chevron-left-solid'
import HeroiconsChevronRightSolid from '~icons/heroicons/chevron-right-solid'

import usePaginator from 'vue-use-paginator'
import { usePaginationStore } from '@/stores/pagination'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const paginationStore = usePaginationStore()
const { getPage, getPageSize, getNumItems } = storeToRefs(paginationStore)
const { page, pageSize, slice, numItems, buttons, hasPrev, hasNext, goPrev, goNext } = usePaginator(
  {
    page: getPage.value,
    pageSize: getPageSize.value,
    numItems: getNumItems.value,
    numButtons: 7
  }
)

// set store on pagination navigate
watch([page, slice], ([newPage, newSlice]) => {
  paginationStore.setPage(newPage)
  paginationStore.setSlice(newSlice)
})

// set pagination on store change (from DashboardView or BirdhouseView)
watch([getPageSize, getNumItems], ([newPageSize, newNumItems]) => {
  pageSize.value = newPageSize
  numItems.value = newNumItems
})

// prevent circular dependency on store update
watch([getPage], ([newPage]) => {
  if (page.value != newPage) page.value = newPage
})
</script>
