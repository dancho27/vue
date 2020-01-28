<template>
    <div class="app-header">
        <h1>Community</h1>
        <div v-if="isAuthorized">
            <strong>
                <button>{{ me.name }}님 환영합니다.</button>
            </strong>
        </div>
        <div v-else>
            <router-link :to="{ name: 'Signin' }">로그인</router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'AppHeader',
    computed:{
        ...mapGetters(['isAuthorized']),
        ...mapState(['me'])
    }
}
</script>