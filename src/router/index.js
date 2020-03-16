import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Session from '../views/Session.vue';
import NotFound from '../views/NotFound.vue';
import ThankYou from '../views/ThankYou.vue';
import Ranking from '../views/Ranking.vue';
import AllProjects from '../views/AllProjects.vue';
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
    path: '/ranking',
    name: 'ranking',
    component: Ranking,
  },
  {
    path: '/all-projects',
    name: 'all-projects',
    component: AllProjects,
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
  let hasSession = false;
  if (hasProject) {
    hasSession = await checkSession(store.state);
  }
  if (to.name === 'add-project' || to.name === 'all-projects' || to.name === 'ranking') {
    next();
  } else if (to.name !== 'session' && !hasSession) {
    next({ name: 'session' });
  } else {
    next();
  }
});

async function checkSession(state) {
  const response = await getData(`${state.baseUrl}/imagePair?projectId=${state.currentProject.id}`);
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
