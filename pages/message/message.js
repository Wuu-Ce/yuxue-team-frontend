const app = getApp()
const checkCookieValid = require('../../utils/util.js').checkCookieValid
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

    // checkCookieValid().then(
    //   (res)=>{
    //     if(res){
    //       // 加载数据，setData
    //     }else{
    //       // 弹窗
    //       this.setData({
    //         showLoginRequired: true
    //       })
    //     }
    //   }
    // )
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