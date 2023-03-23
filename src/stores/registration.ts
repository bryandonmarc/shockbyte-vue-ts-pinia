import type { RegistrationResponse } from '@/types/data'
import { defineStore } from 'pinia'

const initialState = (): RegistrationResponse => ({
  items: [],
  meta: {
    totalItems: 120,
    itemCount: 10,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1
  }
})

export const useRegistrationStore = defineStore('registration', {
  state: (): RegistrationResponse => initialState(),
  getters: {
    getItems: (state) => state.items,
    // {
    //   return ([start, end]: [number, number]) => Array.from(state.items).slice(start, end)
    // }
    getPage: (state) => state.meta.currentPage,
    getMeta: (state) => state.meta
  },
  actions: {
    recordRegistration(response: RegistrationResponse) {
      this.items = [...this.items, ...response.items].filter(
        (
          (set) => (o) =>
            set.has(o.value) ? false : set.add(o.value)
        )(new Set())
      )

      this.meta = response.meta
    }
  }
})
