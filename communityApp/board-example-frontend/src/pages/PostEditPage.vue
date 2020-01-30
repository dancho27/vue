<template>
    <div class="post-edit-page">
        <h1>게시물 수정</h1>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'PostEditPage',
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