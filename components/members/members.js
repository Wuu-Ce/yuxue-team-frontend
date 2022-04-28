// components/members/members.js
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
    animation: false,
    members: [
      {icon: '', name: 'name'},
      {icon: '', name: 'name'},
      {icon: '', name: 'name'},
      {icon: '', name: 'name'}
    ],

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
              {icon: '', name: 'name'},
              {icon: '', name: 'name'},
              {icon: '', name: 'name'},
              {icon: '', name: 'name'}
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
      let selectIndex = e.currentTarget.dataset.index
      this.setData({
        select: selectIndex
      })
    },
    // 关闭时
    onClose(e) {
      const that = this
      let detail = {}
      that.setData({
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
