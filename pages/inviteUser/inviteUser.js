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
		scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,
		searchRes: [],
		// 邀请弹窗控制参数
		showModal: false,
		team: {},
		user: {},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const team_id = parseInt(options.team_id) 
    this.getTeamDetail(team_id)
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
	getTeamDetail(team_id) {
		const that = this
		const classRes = []
		let teamInfo = {}
		const getInfo = () => {
			if (getClass(teamInfo.field_id, classification, classRes, 0)) {
				classRes.shift()
				teamInfo.classification = classRes
				teamInfo.createtime = __formatTime(
					teamInfo.createtime * 1000,
					'Y年M月D日'
				)
			}
		}
		const rest = request('/team/detail', 'POST', { team_id: team_id })
		rest.then(
			(res) => {
				const data = res.data.data
				if (res.data.code === 0) {
					teamInfo = data
					getInfo()
					that.setData({
						team: teamInfo,
					})
				}
			},
			(res) => {
				wx.showToast({
					icon: 'error',
					title: res.message,
					duration: 2000,
				})
			}
		)
	},

	// 用户与队员关系接口
	// getRelation(user_id) {
	//   const team_id = this.data.team.team_id
	// 	const relation = request('/team/relation', 'POST', { team_id: team_id })
	// 	relation.then(
	// 		(res) => {
	// 			const data = res.data.data
	// 			if (data.status === -1) {
	// 				wx.showToast({
	// 					icon: 'error',
	// 					title: '队伍不存在',
	// 					duration: 2000,
	// 				})
	// 			}
	// 			return data.status
	// 		},
	// 		(res) => {
	// 			wx.showToast({
	// 				icon: 'error',
	// 				title: '加载失败',
	// 				duration: 2000,
	// 			})
	// 			console.log(res)
	// 		}
	//   )
	//   return -1
	// },

	// 搜索用户
	searchUser(e) {
		const that = this
		let UID = null
		if (e.type === 'confirm') UID = e.detail.value
    else UID = e.detail.value.search
    let UID_int = parseInt(UID)
    if(UID_int.toString() !== UID.toString()){
      wx.showToast({
        icon:'error',
        title: '请输入数字',
        duration: 1000,
      })
      return
    }
		// 获取用户信息
		const rest = request('/info/detail', 'POST', { user_id: UID_int })
		rest.then(
			(res) => {
        console.log(res)
				if (res.data.code === 0) {
					const sRes = []
					sRes.push(res.data.data)
					that.setData({
						searchRes: sRes,
					})
				}
			},
			(res) => {
				wx.showToast({
					icon: 'error',
					title: res.message,
					duration: 2000,
				})
			}
		)
	},

	// 点击邀请按钮
	onClickInvite(e) {
		const index = e.currentTarget.dataset.index
		const selectUser = this.data.searchRes[index]
    this.setData({
			user: selectUser,
		})
		this.showModal()
	},
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
    if(reason==='' || contact==='') {
      wx.showToast({
        icon: 'error',
        title: '输入未完成',
        duration: 1000
      })
      return
    }
    this.setData({
      reason: '',
      contact: ''
    })
    wx.showLoading({})
		const rest = request('/invite/create', 'POST', {
			user_id: that.data.user.user_id,
			team_id: that.data.team.team_id,
			reason: reason,
			contact: contact,
		})
		rest.then(
			(res) => {
        wx.hideLoading({})
				console.log(res)
				if (res.data.code === 0) {
          wx.showToast({
            icon: 'success',
            title: '发送成功',
            duration: 2000,
            complete() {
              that.hideModal()
            }
          })
        }
       
			},
			(res) => {
        wx.hideLoading({})
				wx.showToast({
					icon: 'error',
					title: res.message,
					duration: 2000,
				})
			}
		)
  },
})