<template>
  <div>
    <div class="machineRunTable">
      <table class="table table-bordered table-striped fz-14" cellspacing="0" cellpadding="0" border="0">
        <thead class="b fz-14 tc vertical-m">
        <tr>
          <td class="vertical-m">大区</td>
          <td class="vertical-m">装机<br/>容量</td>
          <td class="vertical-m">非停<br/>比例</td>
          <td class="vertical-m">调停<br/>比例</td>
          <td class="vertical-m">检修<br/>比例</td>
          <td class="vertical-m">正常<br/>比例</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in machineRunData">
          <td class="tc">{{item.region.substr(0,2)}}</td>
          <td class="tr c-g6">{{item.allCapacity}}</td>
          <td class="tr c-g6">{{((item.notStopCapacity / item.allCapacity) * 100).toFixed(2)}}</td>
          <td class="tr c-g6">{{((item.stopCapacity / item.allCapacity) * 100).toFixed(2)}}</td>
          <td class="tr c-g6">{{((item.repairCapacity / item.allCapacity) * 100).toFixed(2)}}</td>
          <td class="tr c-g6">{{((item.normalCapactivy / item.allCapacity) * 100).toFixed(2)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    data() {
      return {
      }
    },
    props: ['machineRunData'],
  }
</script>
