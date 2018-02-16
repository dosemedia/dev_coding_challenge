import Vue from 'vue';
import Router from 'vue-router';
import AuthPage from '@/components/AuthPage';
import AdminPage from '@/components/AdminPage';
// import UserService from '../services/user';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      component: AuthPage,
      beforeEnter: (to, from, next) => {
        if (firebase.auth().currentUser) {
          return next('/admin');
        }
        return next();
      },
    },
    {
      path: '/admin',
      component: AdminPage,
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          return next('/auth');
        }
        return next();
      },
    },
  ],
});
