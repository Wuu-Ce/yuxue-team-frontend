// pages/teamDetail/teamDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 展示更多菜单
    moreMenuShow: false,
    reportModalShow: false,
    hideTeamGoal: true,
    hideTeamProtocol:true,
    hideTeamAbout: true,
    // 队伍信息
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
          {area: '前端开发', num: 2, need: '熟悉小程序开发'},
          {area: 'UI设计', num: 2,need: '有一定的美术功底，能设计出精美的界面'},
          {area: '后端开发', num: 2, need: '熟悉java或python或PHP的后端框架'},
          {area: '法律', num: 2, need: '有过编写用户隐私协议、免责声明的经验'},
        ],
        num: 6,
      },
      goal: '上线第一个月增长5000名用户',
      teamAbout: '很多同学在竞赛、项目等组队时会遇到选人上的困难，很难遇到一群志同道合的人共同去做一件事。而即便是熟人组队的项目，往往也很难凑齐一个项目所需的各个方向的技能，这个时候就需要跨领域，甚至跨专业的组队。',
      teamProtocol: '团队成员相互配合，按时、按标准完成任务',
      members: [
        {name: '队长', icon:  'https://team.test.yuxue0824.com/static/avatar/user/20.jpg'},
        {name: '成员二长度测试', icon:  'https://team.test.yuxue0824.com/static/avatar/user/1.jpg'},
        {name: '成员三', icon:  'https://team.test.yuxue0824.com/static/avatar/user/3.jpg'},
        {name: '成员一', icon:  'https://team.test.yuxue0824.com/static/avatar/user/9.jpg'},
        {name: '成员二', icon:  'https://team.test.yuxue0824.com/static/avatar/user/6.jpg'},
        {name: '成员三', icon:  'https://team.test.yuxue0824.com/static/avatar/user/12.jpg'},
        {name: '成员一', icon:  'https://team.test.yuxue0824.com/static/avatar/user/4.jpg'},
        {name: '成员二', icon:  'https://team.test.yuxue0824.com/static/avatar/user/19.jpg'},
        {name: '成员三', icon:  'https://team.test.yuxue0824.com/static/avatar/user/18.jpg'},
        {name: '成员一', icon:  'https://team.test.yuxue0824.com/static/avatar/user/17.jpg'},
        {name: '成员二', icon:  'https://team.test.yuxue0824.com/static/avatar/user/13.jpg'},
        {name: '成员三', icon:  'https://team.test.yuxue0824.com/static/avatar/user/16.jpg'},
      ],
      collected: false,
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 展示更多菜单
  showMoreMenu() {
    this.setData({
      moreMenuShow: !this.data.moreMenuShow
    })
  },
  // 缩略队伍介绍
  hideTeamAbout() {
    this.setData({
      hideTeamAbout: !this.data.hideTeamAbout
    })
  },
  // 缩略队伍目标
  hideTeamGoal() {
    this.setData({
      hideTeamGoal: !this.data.hideTeamGoal
    })
  },
  // 缩略队伍规约
  hideTeamProtocol() {
    this.setData({
      hideTeamProtocol: !this.data.hideTeamProtocol
    })
  },
  
  // 举报队伍
  reportTeam() {
    this.setData({
      reportModalShow: true,
      moreMenuShow: false
    })
  },
  // 收藏
  onClickCollect(){
    let team = this.data.team
    team.collected = !team.collected
    this.setData({
      team: team
    })
    if(team.collected) {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '已取消',
        icon: 'success',
        duration: 1000
      })
    }
  },
})