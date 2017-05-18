<template>
  <div id="app">
    <PageHeader></PageHeader>
    <div class="p-t-30"></div>
    <div class="p-t-20"></div>
    <transition name="fade-fast">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
  @import '../src/assets/sass/screen.css';
</style>
<!--suppress CssUnknownTarget -->
<style lang="less">
  @import '~vux/src/styles/reset';
</style>
<script type="text/babel">
  import PageHeader from './components/common/page_header.vue'
  import ApiMixin from './assets/js/apis-mixins'
  import FnMixin from './assets/js/fn-mixins'

  export default {
    name: 'app',
    components: {
      PageHeader,
    },
    data() {
      return {
        data: null,
      }
    },
    mixins: [
      ApiMixin,
      FnMixin,
    ],
    created() {
      this.$vux.loading.show({
        text: '加载中...',
      })
    },
  }
</script>
