<template>
  <div>
    <div class="p-l-10 p-r-10 fz-12">
      <div class="table-responsive m-b-0 bg-white">
        <table class="table table-bordered table-striped" cellspacing="0" cellpadding="0" border="0">
            <thead>
            <tr>
                <td v-for="item in tableHead" class="tc">
                    {{item}}
                </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in tableRows">
                <td v-for="item in gridColumns">
                    {{row[item]}}
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
    props: ['tableHead', 'gridColumns', 'tableRows'],
    mixins: [FilterMixin],
  }
</script>
