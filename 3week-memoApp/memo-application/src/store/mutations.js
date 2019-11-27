//const FETCH_MEMOS = 'FETCH_MEMOS';
import { FETCH_MEMOS, 
         ADD_MEMO, 
         DELETE_MEMO, 
         EDIT_MEMO,
         SET_EDITING_ID,
         RESET_EDITING_ID } from './mutations-types';

export default{
    [FETCH_MEMOS](state, payload){
        state.memos = payload;
    },
    [ADD_MEMO](state, payload){
        state.memos.push(payload);
    },
    [DELETE_MEMO](state, id){
        const targetIndex = state.memos.findIndex(v => v.id === id);
        state.memos.splice(targetIndex, 1); //메모 상태는 MemoApp 컴포넌트가 아닌 스토어의 상태로 관리하고 있으므로 this.memos -> state.memos로 변경
    },
    [EDIT_MEMO](state, payload){
        const { id, content} = payload;
        const targetIndex = state.memos.findIndex(v => v.id === id);
        const targetMemo = state.memos[targetIndex];
        state.memos.splice(targetIndex, 1, { ...targetIndex, content});
    },
    [SET_EDITING_ID](state, id){
        state.editingId= id
    },
    [RESET_EDITING_ID](state){
        state.editingId= 0 //수정중인 데이터가 없는 경우 임의의 초기값 0으로 설정
    }
}

