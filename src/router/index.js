import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Session from '../views/Session.vue';
import NotFound from '../views/NotFound.vue';
import ThankYou from '../views/ThankYou.vue';
import Ranking from '../views/Ranking.vue';
import AddProject from '../views/AddProject.vue';
import ChooseProject from '../views/ChooseProject.vue';

import store from '../store/index';

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
    path: '/add-project',
    name: 'addProject',
    component: AddProject,
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

router.beforeEach(async (to, from, next) => {
  const hasProject = await checkCurrentProject(store.state);
  const hasSession = await checkSession(store.state);
  if (to.name !== 'choose-project' && !hasProject) {
    next({ name: 'choose-project' });
  } else if (to.name !== 'session' && !hasSession) {
    next({ name: 'session' });
  } else {
    next();
  }
});

async function checkSession(state) {
  const response = await getData(`compare-api.digipat.no/imagePair?projectId=${state.currentProject.id}`);
  return response.status === 200;
}

function checkCurrentProject(state) {
  const fromState = state.currentProject;
  const fromLocalStorage = JSON.parse(localStorage.getItem('currentProject'));
  if (Object.keys(fromState).length > 0) {
    return true;
  }
  if (Object.keys(fromState).length === 0 && fromLocalStorage !== null) {
    // State doesnt have currentProject but localstorage does
    store.commit('setCurrentProject', fromLocalStorage);
    return true;
  }
  return false;
}

export default router;
