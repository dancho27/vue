import Vue from 'vue'
import App from './App.vue'
import store from './store'

//root 시작
new Vue({
  el: '#app',
  store, //여기서 store에 있는 index.js를 기본으로 불러온다.
  render: h => h(App) //App.vue를 불러오겠다
})
