import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Session from '../views/Session.vue';
import NotFound from '../views/NotFound.vue';
import ThankYou from '../views/ThankYou.vue';
import Ranking from '../views/Ranking.vue';
import ChooseProject from '../views/ChooseProject.vue';
import { getData } from '../utils/requests';

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
    beforeLeave: (to, from, next) => {
      next({ name: 'choose-project' });
    },
  },
  {
    path: '/thank-you',
    name: 'thank-you',
    component: ThankYou,
  },
  {
    path: '/choose-project',
    name: 'choose-project',
    component: ChooseProject,
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
  const isLoggedIn = checkSession();
  if (to.name !== 'session' && !isLoggedIn) next({ name: 'session' });
  else next();
});

async function checkSession() {
  let success = true;
  try {
    await getData('compare-api.digipat.no/imagePair');
  } catch (e) {
    success = true;
  }
  return success;
}
export default router;
