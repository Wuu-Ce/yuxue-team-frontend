const app = getApp()
const request = require("../../utils/util.js").request
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    tabCur: 0,
    showLoginRequired: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowInfo  = wx.getWindowInfo();
    this.setData({
      scrollHeight: windowInfo.windowHeight-this.data.CustomBar
    })
    request('/notify/list','POST',{type:1}).then(
      (res)=>{
        console.log(res);
        this.setData({
          messageList: res.data.data
        })
      }
    )
  },
  // 选择标签
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },
  // changeTab: function(e){
  //   var tabCur = e.currentTarget.dataset.id;
  //   this.setData({
  //     tabCur: tabCur
  //   })

  // }
})