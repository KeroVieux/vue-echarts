<template>
  <div class="bg-white">
    <tab :line-width=2 v-model="index">
      <tab-item class="vux-center b" :selected="currentTitle === item" v-for="(item, index) in titles"
                @click="currentTitle = item" :key="index" v-html="item">
      
      </tab-item>
    </tab>
    <div v-show="index === 0">
      <div class="tab-swiper p-b-10 p-l-10 p-r-10">
        <div class=""></div>
        <!--<ChartView :dataOption="dataOption"></ChartView>-->
        <div class="no-chart-data" v-if="dataOption.series[0].data.length === 0">暂无数据</div>
        <div v-else>
          <IEcharts :option="dataOption" :style="'height: 50vh;'"></IEcharts>
        </div>
      </div>
    </div>
    <div v-show="index === 1">
      <div class="tab-swiper p-b-10 m-t-10 p-l-10 p-r-10">
        <MachineRunTablePercent :machineRunData="machineRun"></MachineRunTablePercent>
      </div>
    </div>
    <div v-show="index === 2">
      <div class="tab-swiper p-b-10 m-t-10 p-l-10 p-r-10 ">
        <MachineRunTable :machineRunData="machineRun"></MachineRunTable>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import _ from 'lodash'
  import IEcharts from 'vue-echarts-v3'
  import FnMixin from '../../assets/js/fn-mixins'
  import TableForMachinesError from '../machinesError/table_for_machineserror.vue'
  import MachineRunTable from './machinerun_table.vue'
  import MachineRunTablePercent from './machinerun_table_percent.vue'
  //  import testData from '../../../static/testData.json'

  export default{
    data() {
      return {
        titles: ['柱状图', '比例查看<span class="fb300">(%)</span>', '容量查看<span class="fb300">(MW)</span>'],
        currentTitle: '柱状图',
        index: 0,
      }
    },
    computed: {
      notStopTableRows() {
        const machinesErrorData = this.$store.getters.hdData.machineTable
        return this.groupRegion(machinesErrorData.notstopData)
      },
      stopTableRows() {
        const machinesErrorData = this.$store.getters.hdData.machineTable
        return this.groupRegion(machinesErrorData.stopData)
      },
      repairTableRows() {
        const machinesErrorData = this.$store.getters.hdData.machineTable
        return this.groupRegion(machinesErrorData.repairData)
      },
      machineRun() {
        return this.$store.getters.hdData ? this.$store.getters.hdData.machineRun : []
      },
      dataOption() {
        const self = this
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            padding: 10,
            backgroundColor: 'rgba(0,0,0,.8)',
            formatter: (obj) => {
              const index = obj[0].dataIndex
              const data = self.machineRun[index]
              return `<div>
                        <div>装机总量: ${data.allCapacity}</div>
                        <div>机组非停：${data.notStopCapacity}</div>
                        <div>机组检修：${data.repairCapacity}</div>
                        <div>正常运行：${data.normalCapactivy}</div>
                       </div>`
            },
          },
          legend: {
            top: '10px',
            data: ['正常', '调停', '检修', '非停'],
          },
          grid: {
            top: '60px',
            left: '0%',
            right: '7%',
            bottom: '20px',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: this.getDatas('area'),
            axisLabel: {
              interval: 0,
            },
          },
          color: ['#18BC9C', '#F39C12', '#E74C3C', '#0097E2'],
          series: [
            {
              name: '正常',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('normal'),
            },
            {
              name: '调停',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('stop'),
            },
            {
              name: '非停',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('notStop'),
            },
            {
              name: '检修',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('repaire'),
            },
          ],
        }
      },
    },
    methods: {
      buidScatterSeries() {
        const data = this.machineRun
        const arr = []
        _(this.machineRun).forEach((item, index) => {
          const temp = {
            name: data[index][0][7],
            data: data[index],
            type: 'scatter',
            symbolSize: (localData) => {
              return Math.sqrt(localData[3]) / 3
            },
          }
          arr.push(temp)
        })
        return arr
      },
      getDatas(type) {
        const arr = []
        switch (type) {
          case 'area':
            _(this.machineRun).forEach((item) => {
              const areaShortName = item.region.substr(0, 2)
              arr.push(areaShortName)
            })
            break
          case 'machine':
            _(this.machineRun).forEach((item) => {
              arr.push(item.allCapacity)
            })
            break
          case 'notStop':
            _(this.machineRun).forEach((item) => {
              arr.push(item.notStopCapacity)
            })
            break
          case 'stop':
            _(this.machineRun).forEach((item) => {
              arr.push(item.stopCapacity)
            })
            break
          case 'repaire':
            _(this.machineRun).forEach((item) => {
              arr.push(item.repairCapacity)
            })
            break
          default:
            _(this.machineRun).forEach((item) => {
              arr.push(item.normalCapactivy)
            })
            break
        }
        return arr
      },
    },
    mounted() {
    },
    props: ['data'],
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      TableForMachinesError,
      MachineRunTable,
      MachineRunTablePercent,
      IEcharts,
    },
    mixins: [FnMixin],
  }
</script>
