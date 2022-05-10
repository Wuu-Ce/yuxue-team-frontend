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
    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,
    // 窗口展示
    moreMenuShow: false,
    reportModalShow: false,
    showLoginModal: false,
    // 缩略信息
    hideTeamGoal: true,
    hideTeamProtocol: true,
    hideTeamAbout: true,
    

    // 用户类型 leader; member; normal; notLogin
    relation: -1,
    // 队伍信息
    team: {
      team_id: 0,
      name: '',
      createTime: 0,
      description: '',
      classification: ['', ''],
      type: 0,
      typeinfo: '',
      announce: '',
      goal: '',
      rule: '',
      members: [],
    },
    recruit: [{
      count: 0,
      count_available: 0,
      is_available: 0,
      is_local: 0,
      items: [{
          is_available: true,
          recruit_id: 0,
          requirement: "",
          ritem_id: 0,
          role: "",
          time: null,
        },
        {
          is_available: true,
          recruit_id: 0,
          requirement: "",
          ritem_id: 0,
          role: "",
          time: null,
        }
      ],
      recruit_id: 0,
      team_id: 0,
      time: 1650444860,
      type: 0,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const team_id = parseInt(options.team_id)
    // 队伍详情
    this.getTeamDetail(team_id)
    // 用户与团队关系
    this.getRelation(team_id)
    // 招募
    this.getRecruit(team_id)

  },
  onShow() {
    const team_id = this.data.team.team_id
    if(team_id !== 0)
    {
      // 用户与团队关系
      this.getRelation(team_id)
      // 招募
      this.getRecruit(team_id)
    }
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
    const rest = request('/team/detail', 'POST', {team_id: team_id})
    rest.then(
      res => {
        const data = res.data.data
        if (res.data.code === 0) {
          teamInfo = data
          getInfo()
          that.setData({
            team: teamInfo
          })
        }
      },
      res => {
        wx.showToast({
          icon: 'error',
          title: '加载失败',
          duration: 2000
        })
      })
  },
  // 用户与队员关系接口
  getRelation(team_id) {
    const that = this
    const relation = request('/team/relation', 'POST', {team_id: team_id})
    relation.then(
      res => {
        const data = res.data.data
        if (data.status === -1) {
          wx.showToast({
            icon: 'error',
            title: '队伍不存在',
            duration: 2000
          })
        }
        that.setData({
          relation: data.status
        })
      },
      res => {
        wx.showToast({
          icon: 'error',
          title: '加载失败',
          duration: 2000
        })
        console.log(res)
      }
    )
  },
  // 获取招募详情
  getRecruit(team_id) {
    const that = this
    const recruit = request('/recruit/listOfTeam', 'POST', {team_id: team_id})
    recruit.then(
      res => {
        that.setData({
          recruit: res.data.data
        })
      },
      res => {
        wx.showToast({
          icon: 'error',
          title: '加载失败',
          duration: 2000
        })
        console.log(res)
      }
    )
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
  onClickCollect() {
    let team = this.data.team
    team.collected = !team.collected
    this.setData({
      team: team
    })
    if (team.collected) {
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
  // 跳转团队成员信息页
  toMemberInfoPage() {
    wx.navigateTo({
      url: '/pages/memberInfo/memberInfo?team_id=' + this.data.team.team_id,
    })
  },
  // 跳转申请加入界面
  toApplyPage() {
    var ifLogin = wx.getStorageSync('ifLogin');
    if(ifLogin){
      wx.navigateTo({
        url: '/pages/apply/apply?team_id=' + this.data.team.team_id +'&recruit_id='  + this.data.recruit[0].recruit_id,
      })
    }else{
      this.setData({
        showLoginModal: true
      })
    }
  },
  // 跳转管理团队界面
  toManagePage() {
    wx.navigateTo({
      url: '/pages/manageTeam/manageTeam?team_id=' + this.data.team.team_id,
    })
  },
  // 跳转开启招募界面
  toTecruitPage() {
    wx.navigateTo({
      url: '/pages/recruitMember/recruitMember?team_id=' + this.data.team.team_id,
    })
  }
})