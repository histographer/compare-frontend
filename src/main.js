import Vue from 'vue';
import { Cytomine, User, ProjectCollection } from 'cytomine-client';
import App from './App.vue';
import router from './router';
import store from './store';

// Setup connection to Cytomine

Vue.config.productionTip = false;

async function connectToCytomineServer() {
  const URL = 'URL';
  const cytomine = await new Cytomine(URL);
  // Connect using username and password for now
  const username = 'USERNAME';
  const password = 'PWD';
  await cytomine.login(username, password);

  const user = await User.fetchCurrent();
  const projects = await ProjectCollection.fetchAll();
  return { user, projects };
}
connectToCytomineServer()
  .then(({ user, projects }) => {
    // Add current cytomine related stuff to vuex store
    store.commit('setUser', { user });
    store.commit('setProjects', { projects });
  });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
