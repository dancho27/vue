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

/* 
array.slice(start, end)  : start 요소부터 end 바로 전 요소까지 선택하여 새로운 배열을 만든다(얕은복사)
                         : 음수값은 마지막 요소를 기준으로 선택  
ex)
var arr = [1, 2, 3, 4, 5, 6];
arr.slice(1,4) // 결과 :  [2, 3, 4] : 1번째 요소부터 4번째 전까지
arr.slice(2) // 결과 :  [3, 4, 5, 6] : 2번째 요소부터 끝까지
arr.slice(-4, -1) // 결과 :  [3, 4, 5] : 뒤에서 4번째 뒤부터 뒤에서 1번째 까지 

array.splice( start, count ) : 배열의 기존 요소를 삭제하거나 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.
ex)
var a = [0, 1, 2, 3, 4, 5];
var b = a.splice(2, 3); : 2번째 요소부터 3개 빼내기
var c  = [0, 1, 2, 3, 4, 5];
var c2  = a.splice(1, 2, 'abc', 'def'); : 1번째 요소부터 2개 빼내고 abc랑 def를 각각 넣어준다.

console.log(a); // 결과 : [0, 1, 5] 
console.log(b); // 결과 : [2, 3, 4]
console.log(c); // 결과 : [0, "abc", "def", 3, 4, 5]
console.log(c2); // 결과 : [1, 2]



...을 붙여주면 배열안에 요소를 배열에서 풀어준다. (spread 호출)

*/ 
</script>
<style scoped>
  .memo-list {
    padding: 20px 0;
    margin: 0;
  }
</style>