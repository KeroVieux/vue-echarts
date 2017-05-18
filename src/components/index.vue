<template>
  <div class="pos-rel" style="z-index: 1">
    <div v-if="bulletins.length">
      <div class="m-b-10"></div>
      <divider>重点事项</divider>
      <Bulletin :data="bulletins" class=" m-t-10"></Bulletin>
      <div class="m-b-15"></div>
    </div>
    <divider>发电量总览</divider>
    <div class="bg-white p-10 m-t-10">
      <h4 class="m-0 n  fz-14 c-red b">火电</h4>
      <TableForGeneration :table-rows="generation.fireTableRows" v-if="generation">
      </TableForGeneration>
    </div>
    <div class="m-b-15"></div>
    <div class="bg-white p-10">
      <h4 class="m-0 n fz-14 c-green b">新能源</h4>
      <TableForGeneration :table-rows="generation.newEnergyTableRows" v-if="generation">
      </TableForGeneration>
    </div>
    <div class="m-b-15"></div>
    <divider>火电异常机组总览</divider>
    <div class="m-b-10"></div>
    <MachinesError :data="errorMachinesData"></MachinesError>
    <div class="m-b-15"></div>
    <divider>火电总体机组运行情况</divider>
    <div class="m-b-10"></div>
    <div class="bg-white p-b-10">
      <div v-if="noPieData" class="no-chart-data"> 暂无数据 </div>
      <div v-else>
        <IEcharts :option="allMachinesOption" :style="'height: 50vh;'"></IEcharts>
      </div>
    </div>
    <div class="m-b-15"></div>
    <divider>各大区火电机组运行情况</divider>
    <div class="m-b-10"></div>
    <MachinesAll :data="errorMachinesData"></MachinesAll>
    <div class="m-b-15"></div>
    <divider>风电机组停运情况</divider>
    <div class="m-b-10"></div>
    <div class="">
      <WindPowerOutage></WindPowerOutage>
    </div>
    <div class="m-b-15"></div>
    <divider>风电限电损失情况</divider>
    <div class="m-b-10"></div>
    <div class="">
      <PowerLoss></PowerLoss>
    </div>
  </div>
