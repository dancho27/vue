<template>
    <li class="memo-item">
        <strong>{{ memo.title }}</strong>
        <p @dblclick="handleDblClick">
            <template v-if="!isEditing">{{ memo.content }}</template> <!-- ★template 쓰임새 확인 -->
            <input v-else 
                type="text"
                ref="content"
                :value="memo.content"
                @blur="handleBlur"
                @keydown.enter="updateMemo"/>
        </p>
        <button type="button" @click="deleteMemo"><i class="fas fa-times"></i></button>
    </li>
</template>
<script>
export default{
    name: 'Memo',
    data(){
        return{
            isEditing: false
        }
    },
    props: {
        memo: {
            type: Object // ★object 대소문자 주의..
        }
    },
    methods:{
        deleteMemo(){
            const id = this.memo.id;
            this.$emit('deleteMemo', id);
        },
        handleDblClick(){
            this.isEditing = true;
            this.$nextTick(()=> {
                this.$refs.content.focus(); //데이터 변경에 따른 컴포넌트 재렌더링 순서가 보장 되지 않아서 $refs.content에 접근할 수 없다. 이때 nextTick을 이용해서 해결할 수 있다.
            })
        },
        updateMemo(e){
            const id = this.memo.id;
            const content = e.target.value.trim(); // ★쓰임 확인
            if(content.length <= 0){
                return false;
            }
            this.$emit('updateMemo', {id, content});
            this.isEditing = false;
        },
        handleBlur(){
            this.isEditing = false;
        }
    }
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