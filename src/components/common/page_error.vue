<template>
  <div>
    <div class="tc">
      <img src="../../assets/images/error-page.png" alt="" width="100%">
    </div>
    <div class="p-10">
      <router-link to="/"><XButton type="primary" class="m-t-20 ">返回日报页面</XButton></router-link>
    </div>
  </div>
</template>
<script>
  import { XButton } from 'vux'
  
  export default{
    components: {
      XButton,
    },
  }
</script>
