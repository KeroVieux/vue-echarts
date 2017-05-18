<template>
  <div class="bg-white">
    <tab :line-width=2 v-model="index">
      <tab-item class="vux-center b" :selected="currentTitle === item" v-for="(item, index) in titles"
                @click="currentTitle = item" :key="index">{{item}}
        <span v-if="index === 0">({{notStopNum}})</span>
        <span v-if="index === 1">({{stopNum}})</span>
        <span v-if="index === 2">({{repairNum}})</span>
      </tab-item>
    </tab>
    <div v-show="index === 0">
      <div class="tab-swiper p-b-10">
        <div class="tc p-b-10">
        </div>
        <TableForMachinesError :table-rows="notStopTableRows" :noDataTip="'非调停机组'">
        </TableForMachinesError>
      </div>
    </div>
    <div v-show="index === 1">
      <div class="tab-swiper p-b-10">
        <div class="tc p-b-10">
        </div>
        <TableForMachinesError :table-rows="stopTableRows" :noDataTip="'调停机组'">
        </TableForMachinesError>
      </div>
    </div>
    <div v-show="index === 2">
      <div class="tab-swiper p-b-10">
        <div class="tc p-b-10">
        </div>
        <TableForMachinesError :table-rows="repairTableRows" :noDataTip="'检修机组'">
        </TableForMachinesError>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import { Tab, TabItem } from 'vux'
  import FnMixin from '../../assets/js/fn-mixins'
  import TableForMachinesError from './table_for_machineserror.vue'

  export default{
    data() {
      return {
        titles: ['非调停机组', '调停机组', '检修机组'],
        currentTitle: '非调停机组',
        index: 0,
      }
    },
    computed: {
      notStopTableRows() {
        let data = []
        if (this.$store.getters.hdData) {
          data = this.groupRegion(this.$store.getters.hdData.machineTable.notstopData)
        }
        return data
      },
      stopTableRows() {
        let data = []
        if (this.$store.getters.hdData) {
          data = this.groupRegion(this.$store.getters.hdData.machineTable.stopData)
        }
        return data
      },
      repairTableRows() {
        let data = []
        if (this.$store.getters.hdData) {
          data = this.groupRegion(this.$store.getters.hdData.machineTable.repairData)
        }
        return data
      },
      notStopNum() {
        let num = 0
        if (this.$store.getters.hdData) {
          num = this.$store.getters.hdData.machineTable.notstopData.length
        }
        return num
      },
      stopNum() {
        let num = 0
        if (this.$store.getters.hdData && this.$store.getters.hdData.machineTable.stopData) {
          num = this.$store.getters.hdData.machineTable.stopData.length
        }
        return num
      },
      repairNum() {
        let num = 0
        if (this.$store.getters.hdData && this.$store.getters.hdData.machineTable.repairData) {
          num = this.$store.getters.hdData.machineTable.repairData.length
        }
        return num
      },
    },
    props: ['data'],
    components: {
      Tab,
      TabItem,
      TableForMachinesError,
    },
    mixins: [FnMixin],
  }
</script>
