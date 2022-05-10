import {
  request,
  copyObject
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prevPage: {},
    relation: 0,
    team: {},
    teamCopy: {},

    moreMenuShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    const team = prevPage.data.team //取上页data里的数据也可以修改
    const relation  = prevPage.data.relation
    this.setData({
      prevPage: prevPage,
      team: team,
      teamCopy: copyObject(team),
      relation: relation
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 展示更多菜单
  switchMoreMenu() {
    this.setData({
      moreMenuShow: !this.data.moreMenuShow
    })
  },
  // 点击移除队员
  onClickRemove(e) {
    const that = this
    const index = e.currentTarget.dataset.index
    const selectMember = this.data.team.members[index]
    this.setData({
      moreMenuShow: false
    })
    if(selectMember.is_leader) {
      wx.showToast({
        icon: 'error',
        title: '不能移除队长',
        duration: 1000
      })
      return
    }
    wx.showModal({
      title: '移除队员',
      content: '确认要移除'+ selectMember.nickname + '吗？',
      confirmColor: '#080C4',
      confirmText: '确认',
      cancelColor: 'cancelColor',
      success(res) {
        if(res.confirm) {
          that.removeMember()
        }
      }
    })
  },
  // 点击移除队员
  removeMember(user_id) {
    wx.showToast({
      icon: 'loading',
      title: '正在移除',
    })
    const request_data = {
      team_id: this.data.team.team_id,
      user_id: user_id
    }
    let res = request('/team/kick','POST',request_data)
    res.then(
      res => {
        console.log(res)
        wx.hideToast()
        wx.showToast({
          icon: 'success',
          title: '成功移除',
          duration: 2000
        })
      },
      res =>{
        wx.hideToast()
        console.log(res)
        wx.showToast({
          icon: 'error',
          title: res.message,
          duration: 2000
        })
      })

  }
})