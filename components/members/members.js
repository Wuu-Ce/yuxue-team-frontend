import { request } from "../../utils/util"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    // changeLeader-更换队长 deleteMember-移除队员
    type: {
      type: String,
      value: 'changeLeader'
    },
    team_id :{
      type: Number,
      value: 1
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    showOkModal: false,
    animation: false,
    members: [
      {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 1},
      {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 1},
      {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 1},
      {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 1}
    ],
    select: -1,
    selectMember: {},
    team_id: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取队员列表
    getTeamDetail(team_id) {
      const that = this
      const rest = request('/team/detail', 'POST', {
        team_id: team_id
      })
      rest.then(
        res => {
          const data = res.data.data
          if (res.data.code === 0) {
            teamInfo = data.members
            teamInfo = [
              {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 2},
              {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 2},
              {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 2},
              {avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg', nickname: 'name', user_id: 2}
            ]
            that.setData({
              members: teamInfo
            })

            console.log(teamInfo)
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
    // 选择某个队员
    SelectItem(e) {
      if(this.data.type === 'deleteMember')
        return
      let selectIndex = e.currentTarget.dataset.index
      const members = this.data.members
      this.setData({
        select: selectIndex,
        selectMember: members[selectIndex]
      })
    },
    // 展示确认框
    showOkModal() {

      this.setData({
        showOkModal: true
      })
    },
    // 展示确认框
    hiddenOkModal(e) {
      this.setData({
        showOkModal: false
      })
    },
    //  点击面板确认按钮
    bindChange() {
      if(this.data.select<0)
      {
        wx.showToast({
          icon: 'error',
          title: '请先选择',
          duration: 2000
        })
         return   
      }
      this.showOkModal()
    },
    // 点击移除按钮时
    bindRemove(e) {
      let selectIndex = e.currentTarget.dataset.index
      const members = this.data.members
      this.setData({
        selectMember: members[selectIndex]
      })
      this.showOkModal()
    },
    // 转移队长
    changeLeader() {
      this.hiddenOkModal()
      wx.showToast({
        icon: 'loading',
        title: '转移中',
      })      
      const member = this.data.selectMember
      const request_data = {
        team_id: this.data.team_id,
        new_user_id: member.user_id
      }
      let res = request('/team/transfer','POST',request_data)
      res.then(
        res => {
          console.log(res)
          wx.hideToast()
          wx.showToast({
            icon: 'success',
            title: '转移成功',
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
    },

    // 移除队员
    removeMember() {
      this.hiddenOkModal()
      wx.showToast({
        icon: 'loading',
        title: '正在移除',
      })
      const member = this.data.selectMember
      const request_data = {
        team_id: this.data.team_id,
        new_user_id: member.user_id
      }
      let res = request('/team/transfer','POST',request_data)
      res.then(
        res => {
          console.log(res)
          wx.hideToast()
          wx.showToast({
            icon: 'success',
            title: '成功移除该队员',
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

    },
    // 关闭时
    onClose(e) {
      const that = this
      let detail = {}
      that.setData({
        select: -1,
        show: false,
        animation: true
      })
      setTimeout(function() {
        that.setData({
          animation: false
        })
      }, 500)
      this.triggerEvent('close', detail)
    },
  }
})
