import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App),
  created:function () {
    // eslint-disable-next-line no-console
    store.dispatch('tryAutoLogin').then(()=> {console.log('成功加载本地信息')})
  }
}).$mount('#app')


