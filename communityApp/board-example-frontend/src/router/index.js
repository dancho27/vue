import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'

Vue.use(Router)

/*
history mode? 
vue-router의 기본 모드는 hash mode 입니다. 
URL 해시를 사용하여 전체 URL을 시뮬레이트하므로 URL이 변경될 때 페이지가 다시 로드 되지 않습니다.
해시를 제거하기 위해 라우터의 history 모드 를 사용할 수 있습니다. 
history.pushState API를 활용하여 페이지를 다시 로드하지 않고도 URL 탐색을 할 수 있습니다.
*/
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: PostListPage
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      component: PostViewPage,
      props: true
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
