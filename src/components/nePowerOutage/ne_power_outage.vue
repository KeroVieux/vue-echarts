<template>
  <div>
    <div class="data-container">
      <div class="bg-white p-10">
        <div class="fix p-b-10">
          <span class="fz-14 l c-orange b">总体情况</span>
          <span class="r"></span>
        </div>
        <div class="fz-12">
          <table-view :table-rows="tableRowsForOverview"
                      :grid-columns="gridColumnsForOverview"
                      :table-head="tableHeadForOverview"
                      :name="'fd'">
          </table-view>
        </div>
      </div>
      <div class="m-b-15"></div>
      <div class="bg-white">
        <div class="po-rel p-t-10 p-l-10 p-r-10">
          <span class="fz-14 c-orange b">各大区情况</span>
          <span class="top-right-tx"></span>
        </div>
        <tab :line-width=2 v-model="index">
          <tab-item class="vux-center b" :selected="currentTitle === item" v-for="(item, index) in titles"
                    @click="currentTitle = item" :key="index">{{item}}
          </tab-item>
        </tab>
        <div class="p-10">
          <div v-show="index === 0">
            <div v-if="barOption.series[0].data.length < 1" class="no-chart-data">暂无数据</div>
            <div v-else>
              <IEcharts :option="barOption" :style="'height: 50vh;'"></IEcharts>
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
  import ApiMethods from '../../assets/js/apis-mixins'
  import FnMixin from '../../assets/js/fn-mixins'
  import TableView from '../common/table_view.vue'
  import TableLockedCol from '../common/table_locked_col.vue'

  export default {
    data() {
      return {
        titles: ['比例查看', '停机数量查看'],
        currentTitle: '比例查看',
        index: 0,
        selected: '4',
        tableHeadForOverview: ['停运类型', '停运台次', '停运比率 <span class="fb300">(%)</span>', '备注'],
        outageType: [
          { type: 'fjgztytc', text: '故障停运', remark: '因风机故障导致的停运' },
          { type: 'fjjxtytc', text: '检修停运', remark: '主动停运，含定检、巡检、检测、技改等' },
          { type: 'fjsltytc', text: '受累停运', remark: '因电气故障导致风机受累停运（不含限电）' },
          { type: 'bkkltytc', text: '不可抗力', remark: '因台风、低温、冰冻等不可抗力导致停运' },
          { type: 'fdjzztytc', text: '停运合计', remark: '' }],
        gridColumnsForOverview: ['type', 'num', 'percent', 'remarks'],
        tableHeadForDetails: ['区域', '运营装机台数', '风机故障停运', '风机检修停运', '风机受累停运', '不可抗力停运', '停运合计', '停运比例<span class="fb300">(%)</span>'],
        gridColumnsForDetails: ['area', 'yyts', 'fjgztytc', 'fjjxtytc', 'fjsltytc', 'bkkltytc', 'fdjzztytc', 'percent'],
      }
    },
    computed: {
      tableRowsForDetails() {
        let data = []
        if (this.$store.getters.neData) {
          const wpData = this.$store.getters.neData
          data = _.map(wpData, (item) => {
            item.periodic.area = item.ssfgs || ''
            if (item.periodic.fdjzztytc && item.periodic.yyts) {
              item.periodic.percent = `${((item.periodic.fdjzztytc / item.periodic.yyts) * 100).toFixed(2)}`
            }
            return item.periodic
          })
        }
        return data
      },
      tableRowsForOverview() {
        const wpData = this.$store.getters.neData || []
        const tableData = []
        _(this.outageType).forEach((item) => {
          tableData.push({
            type: item.text,
            num: this.sum(wpData, 'periodic', item.type),
            percent: this.sum(wpData, 'periodic', 'yyts')
                ? (((this.sum(wpData, 'periodic', item.type)) / (this.sum(wpData, 'periodic', 'yyts'))) * 100).toFixed(2)
                : 0,
            remarks: item.remark,
          })
        })
        return tableData
      },
      barOption() {
        const seriesData = []
        const legendData = []
        const wpData = this.$store.getters.neData || []
        const dayData = _.map(wpData, 'periodic')
        const yAxisData = _.map(wpData, (item) => {
          return item.ssfgs
        })
        const seriesLegend = {
          fjgztytc: '故障',
          fjjxtytc: '检修',
          fjsltytc: '受累',
          bkkltytc: '不可抗力',
        }
        _(seriesLegend).forOwn((item, key) => {
          const dataArr = []
          legendData.push(item)
          _(dayData).forEach((o) => {
            const data = ((o[key]) / (o.yyts)) || 0
            dataArr.push((data * 100).toFixed(2))
          })
          seriesData.push({
            name: item,
            type: 'bar',
            stack: '总量',
            data: dataArr,
          })
        })
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            padding: 10,
            backgroundColor: 'rgba(0,0,0,.8)',
            formatter: '{a0}: {c0}% <br >{a1}: {c1}% <br >{a2}: {c2}% <br >{a3}: {c3}%',
          },
          legend: {
            top: '10px',
            data: legendData,
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
            axisLabel: {
              formatter: '{value}%',
            },
          },
          yAxis: {
            type: 'category',
            data: yAxisData,
            axisLabel: {
              interval: 0,
            },
          },
          color: ['#E74C3C', '#0097E2', '#F39C12', '#18BC9C'],
          series: seriesData,
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
    mixins: [ApiMethods, FnMixin],
  }
</script>
