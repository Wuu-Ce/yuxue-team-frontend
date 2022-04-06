const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    tabCur: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowInfo  = wx.getWindowInfo();
    this.setData({
      scrollHeight: windowInfo.windowHeight-this.data.CustomBar
    })
  },

  changeTab: function(e){
    var tabCur = e.currentTarget.dataset.id;
    this.setData({
      tabCur: tabCur
    })

  }
})