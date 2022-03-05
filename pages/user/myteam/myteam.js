// pages/User/MyTeam/myteam.js
const app = getApp()
// 手势处理参数
let minOffset = 30// 最小偏移量，低于这个值不响应滑动处理
let minTime = 60  // 最小时间，单位：毫秒，低于这个值不响应滑动处理
let startX = 0    // 开始时的X坐标
let startY = 0    // 开始时的Y坐标
let startTime = 0 // 开始时的毫秒数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏切换餐宿
    tabCur: 0,
    scrollLeft: 0,
    // 顶部栏高度控制参数
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    NavHeight: app.globalData.CustomBar - app.globalData.StatusBar,
    containerH: 0,
    // ‘我创建的队伍‘列表
    created_team_list: [{
        name: '队伍1',
        icon: '',
        leader: '队长1',
        introduction: '队伍1的简介内容'
      },
      {
        name: '我创建的队伍2',
        icon: '',
        leader: '队长2',
        introduction: '队伍2的简介内容'
      },

    ],
    // '我加入的队伍'列表
    joined_team_list: [{
        name: '我加入的队伍1',
        icon: '',
        leader: '队长1',
        introduction: '队伍1的简介内容'
      },
      {
        name: '队伍2',
        icon: '',
        leader: '队长2',
        introduction: '队伍2的简介内容'
      },

    ],
    // '正在申请的队伍'列表
    applying_team_list: [{
        name: '正在申请的队伍1',
        icon: '',
        leader: '队长1',
        introduction: '队伍1的简介内容'
      },
      {
        name: '队伍2',
        icon: '',
        leader: '队长2',
        introduction: '队伍2的简介内容'
      },
      {
        name: '队伍2',
        icon: '',
        leader: '队长2',
        introduction: '队伍2的简介内容'
      },
    ],
    show_team_list: []


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 修改列表容器的高度
    const that = this
    const query = wx.createSelectorQuery()
    query.select('#container').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        containerH: wx.getSystemInfoSync().windowHeight - res[0].top
      })
    })


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
  // 选择标签
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },
  
  //触摸开始事件，初始化startX、startY和startTime 
  touchStart: function (e) {
    console.log('touchStart', e)
    startX = e.touches[0].pageX;    // 获取触摸时的x坐标  
    startY = e.touches[0].pageY;    // 获取触摸时的x坐标
    startTime = new Date().getTime();// 获取毫秒数
  },
  
  //触摸取消事件 （手指触摸动作被打断，如来电提醒，弹窗），要将startX、startY和startTime重置
  touchCancel: function (e) {
    startX = 0;//开始时的X坐标
    startY = 0;//开始时的Y坐标
    startTime = 0;//开始时的毫秒数
  },
    
   //触摸结束事件，主要的判断在这里
  touchEnd: function (e) {
    console.log('touchEnd', e)
    var endX = e.changedTouches[0].pageX;
    var endY = e.changedTouches[0].pageY;
    var touchTime = new Date().getTime() - startTime;//计算滑动时间
    //开始判断
    //1.判断时间是否符合
    if (touchTime >= minTime) {
      const that = this
      //2.判断偏移量：分X、Y
      var xOffset = endX - startX;
      var yOffset = endY - startY;
      console.log('xOffset', xOffset)
      console.log('yOffset', yOffset)
      //①条件1（偏移量x或者y要大于最小偏移量）
      //②条件2（可以判断出是左右滑动还是上下滑动）
      if (Math.abs(xOffset) >= Math.abs(yOffset) && Math.abs(xOffset) >= minOffset) {
        //左右滑动
        //③条件3（判断偏移量的正负）
        if (xOffset < 0) {
          
          console.log('向左滑动')
          that.data.tabCur<2? that.setData({tabCur: that.data.tabCur+1}):''
        } else {
          console.log('向右滑动')
          that.data.tabCur > 0? that.setData({tabCur: that.data.tabCur-1}):''
        }
      } else if (Math.abs(xOffset) < Math.abs(yOffset) && Math.abs(yOffset) >= minOffset) {
        //上下滑动
        //③条件3（判断偏移量的正负）
        if (yOffset < 0) {
          console.log('向上滑动')
        } else {
          console.log('向下滑动')
        }
      }
    } else {
      console.log('滑动时间过短', touchTime)
    }
  },
  // 返回上级页面
  BackPage() {
    wx.navigateBack({
      delta: 1
    });
  },
})