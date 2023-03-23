import { defineStore } from 'pinia'

const initialState = (): Pagination => ({
  page: 1,
  pageSize: 10,
  slice: [0, -1],
  numItems: 120
})

export const usePaginationStore = defineStore('pagination', {
  state: (): Pagination => initialState(),
  getters: {
    getPage: (state) => state.page,
    getPageSize: (state) => state.pageSize,
    getSlice: (state) => state.slice,
    getNumItems: (state) => state.numItems
  },
  actions: {
    setPage(page: number) {
      this.page = page
    },
    setPageSize(pageSize: number) {
      this.pageSize = pageSize
    },
    setSlice(slice: [number, number]) {
      this.slice = slice
    },
    setNumItems(numItems: number) {
      this.numItems = numItems
    }
  }
})