</template>
<script type="text/babel">

  import { Divider } from 'vux'
  import _ from 'lodash'
  import Moment from 'moment'
  import IEcharts from 'vue-echarts-v3'
  import FnMixin from '../assets/js/fn-mixins'
  import ApiMixin from '../assets/js/apis-mixins'
  import Bulletin from './elements/bulletin.vue'
  import TableForGeneration from './generation/table_for_generation.vue'
  import TableDefault from './common/table_default.vue'
  import MachinesError from './machinesError/machines_error.vue'
  import MachinesAll from './machinesAll/machines_all.vue'
  import WindPowerOutage from './nePowerOutage/ne_power_outage.vue'
  import PowerLoss from './powerLoss/power_loss.vue'
  import NeData from '../../faker/ne.json'
  import HdData from '../../faker/hd.json'
  
  export default{
    data() {
      return {
        data: null,
        reqParams: null,
        loadingState: true,
        noPieData: false,
      }
    },
    methods: {
      getRouterDate() {
        return this.$route.params
      },
      onHide() {
        this.reqParams.year = Moment().year()
        this.reqParams.month = Moment().month() + 1
        this.reqParams.day = Moment().date() - 1
        const yesterDay = `${this.reqParams.year}/${this.reqParams.month}/${this.reqParams.day}`
        this.$router.push(`/${yesterDay}?rtp_token=1`)
      },
    },
    computed: {
      bulletins() {
        let titleList = []
        if (this.$store.getters.hdData) {
          titleList = this.$store.getters.hdData.titleList || []
        }
        return titleList
      },
      generation() {
        let generationData = []
        if (this.$store.getters.hdData) {
          generationData = this.$store.getters.hdData.generation || []
        }
        const energyData = []
        const fireData = []
        _(generationData).forEach((item) => {
          energyData.push(_(item).find({ entity: '新能源' }))
          fireData.push(_(item).find({ entity: '火电' }))
        })
        return {
          fireTableRows: this.combineData(fireData),
          newEnergyTableRows: this.combineData(energyData),
        }
      },
      errorMachinesData() {
        let machineTable = []
        if (this.$store.getters.hdData) {
          machineTable = this.$store.getters.hdData.machineTable || []
        }
        return machineTable
      },
      allMachinesOption() {
        let machineAll = []
        if (this.$store.getters.hdData) {
          machineAll = this.$store.getters.hdData.machineAll || []
        }
        if (machineAll.normalMachineNum === 0
          && machineAll.stopMachineNum === 0
          && machineAll.repairMachineNum === 0
          && machineAll.notStopMachineNum === 0) {
          this.noPieData = true
        }
        const legend = { normalMachineNum: '正常运行', stopMachineNum: '机组调停', repairMachineNum: '机组检修', notStopMachineNum: '非调停机组' }
        const legendData = []
        const seriesData = []
        _(legend).forOwn((item, key) => {
          legendData.push(item)
          seriesData.push({
            name: item,
            value: machineAll[key] || 0,
          })
        })
        return {
          color: ['#18BC9C', '#F39C12', '#0097E2', '#E74C3C'],
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              let str = null
              if (params.seriesIndex === 0) {
                str = `${params.name} ${params.percent}%`
              } else {
                str = `${params.name} ${params.value}`
              }
              return str
            },
          },
          legend: {
            orient: 'horizontal',
            bottom: '0',
            data: legendData,
          },
          series: [
            {
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              label: {
                normal: {
                  position: 'inner',
                  textStyle: {
                    color: '#333',
                  },
                },
              },
              itemStyle: {
                normal: {
                  label: {
                    normal: {
                      position: 'inner',
                    },
                    formatter: '{d}%',
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
              data: seriesData,
            },
            {
              type: 'pie',
              radius: ['45%', '60%'],
              label: {
                normal: {
                  position: 'inner',
                  textStyle: {
                    color: '#333',
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  label: {
                    normal: {
                      position: 'inner',
                      show: true,
                    },
                    formatter: '{c}',
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
              data: seriesData,
            },
          ],
        }
      },
    },
    created() {
      this.$store.dispatch('neData', NeData)
      this.$store.dispatch('hdData', HdData.result)
      this.$vux.loading.hide()
//      this.reqParams = this.$route.params
//      if (this.reqParams.year) {
//        const reqParamsDate = Moment(`${this.reqParams.year}-${this.reqParams.month}
// -${this.reqParams.day}`, 'YYYY-MM-DD')
//        if (Moment().isBefore(reqParamsDate)) {
//          this.$vux.alert.show({
//            title: '提示',
//            content: `${this.reqParams.year}-
// ${this.reqParams.month}-${this.reqParams.day} 暂无日报内容`,
//            onShow() {
//              console.log('Plugin: I\'m showing')
//            },
//            onHide() {
//              console.log('Plugin: I\'m hiding')
//            },
//          })
//        }
//        this.parseUrlData(this.reqParams)
//        _.assign(this.reqParams, {
//          rtp_token: window.rtpToken ? window.rtpToken : '',
//        })
//        const req = () => {
//          return Promise.all([this.getHdData(this.reqParams), this.getNeData(this.reqParams)])
//        }
//        req().then((res) => {
//          const [hdData, neData] = res
//          this.$store.dispatch('neData', neData.data)
//          this.$store.dispatch('hdData', hdData.data.result)
//          this.$vux.loading.hide()
//        }).catch((err) => {
//          console.log('err', err)
//          this.$vux.loading.hide()
//          this.$vux.alert.show({
//            title: '提示',
//            content: '获取数据失败',
//            onShow() {
//              console.log('Plugin: I\'m showing')
//            },
//            onHide() {
//              console.log('Plugin: I\'m hiding')
//            },
//          })
//        })
//      } else {
//        this.$vux.alert.show({
//          title: '提示',
//          content: '缺少时间参数',
//          onShow() {
//            console.log('Plugin: I\'m showing')
//          },
//          onHide() {
//            console.log('Plugin: I\'m hiding')
//          },
//        })
//        this.$vux.loading.hide()
//      }
//      this.getUserName(window.rtpToken).then((res) => {
//        let userName = 'admin'
//        let logTypeId = 7
//        let logdescription = '异常日志'
//        if (res.username) {
//          userName = res.username
//          logTypeId = 6
//          logdescription = '正常操作日志'
//        }
//        const params = {
//          request_name: '登录系统',
//          request_path: 'http://218.18.9.149:19000/sis_report/service/dev/dailyreporthd/api/report',
//          request_params: {
//            usertoken: window.rtpToken,
//            userid: '',
//            appcode: 'crp_sys_name_request',
//          },
//          created_by: userName,
//          request_description: logdescription,
//          sys_name_id: 17,
//          log_type_id: logTypeId,
//          operate_type_id: 9,
//          request_method_id: 12,
//        }
//        this.sendLog(params).then((response) => {
//          console.log('发送 log 后返回', response.result)
//        })
//      })
//      this.getLogConfigure().then((res) => {
//        console.log(res)
//        const logConfigure = null
//        if (res.data.result) {
//          _.assign(logConfigure,
// _.find(_.find(res.data.result, { name: '系统名称' }).children, { name: '生产日报表' }))
//        }
//        console.log('发送的 log 内容', params)
//        this.sendLog(params).then((response) => {
//          console.log('发送 log 后返回', response)
//        }).catch((err) => {
//          console.log(err)
//        })
//      }).catch(() => {
//        this.sendLog(params).then((response) => {
//          console.log('发送 log 后返回', response)
//        })
//      })
    },
    components: {
      Divider,
      Bulletin,
      TableForGeneration,
      TableDefault,
      MachinesError,
      MachinesAll,
      WindPowerOutage,
      PowerLoss,
      IEcharts,
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
