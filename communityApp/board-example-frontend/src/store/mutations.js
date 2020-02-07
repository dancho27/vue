/*
- Mutations의 주요 목적은 state를 변경시키는 역할을 합니다. (Mutations을 통해서만 state를 변경해야 함)
- 비동기 처리가 아니라 동기처리를 합니다. 위의 함수가 실행되고 종료된 후 그 다음 아래의 함수가 실행됩니다.
- commit('함수명', '전달인자')으로 실행 시킬 수 있습니다.
- mutations 내에 함수 형태로 작성합니다.
*/

import { 
    FETCH_POST_LIST,
    FETCH_POST,
    SET_ACCESS_TOKEN,
    SET_MY_INFO,
    DESTROY_ACCESS_TOKEN,
    DESTROY_MY_INFO,
    UPDATE_COMMENT,
    EDIT_COMMENT
} from './mutations-types'
import api from '@/api'
import Cookies from 'js-cookie'

export default{
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts
    },
    [FETCH_POST] (state, post){
        state.post = post
    },
    [SET_ACCESS_TOKEN] (state, accessToken){
        if(accessToken){
            state.accessToken = accessToken
            api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
            Cookies.set('accessToken', accessToken)
        }
    },
    [SET_MY_INFO] (state, me){
        if(me){
            state.me = me
        }
    },
    [DESTROY_ACCESS_TOKEN] (state){    
        state.accessToken = ''
        delete api.defaults.headers.common.Authorization
        Cookies.remove('accessToken')
    },
    [DESTROY_MY_INFO] (state){
        state.me = null
    },
    [UPDATE_COMMENT](state, payload){
        state.post.comments.push(payload)
    },
    [EDIT_COMMENT](state, payload){
        const { id: commentId, contents, updatedAt } = payload
        const targetComment = state.post.comments.find(comment => comment.id === commentId)
        targetComment.contents = contents
        targetComment.updatedAt = updatedAt
    }
}