import Vue from 'vue'
import Router from 'vue-router'
import Poll from '@/components/Poll'
import Admin from '@/components/Admin/Admin'
import NewPoll from '@/components/Admin/NewPoll'
import EditPoll from '@/components/Admin/EditPoll'
import Authentication from '@/components/Auth/Authentication'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/poll/:id',
      name: 'TakePoll',
      component: Poll
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/new_poll',
      name: 'NewPoll',
      component: NewPoll,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/edit/:id',
      name: 'EditPoll',
      component: EditPoll,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'Authentication',
      component: Authentication
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('auth')
  } else {
    next()
  }
})

export default router
