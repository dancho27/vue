<template>
    <div class="post-view-page">
        <!-- <div class="post-view">
            <div>
                <h1>게시글 제목 노출</h1>
                <span>게시판 번호 1</span>
                <strong>홍길동 . 2019-01-01 09:00</strong>
            </div>
            <p>콘텐츠 내용 노출</p>
        </div> -->
        <post-view v-if="post" :post="post"/>
        <p v-else>게시글 불러오는 중...</p>
        <router-link :to="{ name: 'PostEditPage', params: { postId } }">수정</router-link>
        <router-link :to="{ name: 'PostListPage' }">목록</router-link>
    </div>
</template>
<script>
import {  mapState, mapActions } from 'vuex'
import PostView from '@/components/PostView'

export default {
    name: 'PostViewPage',
    components: { PostView },
    props:{
        postId: {
            type: String,
            required: true
        }
    },
    created(){
        this.fetchPost(`/${this.postId}`)
            .catch(err => {
                alert(err.response.data.msg) //에러발생시 메세지 노출 후
                this.$router.back() // 이전페이지로 보내준다.
            })
    },
    methods: {
        ...mapActions(['fetchPost'])
    },
    computed:{
        ...mapState([ 'post' ])
    }
}
</script>