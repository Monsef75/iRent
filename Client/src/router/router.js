import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/CustomerUI/Home.vue'
import Membership from '@/views/CustomerUI/Membership.vue'
import Explore from '@/views/CustomerUI/Explore.vue'
import Details from '@/views/CustomerUI/Details.vue'
import List from '@/views/CustomerUI/List.vue'
import Profile from '@/views/CustomerUI/Profile.vue'

import AdminPanal from '@/views/AdminUI/UI.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/Membership/:Page',
        name: 'Membership',
        component: Membership
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Explore/:Type/:Location',
        name: 'Explore',
        component: Explore
    },
    {
        path: '/Details/:PropertyId',
        name: 'Details',
        component: Details
    },
    {
        path: '/List',
        name: 'List',
        component: List
    },
    {
        path: '/Profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/AdminPanel',
        name: 'AdminPanel',
        component: AdminPanal
    },
  ]
})

export default router
