// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

// const savedToken = Cookies.get('accessToken')
// if(savedToken){
//   store.dispatch('signinByToken', savedToken)
// }

function init(){
  const savedToken = Cookies.get('accessToken')
  if(savedToken){
    //저장된 토큰이 존재하면 signinByToken 액션을 반환
    return store.dispatch('signinByToken', savedToken)
  }else{
    //토큰이 존재하지 않는다면 바로 Promise를 성공시킨다.
    return Promise.resolve()
  }
}


init().then(res => {
  // init 함수의 then 체이닝 메소드 내부는 init 함수가 종료되었음을 보장받는다
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
  })
})

