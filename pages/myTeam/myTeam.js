// components/myTeam/myTeamPage.js
const app = getApp()
const request = require("../../utils/util.js").request
const processTeamList = require("../../utils/util.js").processTeamList
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: 0,
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
    this.getTeamList(0);
  },
  // 选择标签
  tabSelect(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      tabCur: id,
      teamList: []
    })
    this.getTeamList(parseInt(id));
  },
  // 请求队伍列表
  getTeamList(type){
    this.setData({
      isLoad: true
    })
    var url,data,that=this;
    if(type===0){
      url = '/team/listOwn';
      data = {is_leader: true};
    }else if(type===1){
      url = '/team/listOwn';
      data = {is_leader: false};
    }else{
      url = '/team/listApply'
      data = {}
    }
    request(url,'POST',data).then(
      (res)=>{
        console.log(res);
        var teamList = processTeamList(res.data.data);
        console.log(teamList);
        that.setData({
          isLoad: false,
          teamList: teamList
        })
      },
      (error)=>{
        console.log(error);
      }
    )
  },
  stopTouchMove(){
    return false
  },
  // 滑动suiper,下标变化时更改活动标签
  swiperCurChange(e) {
    this.setData({
      tabCur: e.detail.current
    })

  },
})