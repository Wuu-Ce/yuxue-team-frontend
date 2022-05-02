const { request } = require("../../utils/util")

// components/reportTeam/reportTeam.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tid: String,
    teamName: String,
    show: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal() {
      this.setData({
        show: false
      })
    },
    // 微信登录
    wechatLogin(){
      this.hideModal();
      var that = this;
      wx.login({
        success(res){
          if(res.code){
            request('/auth/wx/login','POST',{code:res.code}).then(
              (res)=>{
                wx.showToast({
                  title: '登录成功',
                })
                wx.setStorageSync('cookie', res.cookies[0])
                wx.setStorageSync('ifLogin', true)
                that.triggerEvent('refreshInfo', {}, {})  //  重新请求个人信息接口
                that.triggerEvent('refreshIfLogin', {}, {})  // 刷新登录状态
              },
              (error)=>{
                console.log(error);
                if(error.code===10102){
                  wx.showModal({
                    title: '当前微信未绑定账户',
                    content: '请先使用手机号登录',
                    success(res){
                      if(res.confirm){
                        wx.navigateTo({
                          url: '/pages/signInTel/signInTel',
                        })
                      }
                    }
                  })
                }
              }
            )
          }
        }
      })
    },
    // 跳转到手机号登录界面
    jumpToSignTel(){
      this.hideModal();
      wx.navigateTo({
        url: '../../pages/signInTel/signInTel',
      })
    }

  }
})
