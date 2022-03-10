// components/myTeam/myTeamPage.js
const app = getApp()
// pages/teamDetail/teamDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择标签
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },
})