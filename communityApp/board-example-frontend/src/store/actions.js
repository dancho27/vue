/*
- Actions의 주요 목적은 Mutations를 실행시키는 역할을 합니다. Mutations이 실행되면 state도 변경이 되겠지요.
- 동기 처리가 아니라 비동기처리를 합니다. 순서에 상관없이 먼저 종료된 함수의 피드백을 받아 후속 처리를 하게 됩니다.
- dispatch('함수명', '전달인자')으로 실행 시킬 수 있습니다. ex) dispatch('함수명', '전달인자', {root:true})
- actions 내에 함수 형태로 작성합니다.
- 비동기 처리이기 때문에 콜백함수로 주로 작성합니다.
*/

import api from '@/api'
import { 
    FETCH_POST_LIST ,
    FETCH_POST,
    SET_ACCESS_TOKEN,
    SET_MY_INFO
} from './mutations-types'

export default{
    fetchPostList({ commit }){
        return api.get('/posts')
            .then(res => {
                commit(FETCH_POST_LIST, res.data)
            })
    },
    fetchPost({ commit }, postId ){
        return api.get(`/posts/${postId}`)
            .then(res => {
                commit(FETCH_POST, res.data)
            })
    },
    signin ({ commit }, payload){
        const { email, password } = payload
        return api.post('/auth/signin', { email, password })
            .then(res => {
                const { accessToken } = res.data
                commit(SET_ACCESS_TOKEN, accessToken)

                //사용자 정보 요청
                return api.get('/users/me')
            }).then(res=>{
                //사용자 정보 요청이 성공했다면 변이를 사용하여 스토어에 사용자 정보를 저장
                commit(SET_MY_INFO, res.data)
            }) 
    },
    signinByToken({ commit }, token){
        commit(SET_ACCESS_TOKEN, token)
        return api.get('/users/me').then(res => {
            commit(SET_MY_INFO, res.data)
        })
    }
}