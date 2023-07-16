import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/HomeView')
      },
      {
        path: 'userlist',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "about" */ '@/views/UserList')
      },
      {
        path: '/volunteer',
        name: 'Volunteer',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Volunteer')
      },
      {
        path: '/employee',
        name: 'Employee',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Employee')
      },
      {
        path: 'oldPeopleInfo',
        name: 'oldPeopleInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/oldPeopleInfo')
      },
      // {
      //   path: 'GetFaceInfo',
      //   name: 'getFaceInfo',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/GetFaceInfo')
      // },
      {
        path: 'Face',
        name: 'face',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Face')
      },
      {
        path: '/video/video_feed',
        name: 'Video',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Video')
      },
      {
        path: '/voice',
        name: 'Voice',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Voice')
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Statistics.vue')
      },
      {
        path: '/oldStatistics',
        name: 'oldStatistics',
        component: () => import(/* webpackChunkName: "about" */ '@/views/oldStatistics.vue')
      },
      {
        path: '/event',
        name: 'Event',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Event')
      },
      {
        path: '/camera',
        name: 'camera',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Camera')
      },
      {
        path: '/camera1',
        name: 'camera1',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Camera1')
      },
      {
        path: '/camera2',
        name: 'camera2',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Camera2')
      }
      // {
      //   path: 'stranger',
      //   name: 'Stranger',
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/Stranger')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Register')
  },
  // {
  //   path: '/userlist',
  //   name: 'userlist',
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/UserList')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
