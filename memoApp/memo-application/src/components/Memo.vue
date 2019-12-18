<template>
    <li class="memo-item">
        <!-- 저장 3) props로 memoAA를 받아온 후 데이타를 매칭시킨다 -->
        <strong>{{ memoAA.memoTitle }}</strong>
        <!-- 수정 1) memoText 더블클릭 이벤트 발생-->
        <p v-on:dblclick=doubleClick>
          <template v-if="!edit">{{ memoAA.memoText }}</template>
            <input  
                type="text" 
                v-else
                v-bind:value="memoAA.memoText"
                v-on:blur="outFocus"
                ref="memoTextValue"
                v-on:keydown.enter="updateMemo"/> <!-- 수정 3) value에 수정할값 입력 후 updateMemo 메소드 호출-->
        </p>
        <button type="button" v-on:click="deleteMemo"><i class="fas fa-times"></i></button>
    </li>
</template>
<script>
export default{
    name:'Memo',
    props:{
      memoAA: {
        type: Object
      }
    },
    data(){
      return{
        edit: false
      }
    },
    methods: {
      // 삭제 1) deleteMemo 클릭시 부모컴포넌트에 memoAA의 id를 넘긴다
      deleteMemo(){
          const id = this.memoAA.id;
          this.$emit('deleteMemoFunc', {id})
          
      },
      // 수정 2) edit 변수를 true로 변환하여 memoText는 숨기고 input value 노출. 그후에 nextTick 이용해서 input value에 포커싱
      doubleClick(){
        this.edit = true;
        this.$nextTick(()=>{ //데이터 변경에 따른 컴포넌트 재렌더링 순서가 보장 되지 않기 떄문에 nextTick을 사용하여 DOM 업데이트 후 처리를 할수 있다.
          this.$refs.memoTextValue.focus(); //refs로 DOM에 접근한다.
        })
      },
      outFocus(){
        this.edit = false;
      },

      // 수정 4) 수정된 data의 id와 value값을 부모에 보낸후 edit 변수를 false로 하여 input value 숨기고 memoText 노출.
      updateMemo(e){
        const id = this.memoAA.id;
        //const content = this.$refs.value; 안되는구나
        const memoText = e.target.value;
        this.$emit('updateMemoFunc', {id, memoText});
        this.edit = false;
      }

    },
}
</script>
<style scoped>
 .memo-item {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    padding: 24px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    list-style: none;
  }
  .memo-item input[type="text"] {
    border: 1px solid #ececec;
    font-size: inherit;
  }
  .memo-item button {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: #e5e5e5;
    border: 0;
    background: none;
    cursor: pointer;
  }
  .memo-item strong {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: normal;
    word-break: break-all;
  }
  .memo-item p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: #666;
  }
  .memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
  }
</style>