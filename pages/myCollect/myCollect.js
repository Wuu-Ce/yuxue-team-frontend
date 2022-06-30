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
    var url = '/collect/list';
    request(url,'POST',{}).then(
      (res)=>{
        console.log(res);
        var collectLst = res.data.data;
        var teamList = [];
        for(let i=0;i<collectLst.length;i++){
          teamList.push(collectLst[i].team)
        }
        var teamList = processTeamList(teamList);
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