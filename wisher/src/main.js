import Vue from 'vue'
import App from './App.vue'
import loader from "vue-ui-preloader";

Vue.config.productionTip = false

Vue.use(loader);

new Vue({
  render: h => h(App),
}).$mount('#app')
