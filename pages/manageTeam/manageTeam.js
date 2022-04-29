import {
  request,
  getClass,
  classification,
  __formatTime
} from "../../utils/util"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件展示
    showMemberPop: false,
    popType: '',

    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,
    team:{
      tid: '10000001',
      teamName: '予学团队',
      createTime: '2022年3月24日',
      icon: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg',
      classification: ['竞赛', '计算机'],
      customClass: '微信小程序应用开发大赛',
      
      neccessary: {
        // type: 'fast',
        // detail: '测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。',
        type: 'normal',
        detail: [
          {area: '计算机-前端', num: 2, need: '能使用微信开发者工具制作小程序'},
          {area: '绘画，UI设计', num: 2,need: '有绘画基础，能制作插图、UI'},
          {area: '数据库', num: 2, need: '能够熟练操作数据库'},
          {area: '计算机-前端', num: 2, need: '能开发web页面'},
        ],
        num: 4,
      },
      goal: '上线第一个月增长5000名用户',
      teamAbout: '很多同学在竞赛、项目等组队时会遇到选人上的困难，很难遇到一群志同道合的人共同去做一件事。而即便是熟人组队的项目，往往也很难凑齐一个项目所需的各个方向的技能，这个时候就需要跨领域，甚至跨专业的组队。',
      teamProtocol: '团队成员相互配合，按时、按标准完成任务',
      members: [
        {name: '李浩', icon:  'https://team.test.yuxue0824.com/static/avatar/user/20.jpg'},
        {name: '张锋', icon:  'https://team.test.yuxue0824.com/static/avatar/user/1.jpg'},
        {name: '王东强', icon:  'https://team.test.yuxue0824.com/static/avatar/user/3.jpg'},
        {name: '李艳', icon:  'https://team.test.yuxue0824.com/static/avatar/user/9.jpg'},
        {name: '吴卫', icon:  'https://team.test.yuxue0824.com/static/avatar/user/6.jpg'},
        {name: '熊锋', icon:  'https://team.test.yuxue0824.com/static/avatar/user/12.jpg'},
        {name: '单一鸣', icon:  'https://team.test.yuxue0824.com/static/avatar/user/4.jpg'},

      ],
      collected: false,
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const team_id = parseInt(options.team_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    // 获取队伍详情
    getTeamDetail(team_id) {
      const that = this
      const classRes = []
      let teamInfo = {}
      const getInfo = () => {
        if (getClass(teamInfo.field_id, classification, classRes, 0)) {
          classRes.shift()
          teamInfo.classification = classRes
          teamInfo.createtime = __formatTime(teamInfo.createtime * 1000, "Y年M月D日")
        }
      }
      const rest = request('/team/detail', 'POST', {
        team_id: team_id
      })
      rest.then(
        res => {
          const data = res.data.data
          if (res.data.code === 0) {
            teamInfo = data
            getInfo()
            that.setData({
              team: teamInfo
            })
            console.log(teamInfo)
          }
        },
        res => {
          wx.showToast({
            icon: 'error',
            title: '加载失败',
            duration: 2000
          })
          console.log(res)
        })
    },
    // 展示队伍面板
    showMemberPop(e) {
      console.log(e)
      const type = e.currentTarget.dataset.type
      console.log('showMemberPop called')
      this.setData({
        showMemberPop: true,
        popType: type
      })
    },
    hiddenMemberPop(e) {
      this.setData({
        showMemberPop: false
      }) 
    }
})