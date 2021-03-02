import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layouts: 'default'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layouts: 'auth',
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import('../views/CreatePost.vue'),
    meta: {
      layouts: 'default',
      requiresAuth: true,
      role: 'writer'
    }
  },
  {
    path: '/update-post/:id',
    name: 'UpdatePost',
    component: () => import('../views/UpdatePost.vue'),
    meta: {
      layouts: 'default',
      requiresAuth: true,
      role: 'writer'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  
  if(to.matched.some(record => record.meta.requiresAuth)) {
    
    if (store.getters.GETTERS_AUTH && store.getters.GETTERS_ROLE === to.meta.role) {
      next()
      return
    }
    next('/auth') 
  } else {
  
    if (store.getters.GETTERS_AUTH && (to.name === 'Auth')) {
      
      next('/')
      return
    }
    next() 
  }
})

export default router
