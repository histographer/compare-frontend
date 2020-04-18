import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: null,
    currentProject: {},
    skipped: [],
    amountDone: 0,
  },
  mutations: {
    changeBaseURL(state, payload) {
      state.baseUrl = payload.newUrl;
    },
    setCurrentProject(state, payload) {
      state.currentProject = payload;
      localStorage.setItem('currentProject', JSON.stringify(payload));
    },
    increaseAmountDone(state) {
      state.amountDone += 1;
    },
    addToSkipped(state, payload) {
      state.skipped.push(payload);
    },
  },
  actions: {},
  modules: {},
});
