<template>
    <div class="memo-app">
        <memo-form></memo-form>
        <ul class="memo-list">
            <memo></memo>
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
        addMemo(payload){
            this.memos.push(payload);
            alert(this.memos);
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