import {__formatTime} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,
    showDropDown: false,
    dropMenu:{
      select:{ id:0, value:'普通招募'},
      types: [{ id:0, value:'普通招募'}, { id:1, value:'快速招募'}],
      contentH: 120,
      adding: false
    },
    nowTime: new Date().getTime(),
    deadline: new Date().getTime() + 15768000000*2,
    date: '请选择日期',
    showDatePicker: false,

    getDetailHeigth: function() {
      return Math.min(this.data.recruit.neccessary.detail.length*95+100, 600)
    },

    recruit: {
      num: 1,
      deadLine: {
        available: false,
        data: 0,
      },
      neccessary: {
        type: 0,
        detail: []
      },
      isDeadline: false,
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const now = new Date().getTime()
    this.setData({
      nowTime: now,
      deadline: now + 15768000000
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
  // 增加招募人数
  addNum() {
    let recruit = this.data.recruit
    recruit.num++
    this.setData({
      recruit: recruit
    })
  },
  // 减少招募人数
  subNum() {
    if(this.data.recruit.num>1) {
      let recruit = this.data.recruit
      recruit.num--
      this.setData({
        recruit: recruit
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '至少招募1人',
      })
    }
    
  },

  // 输入人数
  inputNum(e) {
    this.data.recruit.num = e.detail.value
  },
  confirmNum(e) {
    if(e.detail.value>1) {
      this.data.recruit.num = e.detail.value
    } else {
      wx.showToast({
        icon: 'error',
        title: '至少招募1人',
      })
    }
  },
  // 是否设置截止时间
  switchDeadline(e) {
    this.setData({
      isDeadline: !this.data.isDeadline
    })
  },
  // 显示日期选择器
  showDatePicker() {
    this.setData({
      showDatePicker: true
    })
  },
  // 关闭时间选择器
  onTimeClose(e) {
    this.setData({
      date: e.detail.date
    })
  },
  // 日期选择器提交
  onTimeConfirm(e) {
    this.setData({
      date: e.detail.date
    })
  },
  // 显示下拉菜单
  showDropDown() {
    this.setData({
      showDropDown: !this.data.showDropDown
    })
  },
  // 下拉菜单选中
  onSelectDrop(e) {
    let ind = e.currentTarget.dataset.index
    let drop = this.data.dropMenu
    let type = drop.types[ind]
    let neccessary = this.data.recruit.neccessary
    
    if(type.id==neccessary.type)
    {
      this.showDropDown()
      return
    }
      
    else
      neccessary.type = type.id

    if(type.id==0) {
      drop.contentH = 120
      neccessary.detail = []
    } else {
      drop.contentH = 250
      neccessary.detail = ''
    }
    this.data.recruit.neccessary = neccessary
    drop.select =type
    this.setData({
      recruit: this.data.recruit,
      dropMenu: drop,
      showDropDown: !this.data.showDropDown
    })
    console.log(this.data.recruit)
  },
  // 快速招募信息
  bindFastDetail(e) {
    this.data.recruit.neccessary.detail = e.detail.value
  },
  // 添加领域要求 
  addDetail() {
    const that = this
    // 设置参数
    let drop = this.data.dropMenu
    let recruit = this.data.recruit
    let newDetail = {area: '', need:''}
    drop.contentH<350? drop.contentH += 95 : drop.contentH =400
    drop.adding = true
    recruit.neccessary.detail.push(newDetail)
    this.setData({
      dropMenu: drop,
      recruit: recruit
    })
    drop.adding = false
    setTimeout(function() {
      that.setData({
        dropMenu:drop
      })
    }, 500)
    setTimeout(function () {
      wx.createSelectorQuery().select('#detailBox').boundingClientRect(function(rect) {
        console.log('scroll called')
        wx.pageScrollTo({
          selector: '#addBox',
          offsetTop: 100,
          duration: 500,
          success: (e) =>{
            console.log(e)
            console.log(rect)
          },
          fail: (e) => {
            console.log('fail')
            console.log(e)
          },
          complete: (e) =>{
            console.log('complete')
            console.log(e)
          }
        })
      }).exec()
    }, 500)

  },
  // scroll-view 滚动到底部

})