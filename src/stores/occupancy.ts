import type { OccupancyStore, OccupancyItem, Meta } from '@/types/data'
import { defineStore } from 'pinia'

const initialState = (): OccupancyStore => ({
  data: [],
  meta: {
    totalItems: 120,
    itemCount: 10,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1
  }
})

export const useOccupancyStore = defineStore('occupancy', {
  state: (): OccupancyStore => initialState(),
  getters: {
    getItems: (state) => state.data,
    getPage: (state) => state.meta.currentPage,
    getMeta: (state) => state.meta
  },
  actions: {
    recordOccupancy(data: OccupancyItem) {
      // add birdhouses as nested objects with ubid
      this.data = [...this.data, ...[data]].filter(
        (
          (set) => (o) =>
            set.has(o.value) ? false : set.add(o.value)
        )(new Set())
      )
    },
    recordMeta(meta: Meta) {
      this.meta = meta
    }
  }
})
