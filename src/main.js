/**
 * @file Make this project worked .
 * @author Dino Chiu <bigboss@hidoge.cn>
 * @requires Vue
 * @requires VueRouter
 * @requires VeeValidate
 * @requires Moment
 * @requires ./assets/js/validate-zh
 * @requires ./vuex/store
 * @requires vuex-router-sync.sync
 * @requires ./routes
 * @requires ./App.vue
 */
import axios from 'axios'
import Vue from 'vue'
import { ToastPlugin, LoadingPlugin, AlertPlugin } from 'vux'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import Moment from 'moment'
import { sync } from 'vuex-router-sync'
import VeeValidateCn from './assets/js/validate-zh'
import store from './vuex/store'
import FnMixin from './assets/js/fn-mixins'

import routes from './routes'
import App from './App.vue'

const _ = require('lodash')

Moment.locale('zh-CN')
_.assign(window, {
  _,
  Vue,
  store,
  Moment,
  axios,
  usertoken: null,
  rtpToken: null,
  currentUser: null,
})
// from: FnMixin.methods.urlParamToObj().from ? FnMixin.methods.urlParamToObj().from : 'rooyee',
// userid: FnMixin.methods.urlParamToObj().userid ? FnMixin.methods.urlParamToObj().userid : null,
// usertoken: FnMixin.methods.urlParamToObj().usertoken
// ? FnMixin.methods.urlParamToObj().usertoken : null,
// appcode: FnMixin.methods.urlParamToObj().appcode
// ? FnMixin.methods.urlParamToObj().appcode : null,
// userid: window.userid,
// usertoken: window.usertoken,
// appcode: window.appcode,
// from: window.from,
if (FnMixin.methods.urlParamToObj().rtp_token) {
  window.rtpToken = FnMixin.methods.urlParamToObj().rtp_token
} else if (location.href.indexOf('rtp_token=') !== -1) {
  const str = location.href
  window.rtpToken = str.substring(str.indexOf('rtp_token=') + 10, str.length)
}
const vueInit = () => {
  Vue.use(VueRouter)
  Vue.use(ToastPlugin)
  Vue.use(LoadingPlugin)
  Vue.use(AlertPlugin)
  Vue.use(VeeValidate, {
    locale: 'zh_CN',
    dictionary: {
      zh_CN: {
        messages: VeeValidateCn,
      },
    },
  })

  // axios.defaults.baseURL = globalArg.apiUrl
  const router = new VueRouter({
    // mode: 'history',
    routes,
  })
  sync(store, router)
  _.assign(window, {
    router,
  })
  Vue.config.devtools = true
  const app = new Vue({
    store,
    router,
    render: (h) => {
      return h(App)
    },
  }).$mount('App')
  _.assign(window, {
    app,
  })
}
vueInit()
