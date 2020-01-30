import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import PostCreatePage from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'
import AppHeader from '@/components/AppHeader'
import store from '@/store'
import actions from '../store/actions'

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
      components: {
        header: AppHeader,
        default: PostListPage
      }
    },
    {
      path: '/post/create',
      name: 'PostCreatePage',
      components:{
        header: AppHeader,
        default: PostCreatePage
      },
      beforeEnter(to, from, next){
        const { isAuthorized } = store.getters
        if(!isAuthorized){
          alert('로그인이 필요합니다!')
          next({name: 'Signin'})
        }
        next() //이게뭐지
      }
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      components: {
        header: AppHeader,
        default: PostViewPage
      },
      props:{
        default: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: AppHeader,
        default: Signup
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin //component 사용시 자동으로 이름이 없는 router-view에만 컴포넌트를 렌더한다
    },
    {
      path: '/post/:postId/edit',
      name: 'PostEditPage',
      components:{
        header: AppHeader,
        default: PostEditPage
      },
      props:{
        default: true
      },
      beforeEnter( to, from, next){
        const { isAuthorized } = store.getters
        if(!isAuthorized){
          alert('로그인이 필요합니다!!')
          next({name: 'Signin'})
          return false
        }
        store.dispatch('fetchPost', to.params.postId).then(() => {
          // next()
          const post = store.state.post
          const isAuthor = post.user.id === store.state.me.id
          if(isAuthor){
            next()
          }else{
            alert('게시물의 작성자만 게시물을 수정할 수 있습니다.')
            next(from)
          }
        })
        .catch(err => {
          alert(err.response.data.msg)
          next(from)
        })
      }
    }
  ]
})
