import {
  request,
  classification,
  copyObject
} from '../../utils/util'
const CONFIG = require("../../config.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上个页面数据
    prevPage: {},    
    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar,
    // 组件展示
    showMemberPop: false,
    popType: '',
    // 队伍信息副本
    teamCopy: {},
    relation: 0,
    team: {
      team_id: '10000001',
      name: '予学团队',
      description: '',
      createTime: '2022年3月24日',
      avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg',
      classification: ['竞赛', '计算机'],
      typeinfo: '微信小程序应用开发大赛',
      goal: ''
    },
    // 文本输入组件参数
    inputShow: false,
    inputTitle: '',
    inputType: 'input',
    inputValue: '',
    inputPlaceholder: '',
    textChanged: false,
    // 动画类型
    animation: '',
    animationST: '',
    animationSB: '',
    animationSL: '',
    animationSR: '',
    reverse: true,
    // 选择分类模态框展示
    showClassModal: false,
    // 分类 
    class: copyObject(classification),
    // 选中分类
    cur: 0,
    inds: [-1, -1, -1, -1],
    curClass: {},
    classTitle: '',
    classArrayTemp: [],
    classArray: [],
    nowTag: '',
    // 展示分类
    classSelected: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const team_id = parseInt(options.team_id)
    console.log(team_id);
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    const team = prevPage.data.team //取上页data里的数据也可以修改
    const relation = prevPage.data.relation
    if (team.team_id == team_id)
      this.setData({
        prevPage: prevPage,
        team: team,
        teamCopy: copyObject(team),
        curClass: this.data.class,
        relation: relation
      })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 输入
  inputText(e) {
    const title = e.currentTarget.dataset.title
    const type = e.currentTarget.dataset.type
    const value = e.currentTarget.dataset.value
    const placeholder = e.currentTarget.placeholder
    this.setData({
      inputShow: true,
      inputTitle: title,
      inputType: type,
      inputValue: value,
      inputPlaceholder: placeholder
    })
  },
  // 输入完成
  inputConfirm(e) {
    const team = this.data.team
    let changed = true
    switch (e.detail.title) {
      case '名称':
        team.name = e.detail.value
        break
      case '介绍':
        team.description = e.detail.value
        break
      case '目标':
        team.goal = e.detail.value
        break
      case '规约':
        team.rule = e.detail.value
        break
      case '公告':
        team.announce = e.detail.value
        break
      case '邀请成员': 
        changed = false
        this.inviteMember(e.detail.value)
        break
      default:
        break
    }
    this.setData({
      team: team,
      textChanged: changed
    })
  },
  // 取消更新团队信息
  cancelTeamInfo() {
    this.setData({
      team: this.data.teamCopy,
      textChanged: false
    })
  },
  // 更新队伍信息
  updateTeamInfo() {
    const that = this
    const prevPage = that.data.prevPage
    wx.showToast({
      icon: 'loading',
      title: '保存中'
    })
    const team = that.data.team
    const request_data = {
      field_id: team.field_id,
      team_id: team.team_id,
      type: team.type,
      typeinfo: team.typeinfo,
      goal: team.goal,
      name: team.name,
      description: team.description,
      rule: team.rule,
      announce: team.announce
    }
    console.log("请求参数：")
    console.log(request_data)
    const res = request('/team/update', 'POST', request_data)
    res.then(
      res => {
        console.log("返回参数")
        console.log(res)
        wx.hideToast()
        wx.showToast({
          icon: 'sccuess',
          title: '保存成功',
          duration: 1000
        })
        prevPage.setData({
          team: team,
        })
        this.setData({
          textChanged: false
        })

      },
      res => {
        console.log(res)
        wx.hideToast()
        wx.showToast({
          icon: 'error',
          title: '保存失败',
          duration: 1000
        })
        that.setData({
          team: teamCopy
        })
      }
    )
  },
  // 邀请成员
  inviteMember(user_id) {
    
  },
  //  展示分类选择模态框
  showClassModal() {
    this.setData({
      showClassModal: true
    })
  },
  //  隐藏分类选择模态框
  hideModal() {
    const that = this
    this.setData({
      showClassModal: false,

    })
  },
  // 获得下一级分类
  getNextClass(e) {
    // 动画
    const that = this
    // 修改当前所在分类类别
    let cur = this.data.cur
    let inds = this.data.inds
    let curClass = this.data.curClass
    let classTitle = this.data.classTitle
    let classArray = this.data.classArrayTemp
    const index = e.currentTarget.dataset.index
    // 设置显示的分类数组
    if (curClass === [])
      curClass = this.data.class
    curClass = curClass.nextClass[index]
    inds[cur++] = index
    if (cur <= 1)
      this.data.team.type = curClass.id
    else
      classTitle += ' - '
    classTitle += curClass.name
    classArray.push(curClass.name)
    that.setData({
      selected: index,
      classTitle: classTitle,
      classArrayTemp: classArray
    })
    // 动画
    that.setData({
      animationST: 'slide-top',
      animationSL: 'slide-left',
      animationSB: 'slide-bottom',
      reverse: true
    })
    setTimeout(function () {
      that.setData({
        animationST: '',
        animationSL: '',
        animationSB: '',
        animationSR: 'slide-right',
        reverse: false,
        inds: inds,
        cur: cur,
        curClass: curClass
      })
    }, 300)
    setTimeout(function () {
      that.setData({
        animationSR: '',
      })
    }, 600)
  },

  // 返回上一分级
  toPreClass() {
    const that = this
    let cur = this.data.cur
    let inds = this.data.inds
    let curClass = this.data.class
    let classArrayTemp = this.data.classArrayTemp
    let classTitle = ''
    if (curClass.edit) {
      curClass.input = ''
    }
    classArrayTemp.pop()
    // 修改选中值
    this.setData({
      selected: inds[--cur],
      classArrayTemp: classArrayTemp
    })
    inds[cur] = -1;
    // 修改所在分类
    for (let i = 0; i < cur; i++) {
      curClass = curClass.nextClass[inds[i]]
      if (i > 0)
        classTitle += ' - '
      classTitle += curClass.name
    }
    //  动画
    this.setData({
      animationST: 'slide-top',
      animationSL: 'slide-left',
      animationSB: 'slide-bottom',
      cur: cur,
      inds: inds,
      curClass: curClass,
      classTitle: classTitle
    })
    setTimeout(function () {
      that.setData({
        animationST: '',
        animationSL: '',
        animationSB: '',
      })
    }, 300)
  },
  // 输入分类名称 typeinfo
  bindClassInput(e) {
    this.data.curClass.input = e.detail.value
  },

  // 确认分类
  modalOK() {
    const curClass = this.data.curClass
    const team = this.data.team
    const teamCy = this.data.teamCopy
    const classArrayTemp = this.data.classArrayTemp
    if (curClass.edit) {
      if (curClass.input === '') {
        wx.showToast({
          icon: 'error',
          title: '请输入名称',
          duration: 2000
        })
        return
      }

    }
    team.classification = classArrayTemp
    team.field_id = curClass.id
    team.typeinfo = curClass.input
    let changed = (team.typeinfo === teamCy.typeinfo && team.classification.slice(-1)[0] === teamCy.classification.slice(-1)[0]) ? false : true
    // console.log(team.classification.slice(-1)[0] )
    // console.log(teamCy.classification.slice(-1)[0])
    // console.log(changed)

    this.setData({
      showClassModal: false,
      classSelected: true,
      team: team,
      textChanged: changed
    })
  },
  // 选择图片
  chooseImage() {
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      camera: 'back',
      success(res) {
        const team = that.data.team
        wx.compressImage({
          src: res.tempFiles[0].tempFilePath, // 图片路径
          quality: 1, // 压缩质量
          success(res1) {
            team.avatar = res1.tempFilePath
            that.upLoadLogo()
          }
        })
      }
    })
  },
  // 上传logo
  upLoadLogo() {
    wx.showLoading({title: '更换中'})
    const prevPage = this.data.prevPage
    const that = this
    const team = that.data.team
    const cookie = wx.getStorageSync('cookie')
    var root_url = CONFIG.online_url ? CONFIG.online_url : CONFIG.dev_url
    wx.uploadFile({
      url: root_url + '/upload/avatar/team',
      filePath: team.avatar,
      name: 'file',
      formData: {
        'team_id': team.team_id
      },
      header: {
        'Content-Type': 'multipart/form-data; charset=utf-8',
        'cookie': cookie
      },
      success(res) {
        wx.hideLoading()
        console.log(res)
        const data = JSON.parse(res.data)
        if (data.code === 0) {
          team.avatar = data.data.avatar
          that.setData({
            team: team
          })
          prevPage.setData({
            team: team
          })
          wx.showToast({
            icon: 'success',
            title: '更换成功',
            duration: 1000
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: '更换失败',
            duration: 1000
          })
        }
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: res.message,
          duration: 2000
        })
      }
    })
  },
  // 展示队伍面板
  showMemberPop(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      showMemberPop: true,
      popType: type
    })
  },
  onCloseMember(e) {
    this.setData({
      showMemberPop: false
    })
  },

  //跳转成员页面
  toMemberInfo() {
    wx.navigateTo({
      url: '/pages/memberInfo/memberInfo',
    })
  },
  // 停止招募确认弹窗
  stopReciut() {
    const that = this
    if(!this.data.prevPage.data.recruit[0]) {
      wx.showToast({
        icon: 'error',
        title: '未进行招募',
        duration: 1000
      })
      return
    }
    wx.showModal({
      title: '停止招募',
      content: '要停止招募吗？',
      confirmColor: '#080C4',
      confirmText: '停止',
      cancelColor: 'cancelColor',
      success(res) {
        if(res.confirm) {
          that.stopReciutRequest()
        }
      }
    })
  },
  // 停止招募-接口
  stopReciutRequest() {
    const prevPage = this.data.prevPage
    const recruit_id = prevPage.data.recruit[0].recruit_id
    wx.showLoading({
      title: '正在停止招募',
    })
    const stopRes = request('/recruit/leader/stop', 'POST', {recruit_id: recruit_id})
    stopRes.then(
      res => {
        wx.hideLoading()
        if(res.data.code === 0){
          prevPage.setData({
            recruit: []
          })
          wx.showToast({
            icon: 'success',
            title: '已停止招募',
            duration: 1000
          })
        }
      },
      error=> {
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: error.message,
          duration: 2000
        })
      })
  },
  // 点击解散团队
  onClickDisband() {
    const that = this
    wx.showModal({
      title: '解散团队',
      content: '要解散团队吗？',
      confirmColor: '#DC143C',
      confirmText: '解散',
      cancelColor: 'cancelColor',
      success(res) {
        if(res.confirm) {
          that.disbandTeam()
        }
      }
    })
  },
  disbandTeam() {
    wx.showLoading({
      title: '解散中...',
    })
    const request_data = {
      team_id: this.data.team.team_id
    }
    const res = request('/team/dissolve', 'POST', request_data)
    res.then(
      res=> {
        wx.hideLoading()
        wx.showToast({
          icon: 'success',
          title: '团队已解散',
          duration: 1000,
          success(res) {
            console.log(res)
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        })
      },
      error=> {
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: error.message,
          duration: 1000
        })

      }
    )

  }
})


