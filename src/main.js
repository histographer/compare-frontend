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
Vue.use(Vuesax);

Vue.config.productionTip = false;

// Setting the baseURL (middleware)
store.commit('changeBaseURL', { newUrl: 'localhost:9292' });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
