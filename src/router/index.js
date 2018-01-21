import Vue from 'vue'
import firebase from 'firebase'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Admin from '@/components/Admin'
import NewPoll from '@/components/NewPoll'
import EditPoll from '@/components/EditPoll'
import Poll from '@/components/Poll'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }, {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        auth: true
      }
    },
    {
      path: '/admin/new-poll',
      name: 'NewPoll',
      component: NewPoll,
      meta: {
        auth: true
      }
    },
    {
      path: '/admin/edit/:id',
      name: 'EditPoll',
      component: EditPoll,
      meta: {
        auth: true
      }
    },
    {
      path: '/poll/:id',
      name: 'TakePoll',
      component: Poll
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(route => route.meta.auth)

  if (requiresAuth && !currentUser) {
    next('auth')
  } else {
    next()
  }
})

export default router
