import Vue from 'vue';
import VueLayers from 'vuelayers';
import Vuesax from 'vuesax';
import ZoomifySource from './components/utils/zoomify-source';

import App from './App.vue';
import router from './router';
import store from './store';
import 'vuelayers/lib/style.css';
import 'vuesax/dist/vuesax.css';

Vue.use(VueLayers);
Vue.use(ZoomifySource);
Vue.use(Vuesax, {
  colors: {
    primary: '#b395f3',
    success: 'rgb(23, 201, 100)',
    danger: 'rgb(242, 19, 93)',
    warning: 'rgb(255, 130, 0)',
    dark: 'rgb(36, 33, 69)',
  },
});

Vue.config.productionTip = false;


// Setting the baseURL (middleware)
store.commit('changeBaseURL', { newUrl: 'compare-api.digipat.no' });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
