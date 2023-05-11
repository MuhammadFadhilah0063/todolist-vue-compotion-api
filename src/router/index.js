import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import BelajarView from '../views/BelajarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/belajar',
      name: 'belajar',
      component: BelajarView
    },
    {
      path: '/',
      name: 'todo',
      component: TodoView
    },
  ]
})

export default router
