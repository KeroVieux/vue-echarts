<template>
  <div>
    <div class="p-l-10 p-r-10 fz-14">
      <div class="table-responsive m-b-0 bg-white">
        <table class="table table-bordered table-striped" cellspacing="0" cellpadding="0" border="0">
          <thead>
          <tr>
            <td v-for="item in tableHead" class="tc b" v-html="item">
            </td>
          </tr>
          </thead>
          <tbody v-if="tableRows.length > 0">
          <template v-for="row in tableRows">
            <template v-for="(item,index) in row.entitys">
              <tr v-if="index == 0">
                <td :rowspan="row.entitys.length" class="vertical-m tc bg-white">{{row[gridColumns[0]].substr(0, 2)}}</td>
                <td class="tc c-g6">{{item.entity}}</td>
                <td class="tc c-g6">{{item.unit}}</td>
                <td class="tr c-g6">{{item.capacity}}</td>
              </tr>
              <tr v-else>
                <td class="tc c-g6">{{item.entity}}</td>
                <td class="tc c-g6">{{item.unit}}</td>
                <td class="tr c-g6">{{item.capacity}}</td>
              </tr>
            </template>
          </template>
          </tbody>
          <tr v-else class="tc" height="50px">
            <td colspan="5">无{{noDataTip}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import FilterMixin from '../../assets/js/filters-mixins'

  export default{
    data() {
      return {
        tableHead: ['区域', '项目公司', '机组', '容量<span class="fb300">(MW)</span>'],
        gridColumns: ['region', 'entity', 'unit', 'capacity'],
      }
    },
    props: ['tableRows', 'noDataTip'],
    mixins: [FilterMixin],
  }
</script>
