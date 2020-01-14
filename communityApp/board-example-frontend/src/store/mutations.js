/*
- Mutations의 주요 목적은 state를 변경시키는 역활을 합니다. (Mutations을 통해서만 state를 변경해야 함)
- 비동기 처리가 아니라 동기처리를 합니다. 위의 함수가 실행되고 종료된 후 그 다음 아래의 함수가 실행됩니다.
- commit('함수명', '전달인자')으로 실행 시킬 수 있습니다.
- mutations 내에 함수 형태로 작성합니다.
*/

import { 
    FETCH_POST_LIST,
    FETCH_POST
} from './mutations-types'

export default{
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts
    },
    [FETCH_POST] (state, post){
        state.post = post
    }
}