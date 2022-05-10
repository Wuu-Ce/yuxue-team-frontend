const request = require("../../utils/util.js").request
const processTeamList = require("../../utils/util.js").processTeamList;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var user_id = options.user_id;
    this.setData({
      user_id: user_id
    })
    // 修改列表容器的高度
    const that = this
    const query = wx.createSelectorQuery()
    query.select('.scrollViewContainer').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        scrollViewContainerH: wx.getSystemInfoSync().windowHeight - res[0].top
      })
    })
  },
  onReady(){
    this.getTeamList();
  },
  // 请求团队列表
  getTeamList(){
    this.setData({
      isLoad: true
    })
    var that=this;
    var user_id = this.data.user_id
    var url = '/team/listOwn';
    var data = {is_leader: false, user_id: user_id};
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

  
})