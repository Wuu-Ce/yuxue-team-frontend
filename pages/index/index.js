// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

    tabCur: 0,  // 当前选中的底部tab
  },

  onLoad: function(options){
    this.setData({
      pageCur: app.globalData.pageCur,
      pageList: app.globalData.pageList
    })
  },
  onShow: function(options){
    this.setData({
      pageCur: app.globalData.pageCur,
      pageList: app.globalData.pageList
    })
  },
  // tab切换
  changetab(e){
    var tabindex = e.currentTarget.dataset.tabindex;
    console.log()
    if(tabindex!=this.data.tabCur){
      this.setData({
        tabCur: parseInt(tabindex)
      })
    }
  },
  // 跳转到我的队伍页
  onJumpToMyTeam(e){
    this.pageSwitch(1);
  },
  // 跳转到上一个页面
  onJumpBack(e){
    var pageCur = e.detail.pageCur;
    app.setPageCur(pageCur);
    this.setData({
      pageCur: pageCur
    })
  },
  // 跳转到发布页
  jumpToIssue(){
    // this.pageSwitch(2);
    wx.navigateTo({
      url: '/pages/createTeam/createTeam',
    })
  },
  // 页面切换
  pageSwitch(index){
    // 切换到对应的页面
    app.setPageCur(index);
    app.setPageNext(index);
    this.setData({
      pageCur: index
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
