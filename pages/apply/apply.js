import { request } from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,
    // 队伍信息和招募信息
    recruit_id: 0,
    team_id: 0,
    team: {},
    reruit: {},
    select: -1,
    selectItem: {},

    // 申请信息
    apply: {
      recruit_id: 0,
      ritem_id: 0,
      reason: '',
      contact: '',
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const team_id = parseInt(options.team_id)
    const recruit_id = parseInt(options.recruit_id)
    this.setData({
      team_id: team_id,
      recruit_id: recruit_id
    })
    this.getRecruit()
    this.getTeamDetail() 
  },
    // 获取队伍详情
    getTeamDetail() {
      const that = this
      let teamInfo = {}
      const team_id = this.data.team_id
      const rest = request('/team/detail', 'POST', {
        team_id: team_id
      })
      rest.then(
        res => {
          console.log(res)
          const data = res.data.data
          if (res.data.code === 0) {
            teamInfo = data
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
          console.log(res)
        })
    },
  // 获取招募详情
  getRecruit() {
    const that = this
    const  recruit_id = that.data.recruit_id
    const recruitRes = request('/recruit/detail', 'POST', {recruit_id: recruit_id})
    recruitRes.then(
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
  // 普通招募选中一项
  SelectIteam(e) {
    let index = e.currentTarget.dataset.index
    let selectItem = this.data.selectItem
    const recruit = this.data.recruit
    if(index == this.data.select)
    {
      index = -1
      selectItem = {}
    } else {
      selectItem = recruit.items[index]
    }
    this.setData({
      select: index,
      selectItem: selectItem
    })
  },
  // 输入理由
  enterReason(e){
    const content = e.detail.value
    if(content !== '') {
      this.data.apply.reason = content
    }
  },
  // 输入联系方式
  enterContact(e){
    const content = e.detail.value
    if(content !== '') {
      this.data.apply.contact = content
    }
  },
  // 申请加入
  apply() {
    // 检验
    const that = this
    const recruit = this.data.reruit
    const apply = this.data.apply
    const select = this.data.select
    if(recruit.type ==1&& select == -1){
      wx.showToast({
        icon: 'error',
        title: '请选择一项要求',
        duration: 2000
      })
      return
    }
    if(apply.reason=='' || apply.contact =='') {
      wx.showToast({
        icon: 'error',
        title: '输入未完成',
        duration: 2000
      })
      console.log(apply)
      return
    }
    // 请求
    wx.showLoading({
      title: '发送申请',
    })
    let request_data = {
      recruit_id: that.data.recruit_id,
      reason: apply.reason,
      contact: apply.contact
    }
    if(recruit.type == 1) {
       request_data.ritem_id = select
    }
    console.log(request_data)
    const res = request('/recruit/detail', 'POST', request_data)
    res.then( 
      res => {
        wx.hideLoading()
        if(res.data.code === 0) {
          wx.showToast({
            icon: 'success',
            title: '发送成功',
            duration: 2000
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000)

        }
      },
      res => {
        console.log(res)
      }
    )
  }
})