import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: null,
  },
  mutations: {
    changeBaseURL(payload) {
      this.state.baseUrl = payload.newUrl;
    },
  },
  actions: {},
  modules: {},
});
