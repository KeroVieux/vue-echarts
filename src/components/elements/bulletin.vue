<template>
  <div class="p-10 fz-14 bg-white">
    <p class="p-t-5 p-b-5" v-for="(item, index) in data"><i class="fa fa-dot-circle-o c-orange"></i> {{item}} </p>
  </div>
</template>
<script type="text/babel">
  import { Divider, Card } from 'vux'

  export default{
    components: {
      Divider,
      Card,
    },
    props: ['data'],
    data() {
      return {
        header: {
          title: '重点事项',
        },
      }
    },
  }
</script>
