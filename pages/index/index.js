// index.js
// 获取应用实例
const app = getApp();
const checkCookieValid = require("../../utils/util.js").checkCookieValid;
const request = require("../../utils/util.js").request;
const processTeamList = require("../../utils/util.js").processTeamList;
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
    topTabList: [{id: 1,name: '兴趣'},{id: 2,name: '竞赛'},{id: 3,name: '创意'},{id: 4,name: '创业'},{id: 5,name: '学习'},{id: 6,name: '考证'}],
    scrollLeft: 0,  // 顶部tab距左边的距离
    tabCur: 0,  // 当前选中的底部tab
    accuseOptions: [{id: 0,name: '色情',selected: false},{id: 1,name: '欺诈',selected: false},{id: 2,name: '赌博',selected: false}],
    // 偏移量
    page: 1,
    // 搜索框中输入的关键字
    key: "",
    refreshing: false
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
    // 请求队伍列表
    this.getTeamList();
  },
  // 顶部tab切换
  topTabSelect(e) {
    this.setData({
      teamList: [],
      topTabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
    })
    this.getTeamList();
  },
  swiperChange(e){
    var current = e.detail.current;
    console.log(current);
    this.setData({
      teamList: [],
      topTabCur: current,
      scrollLeft: (current-1)*60,
    })
    this.getTeamList();
  },
  stopTouchMove(){
    return false
  },
  // 请求团队列表
  getTeamList(){
    this.setData({
      isLoad: true
    })
    var key = this.data.key;
    var page = this.data.page;
    var type = this.data.topTabCur+1;
    var data = {key:key,type:type,limit:10,page:page};
    var that = this;
    request('/recruit/listTeam','POST',data).then(
      (res)=>{
        console.log(res);
        var teamList = processTeamList(res.data.data);
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
  refresh(){
    var key = this.data.key;
    var page = this.data.page;
    var type = this.data.topTabCur+1;
    var data = {key:key,type:type,limit:10,page:page};
    var that = this;
    request('/recruit/listTeam','POST',data).then(
      (res)=>{
        console.log(res);
        this.setData({
          refreshing: false
        })
        var teamList = processTeamList(res.data.data);
        that.setData({
          teamList: teamList
        })
      },
      (error)=>{
        console.log(error);
      }
    )
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
  // 搜索团队
  searchTeam(){

  },
  // 设置筛选
  setFilter(){
    this.setData({

    })
  },
  // 跳转到发布页
  jumpToIssue(){
    wx.navigateTo({
      url: '/pages/createTeam/createTeam',
    })
  },
  // 显示/隐藏模态框
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
  // 举报模态框
  onAccuseTeam(){
    console.log("jubao");
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
