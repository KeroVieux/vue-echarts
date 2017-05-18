<template>
  <div>
    <toast v-model="toastErr" type="text" :time="1000">推送失败</toast>
    <toast v-model="toastSuccess" type="success">操作成功</toast>
    <group>
      <datetime v-model="broadcastAt" title="推送日期"></datetime>
    </group>
    <card>
      <div slot="content" class="p-10">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">
              {{broadcastAt}}
            </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <div class="flex-demo tr">
              <x-button mini type="primary" @click.native="sendAll">全部发送</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </card>
    <group title="可推送的用户" v-if="users && users.length">
      <cell :title="user" v-for="user in users">
        <div slot="value">
          <x-button mini type="default" @click.native="sendSingle(user)">发送</x-button>
        </div>
      </cell>
    </group>
    <card v-else>
      <div slot="content" class="p-10 tc">
        没有可以推送的用户
      </div>
    </card>
  </div>
</template>
<script type="text/babel">
  import { XButton, Flexbox, FlexboxItem, Datetime, Cell, Group, Card, Toast, Loading } from 'vux'
  import Moment from 'moment'
  import _ from 'lodash'
  import ApiMixin from '../../assets/js/apis-mixins'

  export default{
    data() {
      return {
        users: null,
        sending: false,
        toastErr: false,
        toastSuccess: false,
        broadcastAt: Moment().subtract(1, 'days').format('L'),
      }
    },
    methods: {
      sendHandle(target) {
        this.sendBroadcast(target).then((res) => {
          console.log('推送结果', res)
          this.$vux.loading.hide()
          if (!res.data.error) {
            this.toastSuccess = true
          } else {
            this.toastErr = true
          }
        }).catch((err) => {
          console.log('err', err)
          this.$vux.loading.hide()
          this.toastErr = true
        })
      },
      sendSingle(username) {
        this.$vux.loading.show({
          text: 'Loading',
        })
        const moment = Moment(this.broadcastAt)
        const target = {
          users: username,
          year: moment.get('year'),
          month: moment.get('month') + 1,
          day: moment.get('date'),
        }
        console.log('发送的参数', target)
        this.sendHandle(target)
      },
      sendAll() {
        this.$vux.loading.show({
          text: 'Loading',
        })
        const moment = Moment(this.broadcastAt)
        const target = {
          users: '',
          year: moment.get('year'),
          month: moment.get('month') + 1,
          day: moment.get('date'),
        }
        _(this.users).forEach((item) => {
          target.users += `${item},`
        })
        console.log('发送的参数', target)
        this.sendHandle(target)
      },
    },
    created() {
      this.getBroadcastUsers().then((res) => {
        this.users = res.data.result
        console.log('users', this.users)
        this.$vux.loading.hide()
      })
    },
    components: {
      XButton,
      Flexbox,
      FlexboxItem,
      Datetime,
      Cell,
      Group,
      Card,
      Toast,
      Loading,
    },
    mixins: [ApiMixin],
  }
</script>
