import {__formatTime, request} from '../../utils/util'
const app = getApp()

let requet_list = [
  {compelte: false, vlaue: '招募要求'},
  {compelte: false, vlaue: '截止时间'},
  {compelte: false, vlaue: '限定本校'},
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,
    showOkModal: false,
    showDatePicker: false,
    showDropDown: false,
    dropMenu:{
      select:{ id:0, value:'普通招募'},
      types: [{ id:0, value:'普通招募'}, { id:1, value:'快速招募'}],
      contentH: 120,
    },
    nowTime: new Date().getTime(),
    deadline: new Date().getTime() + 15768000000*2,

    recruit: {
      // request 参数
      teamID: 1,
      isLocal: false,
      type:0,
      num: 1,
      isDeadline: false,
      deadline: '请选择日期',
      deadline_time: new Date().getTime(),
      neccessary: {
        type: 0,
        detail: []
      },
      // 状态参数
      sub_ind: 0,
      add_ind: 0,
      subing: false,
      adding: false
      
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let recruit = this.data.recruit
    recruit.teamID = parseInt(options.team_id) 
    this.setData({
      recruit: recruit 
    })
    const now = new Date().getTime()
    this.setData({
      nowTime: now,
      deadline: now + 15768000000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const team_id = this.data.recruit.teamID
    this.getRelation(team_id)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

    // 用户与队员关系接口
    getRelation(team_id) {
      const relation = request('/team/relation', 'POST', {
        team_id: team_id
      })
      relation.then(
        res => {
          const data = res.data.data
          if (data.status === -1) {
            wx.showToast({
              icon: 'error',
              title: '队伍不存在',
              duration: 2000
            })
          }
          if (!data.isLeader) {
						wx.showToast({
							icon: 'error',
							title: '您不是队长！',
							duration: 2000,
						})
						setTimeout(function () {
							wx.navigateBack({
								delta: 1,
							})
						}, 2000)
					}
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
  // 增加招募人数
  addNum() {
    let recruit = this.data.recruit
    recruit.num++
    this.setData({
      recruit: recruit
    })
  },
  // 减少招募人数
  subNum() {
    if(this.data.recruit.num>1) {
      let recruit = this.data.recruit
      recruit.num--
      this.setData({
        recruit: recruit
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '至少招募1人',
        duration: 1000
      })
    }
  },

  // 输入人数
  inputNum(e) {
    this.data.recruit.num = e.detail.value
  },

  // 输入人数完成
  confirmNum(e) {
    if(e.detail.value>1) {
      this.data.recruit.num = e.detail.value
    } else {
      wx.showToast({
        icon: 'error',
        title: '至少招募1人',
      })
    }
  },
  // 是否设置截止时间
  switchDeadline(e) {
    let recruit = this.data.recruit
    recruit.isDeadline = e.detail.value
    this.setData({
      recruit: recruit
    })
  },
  // 显示日期选择器
  showDatePicker() {
    this.setData({
      showDatePicker: true
    })
  },
  // 关闭时间选择器
  onTimeClose(e) {
    let recruit = this.data.recruit
    recruit.deadline_time = e.detail.time
    recruit.deadline = e.detail.date
    this.setData({
      recruit: recruit
    })
  },
  // 日期选择器提交
  onTimeConfirm(e) {
    let recruit = this.data.recruit
    recruit.deadline_time = e.detail.time
    recruit.deadline = e.detail.date
    this.setData({
      recruit: recruit
    })
  },
  // 显示下拉菜单
  showDropDown() {
    this.setData({
      showDropDown: !this.data.showDropDown
    })
  },
  // 下拉菜单选中
  onSelectDrop(e) {
    const ind = e.currentTarget.dataset.index
    let drop = this.data.dropMenu
    let recruit = this.data.recruit
    let type = drop.types[ind]
    let neccessary = this.data.recruit.neccessary
    recruit.type = type.id
    if(type.id==neccessary.type)
    {
      this.showDropDown()
      return
    }
    else {
      neccessary.type = type.id
    }
    // 修改容器高度
    if(type.id==0) {
      drop.contentH = 120
      recruit.num = 0
      neccessary.detail = []
    } else {
      drop.contentH = 320
      recruit.num = 0
      neccessary.detail = ''
    }
    this.data.recruit.neccessary = neccessary
    drop.select =type
    this.setData({
      recruit: this.data.recruit,
      dropMenu: drop,
      showDropDown: !this.data.showDropDown
    })
    console.log(this.data.recruit)
  },
  // 填写方向
  inputArea(e) {
    let index = e.currentTarget.dataset.index
    let recruit = this.data.recruit
    recruit.neccessary.detail[index].role = e.detail.value
  },
  // 填写详细要求
  inputRequirement(e) {
    let index = e.currentTarget.dataset.index
    let recruit = this.data.recruit
    recruit.neccessary.detail[index].requirement = e.detail.value
  },
  // 快速招募信息
  bindFastDetail(e) {
    this.data.recruit.neccessary.detail = e.detail.value
  },
  // 添加详细要求 
  addDetail() {
    const that = this
    // 设置参数
    let drop = this.data.dropMenu
    let recruit = this.data.recruit
    let newDetail = {role: '', requirement:''}
    drop.contentH<350? drop.contentH += 110 : drop.contentH++
    recruit.num++
    recruit.neccessary.detail.push(newDetail)
    recruit.adding = true
    recruit.add_ind++
    that.setData({
      dropMenu: drop,
      recruit: recruit
    })
    setTimeout(function() {
      recruit.adding = false 
      that.setData({
        recruit: recruit
      })
    }, 500)

  },
  // 删除一项详细要求
  deleteDetail(e) {
    const that = this
    let drop = this.data.dropMenu
    let index = e.currentTarget.dataset.index
    let recruit = this.data.recruit
    console.log(index)
    console.log(recruit.neccessary.detail)
    recruit.neccessary.detail.splice(index, 1)
    if(recruit.neccessary.detail.length<3) {
      drop.contentH -= 110
    }
    that.setData({
      
    })
    recruit.subing = true
    recruit.sub_ind = index
    recruit.add_ind--
    that.setData({
      dropMenu: drop,
      recruit: recruit
    })
    setTimeout(function() {
      recruit.subing = false 
      that.setData({
        recruit: recruit
      })
    }, 500)
  },
  // 切换校内
  changeLocal (e) {
    this.data.recruit.isLocal = e.detail.value
  },

  // 提交
  confirmRecruit() {
    wx.showToast({
      icon:'loading',
      title: '发布中',
    })
    let recruit = this.data.recruit
    let requestData = {}
    let API = ''
    if(recruit.type === 0) {
      API = '/recruit/leader/createNormal'
      requestData = {
        team_id: recruit.teamID,
        is_local: recruit.isLocal,
        items: recruit.neccessary.detail
      }
    } else {
      API = '/recruit/leader/createFast'
      requestData = {
        team_id: recruit.teamID,
        is_local: recruit.isLocal,
        count: recruit.num,
        requirement: recruit.neccessary.detail
      }
    }
    if(recruit.isDeadline) {
      requestData.expire_time = recruit.deadline_time / 1000
    }

    //  请求
    let res = request(API, 'POST', requestData)
    res.then(
      e => {
        console.log(e)
        wx.hideToast({
          success: (res) => {
            wx.showToast({
              icon: 'success',
              title: '发布成功',
              duration: 2000,
            })
            setTimeout(function() {
              wx.navigateBack({
                delta: 1,
              })
            },1000)
          },
        })
      },
      e => {
        wx.hideToast()
        let message = ''
         message= e.code === 40105 ? '有未结束的招募': '发布失败'
        wx.showToast({
          icon: 'error',
          title: message,
          duration: 2000
        })
        console.log(e)
      }
    )
  },
  recuritAvailable() {
    let res = {
      avalible: true,
      errMsg: ''
    }
    const recruit = this.data.recruit
    switch(recruit.type) {
      case 0: 
       if (recruit.neccessary.detail.length === 0) {
					res = {
						avalible: false,
						errMsg: '至少添加一项招募要求',
					}
				} else {
					for (const item of recruit.neccessary.detail) {
						if (item.role === '' || item.requirement === '') {
							res = {
								avalible: false,
								errMsg: '招募的方向或要求未完善',
              }
              break
						}
					}
				}
        break
      case 1:
        if (recruit.neccessary.detail === '') {
					res = {
						avalible: false,
						errMsg: '未填写招募说明',
					}
				} else if (recruit.num < 1) {
					res = {
						avalible: false,
						errMsg: '至少招募一人',
					}
				}
        break
      default: 
        break
    }
    return res
  },

    // 切换确认框显示状态
  showOkModal() {
    const recruit = this.data.recruit
    const that = this
    let func = ()=> this.confirmRecruit()
    let modalContent = '确认发布招募信息'
    const avalibleMsg = this.recuritAvailable()
    if(!avalibleMsg.avalible){
      modalContent = avalibleMsg.errMsg
      func = ()=> {}
    }
    wx.showModal({
			showCancel: avalibleMsg.avalible,
			title: '提示',
			content: modalContent,
			cancelColor: '#000',
			success(res) {
				if (res.confirm) {
          func()
				} 
			},
		})

    // this.setData({
    //   showOkModal: true
    // })
  },


  // 显示提示信息
  showTip() {
    this.setData({
      showTip: true
    })
  },
  // 隐藏提示信息
  hiddenTip() {
    this.setData({
      showTip: false
    })
  }
})