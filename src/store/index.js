import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    projects: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
    },
    setProjects(state, payload) {
      state.projects = payload.projects;
    },
  },
  actions: {
  },
  modules: {
  },
});
