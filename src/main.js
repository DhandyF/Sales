import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = "https://bdd.ai/app/backend/public/data";

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'
Vue.use(Vuesax)

import underscore from 'vue-underscore'
Vue.use(underscore)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
