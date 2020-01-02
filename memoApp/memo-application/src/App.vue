<template>
  <div id="app">
    <app-header></app-header>
    <memo-App></memo-App>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MemoApp from './components/MemoApp';

export default {
  name: 'app',
  components: {
    AppHeader,
    MemoApp
  }
}
</script>

<style>
@import "./styles/reset.css";

#app {
  width: 560px;
  margin:0 auto;
}

</style>
