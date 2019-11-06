<template>
  <div class="memo-app">
    <memo-form @addMemo="addMemo"/>
    <ul class="memo-list">
      <memo v-for="memo in memos"
            :key="memo.id"
            :memo="memo" 
            @deleteMemo="deleteMemo"
            @updateMemo="updateMemo"
            :editingId="editingId"
            @setEditingId="SET_EDITING_ID"
            @resetEditingId="RESET_EDITING_ID"/>
    </ul>
  </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';
import axios from 'axios';
import {mapActions, mapState, mapMutations } from 'vuex';
import {RESET_EDITING_ID, SET_EDITING_ID} from '../store/mutations-types';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
});

export default {
  name: 'MemoApp',
  components: {
    MemoForm,
    Memo
  },
  // data () {
  //     return{
  //         memos : [],
  //     };
  // },
  methods:{
    ...mapActions([
      'fetchMemos',
      'addMemo',
      'deleteMemo',
      'updateMemo'
    ]),
    ...mapMutations([
      SET_EDITING_ID,
      RESET_EDITING_ID
    ]),
    // addMemo(payload){
    //   memoAPICore.post('/', payload)
    //   .then(res => {
    //     this.memos.push(res.data);
    //   })
    // },
    storeMemo(){
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem('memos',memosToString); //★setItem 확인
    },
    // deleteMemo(id){
    //   const targetIndex = this.memos.findIndex(v => v.id === id);
    //   memoAPICore.delete(`/${id}`) //삭제 대상과 일치하는 id값을 delete 메소드와 함께 요청
    //     .then(() => {
    //       this.memos.splice(targetIndex, 1); //요청 후 memoApp 컴포넌트의 memos 데이터에서도 삭제
    //     })
    // },
    // updateMemo(payload){
    //   const { id, content} = payload;
    //   const targetIndex = this.memos.findIndex(v => v.id === id);
    //   const targetMemo = this.memos[targetIndex];
    //   memoAPICore.put(`${id}`, { content }) //수정 대상과 일치하는 id값과 수정된 단락에 대한 데이터를 delete put과 함께 요청
    //     .then(() => {
    //       this.memos.splice(targetIndex, 1 , { ...targetMemo, content}); //요청후 memoApp 컴포넌트의 memos 데이터에서도 해당 데이터 업데이트
    //     });
    // }
  },
  created () {
      // memoAPICore.get('/')
      //   .then(res => {
      //   this.memos = res.data;
      // })
      this.fetchMemos();
  },
  computed: {
    ...mapState([
      'memos',
      'editingId'
    ])
  }
};
</script>

<style scoped>
  .memo-list {
    padding: 20px 0;
    margin: 0;
  }
</style>