<template>
    <div class="post-edit-page">
        <h1>게시물 수정</h1>
        <post-edit-form v-if="post"
                        :post="post"
                        @submit = "onSubmit" />
        <p v-else>게시물 불러오는 중...</p> <!-- 게시물 데이터 없을 경우 로딩 문구-->
    </div>
</template>
<script>
import { mapState } from 'vuex'
import PostEditForm from '@/components/PostEditForm'
import api from '@/api'

export default {
    name: 'PostEditPage',
    components:{ PostEditForm },
    methods:{
        onSubmit(payload){
            const { title, contents } = payload
            api.put(`/posts/${this.postId}`, { title, contents }).then(res => {
                alert('게시물이 성공적으로 수정되었습니다.')
                this.$router.push({
                    name: 'PostViewPage',
                    params: { postId: res.data.id.toString() }
                })
            })
            .catch(err => {
                if(err.response.status === 401){ //비로그인 사용자가 게시물 수정 시도시
                    alert('로그인이 필요합니다')
                    this.$router.push({ name: 'Signin' })
                }else if(err.response.status === 403){ //사용자가 이 게시물을 수정할 권한이 없을시
                    alert(err.response.data.msg)
                    this.$router.back()
                }else{
                    alert(err.response.data.msg)
                }
            })
        }
    },
    props:{
        postId:{
            type: String,
            required: true
        }
    },
    //라우터의 beforeEnter 훅에서 스토어에 저장했던 게시물 정보를 가져온다
    computed:{
        ...mapState(['post'])
    }
}
</script>