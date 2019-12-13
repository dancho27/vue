import Vue from 'vue'
import App from './App.vue'
import store from './store'

<<<<<<< HEAD
new Vue({ //++++?++++ 앞에 var 안써줘도 되는건가?
=======
//root 시작
new Vue({
>>>>>>> 04195b47beb6b6da429f396efbe0985c607027d7
  el: '#app',
  store, //여기서 store에 있는 index.js를 기본으로 불러온다.
  render: h => h(App) //App.vue를 불러오겠다
})
