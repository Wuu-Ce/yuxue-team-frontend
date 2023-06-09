// 获取应用实例
const app = getApp();
const checkCookieValid = require("../../utils/util.js").checkCookieValid;
const request = require("../../utils/util.js").request;
const processTeamList = require("../../utils/util.js").processTeamList;
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		canIUseGetUserProfile: false,
		canIUseOpenData:
			wx.canIUse('open-data.type.userAvatarUrl') &&
			wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

		CustomBar: app.globalData.CustomBar,

		listData: { from: 'index', topTabCur: 1 },
		topTabCur: 0, // 当前的顶部tab
		topTabList: [
			{ id: 1, name: '兴趣' },
			{ id: 2, name: '竞赛' },
			{ id: 3, name: '创意' },
			{ id: 4, name: '创业' },
			{ id: 5, name: '学习' },
			{ id: 6, name: '考证' },
		],
		scrollLeft: 0, // 顶部tab距左边的距离
		tabCur: 0, // 当前选中的底部tab
		scrollViewContainerH: 300, // 滚动框的初始高度
		accuseOptions: [
			{ id: 0, name: '色情', selected: false },
			{ id: 1, name: '欺诈', selected: false },
			{ id: 2, name: '赌博', selected: false },
		],
		page: 1, // 页号
		key: '', // 搜索框中输入的关键字
		refreshing: false, // scroll-view是否处于下拉刷新状态
		showBottomLoading: false, // 是否显示底部的加载图标
		showFilter: false, // 展示筛选器
		maskH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar - 85, // 遮罩层高度
		fliter: {
			isLocalSchool: false,
		},
	},

	onLoad: function (options) {
		// 判断是否登录，若登录，把缓存中ifLogin设为true，若未登录，把缓存中ifLogin设为false
		checkCookieValid().then(
			(res) => {
				if (res) {
					wx.setStorage({
						key: 'ifLogin',
						data: true,
					})
				} else {
					wx.setStorage({
						key: 'ifLogin',
						data: false,
					})
				}
			},
			(error) => {}
		)
		// 修改列表容器swiper的高度
		const that = this
		const query = wx.createSelectorQuery()
		query.select('.scrollViewContainer').boundingClientRect()
		query.exec(function (res) {
			const tabbarQuery = wx.createSelectorQuery()
			tabbarQuery.select('#tabbar').boundingClientRect()
			tabbarQuery.exec(function (res1) {
				that.setData({
					scrollViewContainerH:
						wx.getSystemInfoSync().windowHeight -
						res[0].top -
						res1[0].height -
						10,
				})
			})
		})
		// 请求队伍列表
		this.getTeamList()
	},
	// 搜索团队
	searchTeam(e) {
		let value = null
		if (e.type === 'submit') {
			value = e.detail.value.search
		} else if (e.type === 'confirm') {
			value = e.detail.value
		}
		this.data.key = value
		console.log(e)
		this.getTeamList()
	},
	// 顶部tab切换
	topTabSelect(e) {
		this.setData({
			showBottomLoading: false,
			teamList: [],
			topTabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
		})
		this.getTeamList()
	},

	// 禁止滑动swiper
	stopTouchMove() {
		return false
	},
	// 请求团队列表并setData(teamList)
	requestTeamList() {
		var key = this.data.key
		var page = this.data.page
		var type = this.data.topTabCur + 1
		var data = { key: key, type: type, limit: 10, page: page }
		return new Promise((resolve, reject) => {
			request('/recruit/listTeam', 'POST', data).then(
				(res) => {
					var teamList = processTeamList(res.data.data)
					resolve(teamList)
				},
				(error) => {
					wx.showToast({
						title: error.message,
						icon: 'error',
					})
					reject(error)
				}
			)
		})
	},
	// 获取团队列表，把请求的过程放到了requestTeamList函数中
	getTeamList() {
		this.setData({
			isLoad: true,
			page: 1,
		})
		var that = this
		this.requestTeamList().then(
			(teamList) => {
				that.setData({
					teamList: teamList,
					isLoad: false,
				})
			},
			() => {
				this.setData({
					isLoad: false,
				})
			}
		)
	},
	// 下拉刷新
	refresh() {
		this.setData({
			page: 1,
		})
		var that = this
		this.requestTeamList().then(
			(teamList) => {
				that.setData({
					teamList: teamList,
				})
			},
			() => {}
		)
		this.setData({
			refreshing: false,
		})
	},
	// 触底加载新页
	loadNewPage() {
		this.setData({
			showBottomLoading: true,
			isBottomLoading: true,
		})
		this.data.page += 1
		var that = this
		this.requestTeamList().then(
			(teamList) => {
				that.setData({
					teamList: this.data.teamList.concat(teamList),
					isBottomLoading: false,
				})
			},
			() => {}
		)
	},
	// 底部tab切换
	changetab(e) {
		var tabindex = e.currentTarget.dataset.tabindex
		if (tabindex != this.data.tabCur) {
			this.setData({
				tabCur: parseInt(tabindex),
			})
		}
	},
	// 设置筛选
	setFilter() {
		this.setData({})
	},
	// 跳转到发布页
	jumpToIssue() {
		var ifLogin = wx.getStorageSync('ifLogin')
		if (ifLogin) {
			wx.navigateTo({
				url: '/pages/createTeam/createTeam',
			})
		} else {
			this.showModal('login')
		}
	},
	showLoginModal() {
		this.showModal('login')
	},
	// 显示/隐藏模态框
	showModal(modalName) {
		this.setData({
			modalName: modalName,
		})
	},
	hideModal(e) {
		this.setData({
			modalName: null,
		})
	},
	// 收藏团队
	onCollectTeam(e) {
		var team = e.detail.team
		var collectStatus = e.detail.collect
		var collectTeamID = team.team_id
		if (collectStatus) {
			request('/collect/add', 'POST', { team_id: collectTeamID }).then(
				(res) => {
					console.log(res)
				},
				() => {}
			)
		} else {
			request('/collect/delete', 'POST', { team_id: collectTeamID }).then(
				(res) => {
					console.log(res)
				},
				() => {}
			)
		}
		console.log(collectTeamID)
	},
	// 举报团队
	onAccuseTeam(e) {
		console.log(e)
		var team = e.detail.team
		var accuseTeamID = team.team_id
		this.setData({
			accuseTeamID: accuseTeamID,
		})
		// 显示举报模态框
		this.showModal('accuse')
	},

	// 展示筛选弹窗
	showFliterBox() {
		this.setData({
			showFilter: !this.data.showFilter,
		})
	},
	// 显示只看本校
	setLocalSchool() {
		const fliter = this.data.fliter
		fliter.isLocalSchool = !fliter.isLocalSchool
		this.setData({
			fliter: fliter,
		})
	},
	sihft() {
    const fliter = this.data.fliter


    this.showFliterBox()
  },
})
