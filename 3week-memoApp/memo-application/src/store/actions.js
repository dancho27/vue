import axios from 'axios';
import { FETCH_MEMOS, ADD_MEMO, DELETE_MEMO, EDIT_MEMO } from './mutations-types';

const memoAPICore = axios.create({
    baseURL: 'http://localhost:8000/api/memos'
  });
  
export function fetchMemos({ commit }){
    memoAPICore.get('/')
        .then(res => {
            commit(FETCH_MEMOS, res.data); //여기서의 commit 은 바로 상단에서 전달받은 commit. 상단 commit 은  context.commit 으로도 쓸수있다.
        })
}
export function addMemo({ commit }, payload){ //payload에는 전달받은 객체가 들어있음.
    memoAPICore.post('/', payload)
      .then(res => {
        commit(ADD_MEMO, res.data);  //API 응답 내의 메모 데이터를 commit 메소드를 통해 변이시킨다. 
    })
}
export function deleteMemo({ commit }, id){
    memoAPICore.delete(`/${id}`)
      .then(() => {
        commit(DELETE_MEMO, id);
    })
}
export function updateMemo({ commit }, payload){
    const { id, content} = payload;
    memoAPICore.put(`/${id}`, { content })
      .then(() => {
          commit(EDIT_MEMO, payload);
      })
}

export default{
    fetchMemos,
    addMemo,
    deleteMemo,
    updateMemo
}