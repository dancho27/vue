<template>
    <div class="app-header"> <!-- 해당 컴포넌트를 AppHeader.vue네이밍에서 앞에 App을 붙인 이유는. header만 했을 시 태그header로 이해하여 header html만 부르는 것으로 생각할 수 있다. 그래서 컴포넌트라는걸 알리기 위해 앞에 App을 붙여주는 방식이 있다.-->
        <h1>메모 애플리케이션</h1>
        <p><strong>{{ getMemoCount }}</strong> 개</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default{
    name: 'AppHeader',
    computed: {
        ...mapGetters([
            'getMemoCount' //getters.js에 있는 getMemoCount
        ])
    }
};
</script>
<style scoped>
.app-header {
    overflow: hidden;
    padding: 52px 0 27px;
}
.app-header h1 {
    float: left;
    font-size: 24px;
    text-align: center;
}
.app-header p {
    float: right;
    padding-top: 6px;
    font-size: 18px;
    vertical-align: bottom;
}
.app-header p strong {
    color: #ff5a00;
}
</style>