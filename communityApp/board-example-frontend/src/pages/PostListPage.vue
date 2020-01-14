<template>
  <div class="post-list-page">
    <h1>포스트 게시글</h1>
    <post-list :posts="posts"/>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
// import api from '@/api'
import { mapActions, mapState } from "vuex";

export default{
    name: 'PostListPage',
    components: { PostList },
    // data () {
    //     return{
    //         posts: []
    //     }
    // },
    created (){
        this.fetchPostList()
    },
    methods: {
        ...mapActions(['fetchPostList'])
    },
    computed: {
        ...mapState([ 'posts' ])
    }
}
</script>