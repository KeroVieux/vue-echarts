<template>
  <div>
    <div class="data-container">
      <div class="bg-white p-10">
        <div class="fix p-b-10">
          <span class="fz-14 l c-orange b">总体情况</span>
          <span class="r"></span>
        </div>
        <div class="fz-12">
          <table-view :table-rows="tableRowsForOverView"
                      :grid-columns="gridColumnsForOverView"
                      :table-head="tableHeadForOverView"
                      :name="'xd'">
          </table-view>
        </div>
      </div>
      <div class="m-b-10"></div>
      <div class="bg-white">
        <div class="po-rel p-t-10 p-l-10 p-r-10">
          <span class="fz-14 c-orange b">各大区情况</span>
          <span class="top-right-tx"></span>
        </div>
        <tab :line-width=2 v-model="index">
          <tab-item class="vux-center b"
                    :selected="currentTitle === item"
                    v-for="(item, index) in titles"
                    @click="currentTitle = item"
                    :key="index">{{item}}
          </tab-item>
        </tab>
        <div class="p-10">
          <div class="" v-show="index === 0">
            <div v-if="barOption.series[0].data.length < 1" class="no-chart-data">暂无数据</div>
            <div v-else>
              <IEcharts :option="barOption" :style="'height: 40vh;'"></IEcharts>
            </div>
          </div>
          <div class="fz-12" v-show="index === 1">
            <table-locked-col :table-rows="tableRowsForDetails"
                              :grid-columns="gridColumnsForDetails"
                              :table-head="tableHeadForDetails">
            </table-locked-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import _ from 'lodash'
  import { Tab, TabItem } from 'vux'
  import IEcharts from 'vue-echarts-v3'
  import ApiMixin from '../../assets/js/apis-mixins'
  import FnMixin from '../../assets/js/fn-mixins'
  import TableView from '../common/table_view.vue'
  import TableLockedCol from '../common/table_locked_col.vue'
  
  export default {
    data() {
      return {
        titles: ['限电损失率查看', '限电损失量查看'],
        currentTitle: '限电损失率查看',
        index: 0,
        selected: '4',
        tableHeadForOverView: ['当日损失量<span class="fb300">(万kWh)</span>', '当日损失率<span class="fb300">(%)</span>', '年累损失<span class="fb300">(万kWh)</span>', '年累损失率<span class="fb300">(%)</span>'],
        gridColumnsForOverView: ['dayLossNum', 'dayLossPercent', 'yearLossNum', 'yearLossPercent'],
        tableHeadForDetails: ['区域', '当日损失<br/><span class="fb300">(万kWh)</span>', '当日限电率<span class="fb300">(%)</span>', '年累损失<br/><span class="fb300">(万kWh)</span>', '年累限电率<span class="fb300">(%)</span>'],
        gridColumnsForDetails: ['area', 'dayLossNum', 'dayLossPercent', 'yearLossNum', 'yearLossPercent'],
      }
    },
    methods: {
    },
    computed: {
      tableRowsForOverView() {
        let wpData = []
        if (this.$store.getters.neData) {
          wpData = this.$store.getters.neData
        }
        let dayLossNumData = 0
        let dayLossPercentData = 0
        let yearLossNumData = 0
        let yearLossPercentData = 0
        if (wpData) {
          dayLossNumData = (this.sum(wpData, 'periodic', 'fjxdl') / 10000).toFixed(2)
          dayLossPercentData = (this.sum(wpData, 'periodic', 'fjfdl'))
            ? (((this.sum(wpData, 'periodic', 'fjxdl')) / (this.sum(wpData, 'periodic', 'fjfdl'))) * 100).toFixed(2)
            : 0.00
          yearLossNumData = this.sum(wpData, 'ytd', 'fjxdl')
            ? (this.sum(wpData, 'ytd', 'fjxdl') / 10000).toFixed(2)
            : 0.00
          yearLossPercentData = this.sum(wpData, 'ytd', 'fjxdl')
            ? ((parseFloat(this.sum(wpData, 'ytd', 'fjxdl') / this.sum(wpData, 'ytd', 'fjfdl')) || 0) * 100).toFixed(2)
            : 0.00
        }
        return [{
          dayLossNum: dayLossNumData,
          dayLossPercent: dayLossPercentData,
          yearLossNum: yearLossNumData,
          yearLossPercent: yearLossPercentData,
        }]
      },
      tableRowsForDetails() {
        const tableData = []
        let wpData = []
        if (this.$store.getters.neData) {
          wpData = this.$store.getters.neData
          _(wpData).forEach((item) => {
            tableData.push({
              area: item.ssfgs,
              dayLossNum: item.periodic.fjxdl
                ? (item.periodic.fjxdl / 10000).toFixed(2)
                : 0,
              dayLossPercent: item.periodic.xfhl
                ? parseFloat(item.periodic.xfhl).toFixed(2)
                : 0,
              yearLossNum: item.ytd.fjxdl
                ? (item.ytd.fjxdl / 10000).toFixed(2)
                : 0,
              yearLossPercent: item.ytd.xfhl
                ? parseFloat(item.ytd.xfhl).toFixed(2)
                : 0,
            })
          })
        }
        return tableData
      },
      barOption() {
        const series1Data = []
        const series2Data = []
        let wpData = []
        let xAxisData = []
        if (this.$store.getters.neData) {
          wpData = this.$store.getters.neData.filter((o) => {
            return o.ssfgs === '华北大区' || o.ssfgs === '北方大区' || o.ssfgs === '东北大区' || o.ssfgs === '中西大区' || o.ssfgs === '公司整体情况'
          })
          xAxisData = _.map(wpData, (item) => {
            return item.ssfgs
          })
          _(wpData).forEach((item) => {
            series1Data.push((item.periodic.fjfdl)
              ? ((item.periodic.fjxdl / item.periodic.fjfdl) * 100).toFixed(2) : 0)
            series2Data.push(((item.ytd.fjxdl / item.ytd.fjfdl) * 100).toFixed(2) || 0)
          })
        }
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            position: 'bottom',
            padding: 10,
            backgroundColor: 'rgba(0,0,0,.8)',
            formatter: '{b0}{a0}: {c0}%<br />{b1}{a1}: {c1}%',
          },
          legend: {
            bottom: '10px',
            data: ['当日限电损失率', '年累限电损失率'],
          },
          grid: {
            top: '10px',
            left: '0%',
            right: '7%',
            bottom: '60px',
            containLabel: true,
          },
          xAxis: {
            interval: 0,
            type: 'category',
            data: xAxisData,
            axisLabel: {
              rotate: 25,
              interval: 0,
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%',
            },
          },
          color: ['#18BC9C', '#F39C12'],
          series: [
            {
              name: '当日限电损失率',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                },
              },
              splitNumber: 1,
              data: series1Data,
            },
            {
              name: '年累限电损失率',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                },
              },
              data: series2Data,
            },
          ],
        }
      },
    },
    components: {
      Tab,
      TabItem,
      TableView,
      TableLockedCol,
      IEcharts,
    },
    mixins: [FnMixin, ApiMixin],
  }
</script>
