import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/tabs/alarms',
  },
  {
    path: '/tabs/',
    component: () => import ('../components/Tabs.vue'),
    children: [
      {
        path: '',
        redirect: '/tabs/alarms'
      },
      {
        path: 'alarms',
        component: () => import ('../views/HomePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
