<template>
  <div>
    <div class=" fz-14">
      <div class="m-t-10 bg-white">
        <table class="table table-bordered table-striped" cellspacing="0" cellpadding="0" border="0">
            <thead>
            <tr>
                <td v-for="item in tableHead" class="tc b" v-html="item">
                </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in tableRows">
                <td class="tc">
                    {{row[gridColumns[0]]  | saveFloat}}
                </td>
                <td class="tr c-g6">
                    {{row[gridColumns[1]]  | saveFloat}}
                </td>
                <td class="tr c-g6">
                    {{row[gridColumns[2]]  | saveFloat}}
                </td>
                <td class="tr c-g6">
                    {{calPercent(row[gridColumns[1]], row[gridColumns[2]])}}
                </td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import FilterMixin from '../../assets/js/filters-mixins'

  export default{
    props: ['tableRows'],
    mixins: [FilterMixin],
    data() {
      return {
        tableHead: ['', '今年<span class="fb300">(亿kWh)</span>', '去年同期<span class="fb300">(亿kWh)</span>', '同比<span class="fb300">(%)</span>'],
        gridColumns: ['colType', 'thisYear', 'lastYear', 'yearBasis'],
      }
    },
    methods: {
      calPercent(thisYear, lastYear) {
        let thisNum = null
        let lastNum = null
        if (_.isNumber(thisYear)) {
          thisNum = _.ceil(thisYear, 2)
        }
        if (_.isNumber(lastYear)) {
          lastNum = _.ceil(lastYear, 2)
        }
        if (_.isNumber(thisNum) && _.isNumber(lastNum)) {
          return `${((thisNum / lastNum) * 100).toFixed(2)}`
        }
        return '暂无数据'
      },
    },
  }
</script>
