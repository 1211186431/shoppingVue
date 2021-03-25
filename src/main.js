import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.prototype.HOST ="/api"

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI); 

new Vue({
  render: h => h(App),
}).$mount('#app')
