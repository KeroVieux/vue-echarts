<template>
  <div>
    <x-header :left-options="{showBack: false}" :right-options="{showMore: false}" @on-click-more="showMenus = true" style="width:100%;position:fixed;left:0;top:0;z-index:999;">
      <a slot="left">关闭</a>
      {{reportDate}}日报
    </x-header>
    <actionsheet :menus="acMenus" v-model="showMenus" show-cancel></actionsheet>
  </div>
</template>
<script type="text/babel">
  import { XHeader, Actionsheet } from 'vux'

  export default{
    components: {
      XHeader,
      Actionsheet,
    },
    data() {
      return {
        pageTitle: '顶部组件',
        pathName: null,
        acMenus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos',
        },
        showMenus: false,
      }
    },
    computed: {
      reportDate() {
        return this.$store.getters.reportDate
      },
    },
    methods: {
      closeApp() {
        location.href = 'xmppapi:localservice?closeWindow'
      },
      handleBack() {
        history.back()
      },
    },
  }
</script>
