import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AddEventView from '../views/AddEventView.vue';
import ParticipantsOfEventView from '@/views/ParticipantsOfEventView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },{
      path: '/add-event',
      name: 'AddEvent',
      component: AddEventView
    },
    {
      path:'/events/:id/participants',
      name:'Participants',
      component:ParticipantsOfEventView
    }
  ]
})

export default router
