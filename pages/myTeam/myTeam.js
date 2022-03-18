// components/myTeam/myTeamPage.js
const app = getApp()
// pages/teamDetail/teamDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: 0,
    listData: {from:'myTeam',topTabCur:1},
    swiperContainerH: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        // 修改列表容器的高度
        const that = this
        const query = wx.createSelectorQuery()
        query.select('#swiperContainer').boundingClientRect()
        query.exec(function (res) {
          that.setData({
            swiperContainerH: wx.getSystemInfoSync().windowHeight - res[0].top
          })
        })
  },
  // 选择标签
  tabSelect(e) {
    let listData = this.data.listData
    listData.topTabCur = e.currentTarget.dataset.id;
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      listData: listData
    })
  },
  // 滑动suiper,下标变化时更改活动标签
  swiperCurChange(e) {
    this.setData({
      tabCur: e.detail.current
    })

  },
})