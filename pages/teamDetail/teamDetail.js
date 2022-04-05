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
      teamName: '匿名的马可波罗',
      createTime: '2022年3月24日',
      icon: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      classification: ['竞赛', '计算机'],
      customClass: '网络技术挑战赛',
      
      neccessary: {
        // type: 'fast',
        // detail: '测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。',
        type: 'normal',
        detail: [
          {area: '计算机-前端', num: 2, need: '要求说明'},
          {area: '绘画，UI设计', num: 2,need: '要求说明'},
          {area: '数据库', num: 2, need: '要求说明'},
          {area: '数据库', num: 2, need: '要求说明'},
          {area: '数据库', num: 2, need: '要求说明'},
          {area: '数据库', num: 2, need: '要求说明'},
        ],
        num: 6,
      },
      goal: '测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。',
      teamAbout: '测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。',
      teamProtocol: '测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。',
      members: [
        {name: '队长', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员二长度测试', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员三', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员一', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员二', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员三', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员一', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员二', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员三', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员一', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员二', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
        {name: '成员三', icon:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'},
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