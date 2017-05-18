<template>
  <div class="table-view">
    <table  class="table table-bordered table-striped fz-14 vertical-m" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <tr>
        <td v-for="item in tableHead" class="tc b" v-html="item">
        </td>
      </tr>
      </thead>
      <tbody v-if="name === 'fd'">
      <tr v-for="row in tableRows">
        <td v-for="(item, index) in gridColumns" :class="[{ tr: index === 1 || index === 2 }, { tc: index === 0 }, { c000: index === 0 }, 'c-g6  vertical-m']">
          {{row[item]}}
        </td>
      </tr>
      </tbody>
      <tbody v-else-if="name === 'xd'">
      <tr v-for="row in tableRows">
        <td v-for="(item, index) in gridColumns" class="tr c-g6  vertical-m">
          {{row[item]}}
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr v-for="row in tableRows">
        <td v-for="(item, index) in gridColumns" class="tc c-g6  vertical-m">
          {{row[item]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/babel">
  export default {
    props: ['tableHead', 'gridColumns', 'tableRows', 'name'],
  }
</script>
