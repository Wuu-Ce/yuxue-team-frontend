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
		selectMember: {},

		// 更多菜单展示控制
		moreMenuShow: false,
		// 输入组件展示控制
		inputShow: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const pages = getCurrentPages()
		const prevPage = pages[pages.length - 2] //上一个页面
		const team = prevPage.data.team //取上页data里的数据也可以修改
		const relation = prevPage.data.relation
		this.setData({
			prevPage: prevPage,
			team: team,
			teamCopy: copyObject(team),
			relation: relation,
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},
	// 展示更多菜单
	switchMoreMenu() {
		this.setData({
			moreMenuShow: !this.data.moreMenuShow,
		})
	},
	// 编辑队内联系方式
	editContact(e) {
		const ind = e.currentTarget.dataset.index
		let selectMember = this.data.team.members[ind]
		this.setData({
			selectMember: selectMember,
			inputShow: true,
		})
	},

	// 提交输入内容
	inputConfirm(e) {
    const that = this
		const selectMember = this.data.selectMember
		selectMember.contact = e.detail.value
    // 修改队内联系方式接口
		const request_data = {
      team_id: that.data.team.team_id,
      contact : e.detail.value
    }
		const relation = request('/team/updateProfile', 'POST', request_data)
		relation.then(
			(res) => {
        console.log(res)
        that.setData({
          team: that.data.tem
        })
			},
			(res) => {
				wx.showToast({
					icon: 'error',
					title: '修改失败',
					duration: 2000,
				})
				console.log(res)
			}
		)
	},
	// 点击移除队员
	onClickRemove(e) {
		const that = this
		const index = e.currentTarget.dataset.index
		const selectMember = this.data.team.members[index]
		this.setData({
			moreMenuShow: false,
		})
		if (selectMember.is_leader) {
			wx.showToast({
				icon: 'error',
				title: '不能移除队长',
				duration: 1000,
			})
			return
		}
		wx.showModal({
			title: '移除队员',
			content: '确认要移除' + selectMember.nickname + '吗？',
			confirmColor: '#080C4',
			confirmText: '确认',
			cancelColor: 'cancelColor',
			success(res) {
				if (res.confirm) {
					that.removeMember()
				}
			},
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
			user_id: user_id,
		}
		let res = request('/team/kick', 'POST', request_data)
		res.then(
			(res) => {
				console.log(res)
				wx.hideToast()
				wx.showToast({
					icon: 'success',
					title: '成功移除',
					duration: 2000,
				})
			},
			(res) => {
				wx.hideToast()
				console.log(res)
				wx.showToast({
					icon: 'error',
					title: res.message,
					duration: 2000,
				})
			}
		)
	},
	// 跳转用户主页
	toUserPage(e) {
		const index = e.currentTarget.dataset.index
		const user_id = this.data.team.members[index].user_id
		wx.navigateTo({
			url: '/pages/userDetail/userDetail?user_id=' + user_id,
		})
	},
})