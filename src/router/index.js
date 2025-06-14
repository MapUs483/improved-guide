import { createRouter, createWebHistory } from 'vue-router'
import Index from '../components/index.vue'
import PasswordInput from '../components/PasswordInput.vue'
import Birthday from '../components/Birthday.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/password',
      name: 'password',
      component: PasswordInput
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: Birthday
    }
  ]
})

export default router 