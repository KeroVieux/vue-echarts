/**
 * Created by PetitKero on 13/10/2016.
 */
/**
 * This provides mixins used for common api in the Vue components.
 * Before you begin to used it , plz inject this mixins in the components
 * like mixins: [ApiMixin]
 *
 * @mixin
 */

import QueryString from 'querystring'

const ApiMixin = {
  handleCatchError(req) {
    // if (req.data && req.data.error) {
    this.$vux.toast.show({
      type: 'text',
      text: req.data && req.data.error ? req.data.error : '未知错误',
    })
    // }
    // return req.data.error
  },
  async getOtherData(params) {
    return axios.post(`${globalArg.apiUrl}/${globalArg.contextPath}report`, params)
    // try {
    //   const res = await axios.post(`/${globalArg.contextPath}report`, params)
    //   return res.data
    // } catch (err) {
    //   this.handleCatchError(err)
    //   return err
    // }
  },
  async getHdData(params) {
    return axios.post(`${globalArg.apiUrl}/${globalArg.hdPath}`, params)
    // try {
    //   const res = await axios.post(`/${globalArg.hdPath}`, params)
    //   return res.data
    // } catch (err) {
    //   this.handleCatchError(err)
    //   return err
    // }
  },
  async getNeData(params) {
    return axios.get(`${globalArg.apiUrl}/${globalArg.nePath}/${params.year}/${params.month}/${params.day}`)
    // try {
    //   const res = await axios
    // .get(`/${globalArg.nePath}/${params.year}/${params.month}/${params.day}`)
    //   return res.data
    // } catch (err) {
    //   this.handleCatchError(err)
    //   return err
    // }
  },
  async sendBroadcast(target) {
    const date = `/${target.year}/${target.month}/${target.day}`
    return axios.get(`${globalArg.apiUrl}/${globalArg.broadcastPath}${date}?users=${target.users}`)
    // try {
    //   const date = `/${target.year}/${target.month}/${target.day}`
    //   const res = await axios.get(`/${globalArg.broadcastPath}${date}?users=${target.users}`)
    //   return res.data
    // } catch (err) {
    //   this.handleCatchError(err)
    //   return err
    // }
  },
  async getBroadcastUsers() {
    return axios.get(`${globalArg.apiUrl}/${globalArg.broadcastPath}/users`)
    // try {
    //   const res = await axios.get(`/${globalArg.broadcastPath}/users`)
    //   return res.data
    // } catch (err) {
    //   this.handleCatchError(err)
    //   return err
    // }
  },
  async getUserName(token) {
    try {
      const res = await axios.get(`${globalArg.apiUrl}/${globalArg.getUserNamePath}?rtp_token=${token}`)
      return res.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async getLogConfigure() {
    try {
      const res = await axios.get(`${globalArg.getLogCfgPath}`)
      return res.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
  async sendLog(paramsObj) {
    try {
      const res = await axios.post(`${globalArg.sendLogPath}`, QueryString.stringify(paramsObj))
      return res.data
    } catch (err) {
      this.handleCatchError(err)
      return err
    }
  },
}

export default {
  created() {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  },
  methods: ApiMixin,
}
