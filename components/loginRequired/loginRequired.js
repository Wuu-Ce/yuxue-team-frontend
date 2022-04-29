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
    // 跳转到手机号登录界面
    jumpToSignTel(){
      wx.navigateTo({
        url: '../../pages/signInTel/signInTel',
      })
    }

  }
})
