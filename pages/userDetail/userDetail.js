const request = require("../../utils/util.js").request
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// 年级列表
		gradeLst: [
			{ id: 0, name: '大一', checked: false },
			{ id: 1, name: '大二', checked: false },
			{ id: 2, name: '大三', checked: false },
			{ id: 3, name: '大四', checked: false },
			{ id: 4, name: '大五', checked: false },
			{ id: 5, name: '研一', checked: false },
			{ id: 6, name: '研一', checked: false },
			{ id: 7, name: '研一', checked: false },
			{ id: 8, name: '博士', checked: false },
			{ id: 9, name: '', checked: false },
		],
		// 邀请弹窗参数
		showInviteModal: false,
		// 自己创建的团队与用户的关系列表
		myTeamForOthers:[],
		// 下拉框参数
		menu: {
			show: false,
			team: {},
			index: -1,
			title: '请选择',
		},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var user_id = parseInt(options.user_id)
		this.setData({
			user_id: user_id,
		})
		var that = this
    this.getTeamRelation()
		request('/info/detail', 'POST', { user_id: user_id }).then(
			(res) => {
				this.setData({
					avatar: res.data.data.avatar,
					nickname: res.data.data.nickname,
					description: res.data.data.description,
					school: res.data.data.school,
					major: res.data.data.major,
					skill: res.data.data.skill,
					grade: res.data.data.grade,
					createNum: res.data.data.count.create,
          joinNum: res.data.data.count.join,
          user_id: res.data.data.user_id
				})
			},
			(error) => {
				console.log(error)
			}
		)
		request('/team/getMyPrivate', 'POST', { user_id: user_id }).then(
			(res) => {
				that.setData({
					showMyCreate: res.data.data.create,
					showMyJoin: res.data.data.join,
				})
			},
			() => {}
		)
	},

  // 用户与我的团队的关系
  getTeamRelation() {
    const that = this
		request('/team/myTeamForOthers', 'POST', { user_id: this.data.user_id }).then(
			(res) => {
        console.log(that.data.user_id)
        this.setData({
					myTeamForOthers: res.data.data,
				})
			},
			(error) => {
				console.log(error)
			}
		)
  },

	// 返回到上一页
	backToLastPage() {
		wx.navigateBack({
			delta: 0,
		})
  },
  
	// 跳转到该用户创建的团队界面
	jumpToTeamCreatedByUser() {
		if (this.data.showMyCreate) {
			wx.navigateTo({
				url:
					'/pages/teamCreatedByUser/teamCreatedByUser?user_id=' +
					this.data.user_id,
			})
		} else {
			wx.showModal({
				title: '对方设置了隐私权限',
				content: '无法查看',
				showCancel: false,
			})
		}
  },
  
	// 跳转到该用户加入的团队界面
	jumpToTeamJoinedByUser() {
		if (this.data.showMyJoin) {
			wx.navigateTo({
				url:
					'/pages/teamJoinedByUser/teamJoinedByUser?user_id=' +
					this.data.user_id,
			})
		} else {
			wx.showModal({
				title: '对方设置了隐私权限',
				content: '无法查看',
				showCancel: false,
			})
		}
	},

	// 展示邀请用户窗口
	showInviteModal() {
		this.setData({
			showInviteModal: true,
		})
	},
	// 隐藏邀请用户窗口
	hideInviteModal() {
		this.setData({
			showInviteModal: false,
		})
	},
	// 展示下拉下单选项
	showMenuItem() {
		const menu = this.data.menu
		menu.show = !menu.show
		this.setData({
			menu: menu,
		})
	},
	// 选中下拉菜单选项
	selectMenuItem(e) {
		const menu = this.data.menu
    const index = e.currentTarget.dataset.index
    const relation = this.data.myTeamForOthers[index].relation
    if (relation.isApplying || relation.isInviting || relation.isMember){
      wx.showToast({
        icon: 'error',
        title: '不能选择该团队',
        duration: 1000
      })
      return
    }
		menu.team = this.data.myTeamForOthers[index].team
		menu.title = menu.team.name
		menu.show = false
		menu.index = index
		this.setData({
			menu: menu,
		})
	},
	sendInvite(e){
    const that = this
    const menu = this.data.menu
    if(menu.index<0) {
      wx.showToast({
        icon: 'error',
        title: '请选择队伍',
        duration: 1000
      })
      return
    }
    if(e.detail.value.reason===''||e.detail.value.contact==='') {
      wx.showToast({
				icon: 'error',
				title: '请完成填写',
				duration: 1000,
			})
			return
    }
    const request_data = {
			user_id: this.data.user_id,
			team_id: menu.team.team_id,
			reason: e.detail.value.reason,
			contact: e.detail.value.contact,
    }
    wx.showLoading({
      title: '发送中',
    })
    request('/invite/create', 'POST', request_data).then(
			(res) => {
        wx.hideLoading()
        if(res.data.code===0){
          that.hideInviteModal()
          that.getTeamRelation()
          that.setData({
						menu: {
							show: false,
							team: {},
							index: -1,
							title: '请选择',
            },
            reason: '',
            contact: ''
					})
          wx.showToast({
            icon: 'success',
            title: '已发送',
            duration: 1000
          })          
        }
      },
			(err) => {
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: err.message,
        })
      }
    )
  },
})