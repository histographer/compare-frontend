import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Session from '../views/Session.vue';
import NotFound from '../views/NotFound.vue';
import ThankYou from '../views/ThankYou.vue';
import Ranking from '../views/Ranking.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/session',
    name: 'session',
    component: Session,
  },
  {
    path: '/thank-you',
    name: 'thank-you',
    component: ThankYou,
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking,
  },
  {
    path: '*',
    name: '404-not-found',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  if (to.name !== 'session' && isLoggedIn === null) next({ name: 'session' });
  else next();
});

export default router;
