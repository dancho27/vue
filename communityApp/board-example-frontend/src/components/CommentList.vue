<template>
    <ul class="comments">
        <li v-for="comment in comments" :key="comment.id">
            <!-- <div class="comment-item">
                <strong>{{ comment.user.name }}</strong><span>{{ comment.createdAt }}</span>
                <p>{{comment.contents}}</p>
            </div> -->
            <comment-item :comment="comment"/>
        </li>
        <li v-if="comments.length <= 0">
            입력된 댓글이 없습니다.
        </li>
    </ul>
</template>
<script>
import CommentItem from "@/components/CommentItem";

export default {
    name: 'CommentList',
    components:{ CommentItem },
    props: {
        comments: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>