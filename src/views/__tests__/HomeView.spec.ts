import { test, describe, it, expect, vi } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import App from '@/App.vue'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

describe('View', () => {
  it('Renders Properly', () => {
    const wrapper = mount(HomeView, {
      global: {
        config: { compilerOptions: { isCustomElement: (tag: string) => tag.startsWith('router-') } }
      }
    })
    expect(wrapper.text()).toContain('Home page')
  })
})

test('Navigate to Dashboard', async () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })

  router.push('/')
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [router]
    }
  })

  expect(wrapper.html()).toContain('Home page')

  const push = vi.spyOn(router, 'push')

  await wrapper.find('a').trigger('click')
  await flushPromises()

  expect(push).toHaveBeenCalledTimes(1)
  expect(push).toHaveBeenCalledWith('/admin')
})
