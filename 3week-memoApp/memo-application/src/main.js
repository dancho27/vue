import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({ //++++?++++ 앞에 var 안써줘도 되는건가?
  el: '#app',
  store,
  render: h => h(App)
})
