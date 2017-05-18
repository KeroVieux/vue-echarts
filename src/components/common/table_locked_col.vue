<template>
  <div class="table-view m-t-10" :id="tableViewId">
    <table class="table table-bordered table-striped fixed-table-left fz-14" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <tr class="left-table-head">
        <td class="tc b vertical-m" v-html="tableHead[0]">
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in tableRows">
        <td class="tc">
          {{row[gridColumns[0]]}}
        </td>
      </tr>
      </tbody>
    </table>
    <table class="table table-bordered table-striped fixed-table-content" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <tr class="content-table-head" >
        <td v-for="item in tableHead" class="tc b fz-14 vertical-m" v-html="item">
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in tableRows">
        <td v-for="(item, index) in gridColumns" :class="[{tc: index === 0}, 'tr c-g6 fz-14']">
          {{row[item] || 0}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/babel">
  import Moment from 'moment'

  export default {
    computed: {
      tableViewId() {
        return `table-view-${Moment().millisecond()}`
      },
    },
    props: ['tableHead', 'gridColumns', 'tableRows', 'tableContentWidth'],
  }
</script>
