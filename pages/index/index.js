// index.js
// 获取应用实例
const app = getApp()
const checkCookieValid = require("../../utils/util.js").checkCookieValid
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

    CustomBar: app.globalData.CustomBar,

    listData: {from:'index',topTabCur:1},
    topTabCur: 0,  // 当前的顶部tab
    topTabList: [{index: 0,name: '兴趣'},{index: 1,name: '竞赛'},{index: 2,name: '创意'},{index: 3,name: '创业'},{index: 4,name: '学习'},{index: 5,name: '考证'}],
    scrollLeft: 0,  // 顶部tab距左边的距离
    tabCur: 0,  // 当前选中的底部tab

    accuseOptions: [{id: 0,name: '色情',selected: false},{id: 1,name: '欺诈',selected: false},{id: 2,name: '赌博',selected: false}]
  },

  onLoad: function(options) {
    // 修改列表容器swiper的高度
    const that = this;
    const query = wx.createSelectorQuery()
    query.select('#swiperContainer').boundingClientRect()
    query.exec(
      function (res) {
        const tabbarQuery = wx.createSelectorQuery()
        tabbarQuery.select('#tabbar').boundingClientRect()
        tabbarQuery.exec(
          function (res1) {
            that.setData({
              swiperContainerH: wx.getSystemInfoSync().windowHeight - res[0].top - res1[0].height - 10        
            })
          }
        )
      }
    )
  
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow: function(options){

  },
  // 顶部tab切换
  topTabSelect(e) {
    var listData = this.data.listData;
    listData.topTabCur = e.currentTarget.dataset.id;
    this.setData({
      topTabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
      listData: listData
    })
  },
  topTabChange(e){
    var current = e.detail.current;
    var listData = this.data.listData;
    listData.topTabCur = current;
    this.setData({
      topTabCur: current,
      scrollLeft: (current-1)*60,
      listData: listData
    })
  },
  // 底部tab切换
  changetab(e){
    var tabindex = e.currentTarget.dataset.tabindex;
    if(tabindex!=this.data.tabCur){
      this.setData({
        tabCur: parseInt(tabindex)
      })
    }
  },

  // 跳转到发布页
  jumpToIssue(){
    wx.navigateTo({
      url: '/pages/createTeam/createTeam',
    })
  },
  // 跳转到搜索页
  jumpToSearchTeam(){
    wx.navigateTo({
      url: '/pages/searchTeam/searchTeam',
    })
  },

  // 模态框
  showModal(modalName) {
    this.setData({
      modalName: modalName
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }, 
  onAccuseTeam(){
    this.showModal('accuse');
  },
  // 选择举报选项
  chooseAccuseOption(e){
    console.log(e);
    var optionID = e.currentTarget.dataset.id;
    var accuseOptions = this.data.accuseOptions;
    accuseOptions[optionID].selected = !accuseOptions[optionID].selected;
    this.setData({
      accuseOptions: accuseOptions
    })
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
