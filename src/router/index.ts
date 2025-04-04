import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/alarms',
  },
  {
    path: '/alarms',
    component: () => import ('@/views/Alarms.vue')
  },
  {
    path: '/alarms/add',
    component: () => import ('@/views/AlarmAdd.vue')
  },
  {
    path: '/stats',
    component: () => import ('@/views/Stats.vue')
  },
  {
    path: '/settings',
    component: () => import ('@/views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
