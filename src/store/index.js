import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: null,
    currentProject: {},
  },
  mutations: {
    changeBaseURL(state, payload) {
      state.baseUrl = payload.newUrl;
    },
    setCurrentProject(state, payload) {
      state.currentProject = payload;
      localStorage.setItem('currentProject', JSON.stringify(payload));
    },
  },
  actions: {},
  modules: {},
});
