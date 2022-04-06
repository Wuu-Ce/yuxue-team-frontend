// pages/user/home/home.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToMyTeam() {
      wx.navigateTo({
        url: '/pages/myTeam/myTeam',
      })
    },
    jumpToModifyMyInfo(){
      wx.navigateTo({
        url: '/pages/modifyMyInfo/modifyMyInfo',
      })
    },
    jumpToMessage(){
      wx.navigateTo({
        url: '/pages/message/message',
      })
    },
    jumpToCode(){
      wx.navigateTo({
        url: '/pages/getCode/code',
      })
    }
  }
})
