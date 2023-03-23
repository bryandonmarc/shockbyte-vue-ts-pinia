import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import HeroiconsHome from 'virtual:icons/heroicons/home'
import HeroiconsSquares2x2 from 'virtual:icons/heroicons/squares-2x2'

// https://itnext.io/vue-tricks-smart-layouts-for-vuejs-5c61a472b69b
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        AppHeader
      },
      meta: {
        icon: HeroiconsHome
      }
    },
    {
      path: '/admin',
      name: 'dashboard',
      components: {
        default: () => import('@/views/DashboardView.vue'),
        AppHeader,
        AppSidebar: () => import('@/components/Layout/AppSidebar.vue'),
        AppPagination: () => import('@/components/Layout/AppPagination.vue')
      },
      meta: {
        icon: HeroiconsSquares2x2
      },
      props: {
        AppPagination: {
          apiUrl: 'https://be-02-birdhouse-dev-rec.shockbyte.dev/registration'
        }
      }
    },
    {
      path: '/admin/:id',
      name: 'overview',
      components: {
        default: () => import('@/views/OverviewView.vue'),
        AppHeader,
        AppSidebar: () => import('@/components/Layout/AppSidebar.vue'),
        AppPagination: () => import('@/components/Layout/AppPagination.vue')
      },
      props: {
        default: true
      }
    }
  ]
})

export default router
