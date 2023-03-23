// https://vuejs.org/guide/reusability/composables.html#async-state-example
// fetch.js
import type { Ref } from 'vue'
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch<T>(url: RequestInfo | URL | Ref<RequestInfo | URL>, init?: RequestInit) {
  const data = ref<T>()
  const error = ref<Error>()

  function doFetch() {
    // reset state before fetching..
    data.value = undefined
    error.value = undefined

    // unref() unwraps potential refs
    fetch(unref(url), init)
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))

    return { data, error }
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetch)
  } else {
    // otherwise, just fetch once
    // and avoid the overhead of a watcher
    doFetch()
  }

  return new Promise((resolve, reject) => {
    resolve(doFetch())
  })
}
