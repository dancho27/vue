<template>
    <div class="memo-app">
        <memo-form v-on:addMemoFunc="addMemo"></memo-form>
        <ul class="memo-list">
            <!-- 저장 2) memos[]에 있는 데이타를 for문으로 렌더한다-->
            <memo v-for="memoZZ in memos"
                  :key="memoZZ.id"
                  :memoAA="memoZZ"
                  v-on:deleteMemoFunc="deleteMemo"
                  v-on:updateMemoFunc="updateMemo"></memo> <!-- 삭제 2) deleteMemoFunc 호출시 deteMemo 메소드 실행시킨다-->
        </ul>
    </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';

export default{
    name:'MemoApp',
    components: {
        MemoForm,
        Memo
    },
    data(){
        return{
            memos:[]
        }
    },
    methods:{
        // 저장 1) addMemo,storeMemo  => memos[]에 추가할 데이터를 넣는다
        addMemo(payload){
            this.memos.push(payload);
            //console.log(this.memos);
            this.storeMemo();
        },
        storeMemo(){
            const memosToString = JSON.stringify(this.memos);
            //const memosToString = this.memos;
            //console.log("memoToString : " + memosToString);
            localStorage.setItem('memos', memosToString);
        },
        // 삭제 3) 전달받은 id와 memos에 있는 id 매칭후 memos[] 해당 id 제거후에 다시 storeMemo을 하여 setItem 한다.
        deleteMemo(payload){
            //alert('deleteMemoFunc실행되써요');
            const targetIndex = this.memos.findIndex(v => v.id === payload);
            this.memos.splice(targetIndex, 1);
            this.storeMemo();
        },
        // 수정 5) 전달받은 id와 memos에 있는 id 매칭 후, 매칭된 id의 데이타에 수정된 memoText를 넣어준다.
        updateMemo(payload){
            const { id, memoText} = payload;
            const targetIndex = this.memos.findIndex(v => v.id === id);
            const updatedMemo = this.memos[targetIndex];
            this.memos.splice(targetIndex, 1, { ...updatedMemo, memoText });
            this.storeMemo();
        }

    }
}
</script>
<style scoped>
  .memo-list {
    padding: 20px 0;
    margin: 0;
  }
</style>