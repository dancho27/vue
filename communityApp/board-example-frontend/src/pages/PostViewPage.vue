<template>
    <div class="post-view-page">
        <div class="post-view">
            <div>
                <h1>게시글 제목 노출</h1>
                <span>게시판 번호 1</span>
                <strong>홍길동 . 2019-01-01 09:00</strong>
            </div>
            <p>콘텐츠 내용 노출</p>
        </div>
        <router-link :to="{ name: 'PostListPage' }">목록</router-link>
    </div>
</template>
<script>
export default {
    name: 'PostViewPage'
}
</script>