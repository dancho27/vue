<template>
  <div class="memo-form">
    <form @submit.prevent = "addMemo">
      <fieldset>
        <div>
          <input class="memo-form__title-form"
                 type="text"
                 v-model="title"
                 placeholder="메모의 제목을 입력해주세요."/>
          <textarea class="memo-form__content-form"
                    v-model="content"
                    placeholder="메모의 내용을 입력해주세요."/>
          <button type="reset"><i class="fas fa-sync-alt"></i></button>
        </div>
        <button type="submit">등록하기</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MemoForm',
  data () {
      return{
          title :'',
          content: '',
      }
  },
  methods:{
    resetFields(){
      this.title = '';
      this.content = '';
    },
    addMemo(){
        // const id = new Date().getTime();
        const { title, content } = this; //this로 할당
        const isEmpty = title.length <= 0 || content.length <= 0;
        if(isEmpty){
            return false;
        }    
        //this.$emit('addMemo', {id, title, content}); 
        // ★ addMemo 이벤트 발생시키고 id, title, content를 부모컴포넌트(MemoApp.vue)에 넘긴다.
        // ★ 그럼 부모컴포넌트(MemoApp.vue)에서 <memo-form @addMemo="addMemo"/> 이렇게 연결을 해서 addMemo 메소드를 받은 데이타를 가지고 실행시킬 수 있다. 
        this.$emit('addMemo', {title, content});
        this.resetFields();
    }
  }
}
</script>

<style scoped>
  .memo-form {
    margin-bottom: 24px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;
  }
  .memo-form form fieldset div {
    position: relative;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }
  .memo-form form fieldset div button[type="reset"] {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 16px;
    background: none;
  }
  .memo-form form fieldset button[type="submit"] {
    float: right;
    width: 96px;
    padding: 12px 0;
    border-radius: 4px;
    background-color: #ff5a00;
    color: #fff;
    font-size: 16px;
  }
  .memo-form form fieldset .memo-form__title-form {
    width: 100%;
    margin-bottom: 12px;
    font-size: 18px;
    line-height: 26px;
  }
  .memo-form form fieldset .memo-form__content-form {
    width: 100%;
    height: 66px;
    font-size: 14px;
    line-height: 22px;
    vertical-align: top;
  }
  .memo-form input:focus {
    outline: none;
  }
</style>