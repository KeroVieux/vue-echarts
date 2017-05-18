<template>
  <div>
    <div class="machineRunTable">
      <table class="table table-bordered table-striped fz-14" cellspacing="0" cellpadding="0" border="0">
        <thead class="b tc">
        <tr>
          <td class="t-head vertical-m">大区</td>
          <td class="t-head vertical-m">装机<br/>容量</td>
          <td class="t-head vertical-m">非停<br/>容量</td>
          <td class="t-head vertical-m">调停<br/>容量</td>
          <td class="t-head vertical-m">检修<br/>容量</td>
          <td class="t-head vertical-m">正常<br/>容量</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in machineRunData">
          <td class="tx-c tc">{{item.region.substr(0,2)}}</td>
          <td class="tx-c tr c-g6">{{item.allCapacity}}</td>
          <td class="tx-c tr c-g6">{{item.notStopCapacity}}</td>
          <td class="tx-c tr c-g6">{{item.stopCapacity}}</td>
          <td class="tx-c tr c-g6">{{item.repairCapacity}}</td>
          <td class="tx-c tr c-g6">{{item.normalCapactivy}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    props: ['machineRunData'],
  }
</script>
