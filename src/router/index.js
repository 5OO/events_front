import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AddEventView from '../views/AddEventView.vue';
import ParticipantsOfEventView from '@/views/ParticipantsOfEventView.vue'
import IndividualDetailView from '@/views/IndividualDetailView.vue'
import CompanyDetailView from '@/views/CompanyDetailView.vue'

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
    },
    {
      path: '/participant/individual/:participantId/event/:eventId',
      name: 'IndividualDetailView',
      component: IndividualDetailView
    },
    {
      path: '/participant/company/:participantId/event/:eventId',
      name: 'CompanyDetailView',
      component: CompanyDetailView
    }
  ]
})

export default router
