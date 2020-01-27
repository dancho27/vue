<template>
    <div class="sign-in-page">
        <h3>로그인</h3>
        <signin-form @submit="onSubmit" />
        <p>회원이 아니신가요? <router-link :to="{ name: 'Signup' }">회원가입하러 가기</router-link></p>
    </div>
</template>
<script>
import SigninForm from '@/components/SigninForm'
//import api from '@/api'
import { mapActions } from 'vuex'

export default{
    name: 'Signin',
    components:{
        SigninForm
    },
    methods:{
        onSubmit(payload){
            this.signin(payload)
                .then(res => {
                    //사용자에게 로그인 성공을 알려주고 메인페이지로 이동
                    alert('로그인이 완료되었습니다.')
                    this.$router.push({ name: 'PostListPage' })
                })
                .catch(err => {
                    alert(err.response.data.msg)
                })

            // const { email, password } = payload
            // api.post('/auth/signin', { email, password })
            //   .then(res => {
            //       //로그인 성공하면 api 모듈의 HTTP헤더에 토근을 담는다.
            //       const { accessToken } = res.data
            //       // api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

            //       //사용자에게 로그인 성공을 알려주고 메인페이지로 이동
            //       alert('로그인이 완료되었습니다.')
            //       this.$router.push({ name: 'PostListPage' })
            //   })
            //   .catch(err => {
            //       alert(err.response.data.msg)
            //   })

        },
        ...mapActions([ 'signin' ])
    }
}
</script>