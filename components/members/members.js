import { request, copyObject } from "../../utils/util"
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
    relation:{},
    showOkModal: false,
    animation: false,
    select: -1,
    selectMember: {},
    members: [],
  },


  lifetimes: {
    attached: function()  {
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1]; //当前页面
      const team = curPage.data.team
      const relation = curPage.data.relation
      const members = copyObject(team.members)
      this.setData({
        members: members,
        team_id: team.team_id,
        relation: relation
      })
      console.log(this.data.team_id)
    }
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择某个队员
    SelectItem(e) {
      if(this.data.type === 'deleteMember')
        return
      let selectIndex = e.currentTarget.dataset.index
      const selectMember = this.data.members[selectIndex]
      if(selectMember.is_leader) {
        wx.showToast({
          icon: 'error',
          title: '不能选中队长',
          duration: 1000
        })
        return
      }
      this.setData({
        select: selectIndex,
        selectMember:selectMember
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
      const selectMember = this.data.members[selectIndex]
      if(selectMember.is_leader) {
        wx.showToast({
          icon: 'error',
          title: '不能移除队长',
          duration: 1000
        })
        return
      }
      this.setData({
        selectMember: selectMember
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
      console.log(typeof this.data.team_id)
      console.log(typeof member.user_id)
      const request_data = {
        team_id: this.data.team_id,
        user_id: member.user_id
      }
      let res = request('/team/kick','POST',request_data)
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
