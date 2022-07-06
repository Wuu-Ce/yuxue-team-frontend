import {
	request,
	getClass,
	classification,
	__formatTime,
} from '../../utils/util'
const app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,  // 页面高度
		searchRes: [],// 搜索结果
    showModal: false, // 邀请弹窗控制参数
		noRes: false, // 搜索无结果标识
    team: {}, // 团队
    team_id: -1, // 团队ID
		user: {}, // 用户
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
    const team_id = parseInt(options.team_id)
    this.setData({
      team_id: team_id
    })
		// this.getTeamDetail(team_id)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {},
	// 获取队伍详情
	// getTeamDetail(team_id) {
	// 	const that = this
	// 	const classRes = []
	// 	let teamInfo = {}
	// 	const getInfo = () => {
	// 		if (getClass(teamInfo.field_id, classification, classRes, 0)) {
	// 			classRes.shift()
	// 			teamInfo.classification = classRes
	// 			teamInfo.createtime = __formatTime(
	// 				teamInfo.createtime * 1000,
	// 				'Y年M月D日'
	// 			)
	// 		}
	// 	}
	// 	const rest = request('/team/detail', 'POST', { team_id: team_id })
	// 	rest.then(
	// 		(res) => {
	// 			const data = res.data.data
	// 			if (res.data.code === 0) {
	// 				teamInfo = data
	// 				getInfo()
	// 				that.setData({
	// 					team: teamInfo,
	// 				})
	// 			}
	// 		},
	// 		(res) => {
	// 			wx.showToast({
	// 				icon: 'error',
	// 				title: res.message,
	// 				duration: 2000,
	// 			})
	// 		}
	// 	)
	// },



	// 搜索用户
	searchUser(e) {
		const that = this
		let UID = null
		if (e.type === 'confirm') UID = e.detail.value
		else UID = e.detail.value.search
		let UID_int = parseInt(UID)
		if (UID_int.toString() !== UID.toString()) {
			wx.showToast({
				icon: 'error',
				title: '请输入数字',
				duration: 1000,
			})
			return
		}
		// 获取用户信息
		const sRes = []
		const rest = request('/info/detail', 'POST', { user_id: UID_int })
		rest.then(
			(res) => {
				if (res.data.code === 0) {
					sRes.push(res.data.data)
					that.setData({
						searchRes: sRes,
						noRes: false,
          })
          that.getTeamRelation()
				}
			},
			(res) => {
				that.setData({
					searchRes: sRes,
					noRes: true,
				})
				// wx.showToast({
				// 	icon: 'error',
				// 	title: res.message,
				// 	duration: 2000,
				// })
			}
		)
  },
  
  // 获取用户与我团队的关系
  getTeamRelation() {
    const that = this
    let userList = that.data.searchRes
    for(let user of userList){
      // 用户与我的团队的关系
      request('/team/myTeamForOthers', 'POST', {user_id: user.user_id,}).then(
        (res) => {
          for (const obj of res.data.data) {
            if (obj.team.team_id === that.data.team_id) {
              user.curTeamRelation = obj.relation
              break
            }
          }
          that.setData({
            searchRes: userList
          })
        },
        (error) => {
          console.log(error)
        }
      )      
    }

	},

	// 点击邀请按钮
	onClickInvite(e) {
		const that = this
		const index = e.currentTarget.dataset.index
    const selectUser = this.data.searchRes[index]
    const relation = selectUser.curTeamRelation
		this.setData({
			user: selectUser,
		})

		let errMsg = null
		if (relation.isApplying) errMsg = '用户申请中'
		else if (relation.isInviting) errMsg = '已发送邀请'
		else if (relation.isMember) errMsg = '不能邀请队员'
		if (relation.isApplying || relation.isInviting || relation.isMember) {
			wx.showToast({
				icon: 'error',
				title: errMsg,
				duration: 1000,
			})
			return
		}
		that.showModal()
	},

	// 展示邀请弹窗
	showModal() {
		this.setData({
			showModal: true,
		})
	},

	// 隐藏邀请弹窗
	hideModal() {
		this.setData({
			showModal: false,
		})
	},

	// 发送申请请求
	sendInvite(e) {
		const that = this
		const reason = e.detail.value.reason
		const contact = e.detail.value.contact
		if (reason === '' || contact === '') {
			wx.showToast({
				icon: 'error',
				title: '输入未完成',
				duration: 1000,
			})
			return
		}
		this.setData({
			reason: '',
			contact: '',
		})
		wx.showLoading()
		const rest = request('/invite/create', 'POST', {
			user_id: that.data.user.user_id,
			team_id: that.data.team.team_id,
			reason: reason,
			contact: contact,
		})
		rest.then(
			(res) => {
				wx.hideLoading()
				console.log(res)
				if (res.data.code === 0) {
					wx.showToast({
						icon: 'success',
						title: '发送成功',
						duration: 2000,
						complete() {
							that.hideModal()
						},
					})
				}
			},
			(res) => {
				wx.hideLoading()
				wx.showToast({
					icon: 'error',
					title: res.message,
					duration: 2000,
				})
			}
		)
	},
})