import { request, classification,copyObject } from '../../utils/util.js'
const CONFIG = require("../../config.js")
const app = getApp()
// 队伍信息可用 队名-分类-介绍-规约
let teamable = [false, false, false, false, false]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 步骤条步骤
    step: 0,
    stepList: [{name: '团队信息',fined: false,}, {name: '确认',fined: false,}],
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
    showClass: [],

    // 目标，规约展示
    showGoal: false,
    showRule: false,

    // 返回结果-队伍信息
    team: {
      avatar: CONFIG.avatar_static_url + '/0.jpg',
      name: '',
      field_id: 0,
      type: {},
      typeinfo: '',
      description: '',
      goal: '',
      rule: ''
    },
    // 返回结果-队长信息
    showLeaderInfo: false,
    leader: {
      leaderName: '',
      grade: '',
      leaderInfo: ''
    },

    // 动画类型
    animation: '',
    animationST: '',
    animationSB: '',
    animationSL: '',
    animationSR: '',
    reverse: true,
    

    // 选择分类模态框展示
    showClassModal: false,
    showWarningModal: false,
    warningText: '',
    showOkModal: false,

    // 分类 
    class: copyObject(classification),
    // 容器高度
    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar - 80,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curClass: this.data.class
    })
    // let res = request('/team/getTypeList','POST',{})
    // res.then(
    //   (res)=>{
    //     console.log('/team/getTypeList called')
    //     console.log(res);
    //   },
    //   res => {
    //     console.log('/team/getTypeList error')
    //     console.log(res)
    //   })
      teamable = [false, false, false, false, false]

  },
   // 步骤条下一步
  nextStep() {
    const that = this
    this.setData({
      animation: 'slide-left',
      reverse: 'reverse'
    })
    setTimeout( function() {
      that.setData({
        step: that.data.step + 1,
        animation: 'slide-right',
        reverse: ''
      })
    } , 300)
    setTimeout( function() {
      that.setData({
        animation: '',
      })
    } , 600)
    
  },
  // 步骤条-上一步
  subSteps() {
    const that = this
    this.setData({
      animation: 'slide-right',
      reverse: 'reverse',
    })
    setTimeout( function() {
      that.setData({
        step: that.data.step - 1,
        animation: 'slide-left',
        reverse: '',
      })
    } , 300)
    setTimeout( function() {
      that.setData({
        animation: '',
      })
    } , 600)
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
    // 窗口消失后再重置数据
    // setTimeout(function() {
    //   that.setData({
    //     cur: 0,
    //     inds: [-1, -1, -1, -1],
    //     curClass: that.data.class,
    //     classTitle: ''
    //   })
    // }, 500)
  },
  // 输入队伍名称
  bindTeamName(e) {
    console.log(e)
    this.data.team.name = e.detail.value
    if(e.detail.value !== '') {
      teamable[0] = true
    }
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
            that.setData({
              team: team
            })
          },
          fail()  {
            wx.showToast({
              icon: 'error',
              title: '图片加载失败',
              duration: 2000
            })
          }
        })
      },
      fail() {
        wx.showToast({
          icon: 'error',
          title: '图片加载失败',
          duration: 2000
        })
      },
    })
  },
  // 竞赛名称
  bindClassInput(e) {
    this.data.curClass.input = e.detail.value
    if(e.detail.value !== '') {
      teamable[1] = true
    }
  },
  // 输入队伍介绍
  bindTeamAbout(e) {
    this.data.team.description = e.detail.value
    if(e.detail.value !== '') {
      teamable[2] = true
    }
  },
  // 目标输入展示
  switchGoal(e) {
    teamable[3] = e.detail.value? teamable[3] : true 
    this.setData({
      showGoal: e.detail.value
    })
  },
    // 输入队伍目标
    bindTeamGoal(e) {
      this.data.team.goal = e.detail.value
      if(e.detail.value !== '') {
        teamable[3] = true
      }
    },
  // 目标输入展示
  switchRule(e) {
    teamable[4] = e.detail.value? teamable[4] : true 
    this.setData({
      showRule: e.detail.value
    })
  },
  // 输入队伍规约
  bindTeamProtocol(e) {
    this.data.team.rule = e.detail.value
    if(e.detail.value !== '') {
      teamable[4] = true
    }
  },
  // 展示队长信息
  changeLeaderInfo(e) {
    this.setData({
      showLeaderInfo: e.detail.value
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
    if(curClass===[])
      curClass = this.data.class
    curClass = curClass.nextClass[index]
    inds[cur++] = index
    if(cur<=1)
      this.data.team.type = curClass.id
    else
      classTitle+= ' - '
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
    setTimeout(function() {
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
    setTimeout(function() {
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
    let classTitle = ''
    if(curClass.edit) {
      curClass.input = ''
    }
    this.data.classArrayTemp.pop()
    // 修改选中值
    this.setData({
      selected: inds[--cur],
      classArrayTemp: this.data.classArrayTemp
    })
    inds[cur] = -1;
    // 修改所在分类
    for(let i=0; i<cur; i++){
      curClass = curClass.nextClass[inds[i]]
      if(i>0)
        classTitle+= ' - '
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
    setTimeout(function() {
      that.setData({
        animationST: '',
        animationSL: '',
        animationSB: '',
      })
    }, 300)
  },
  
  // 确认分类
  modalOK() {
    let classTitle = this.data.classTitle
    let curClass = this.data.curClass
    const team = this.data.team
    let showClass = []
    // 设置展示的分类
    showClass.push(classTitle)

    team.field_id = curClass.id
    team.typeinfo = curClass.input
    if(curClass.edit) {
      if(curClass.input === '') {
        wx.showToast({
          icon: 'error',
          title: '请输入名称',
          duration: 2000
        })
        return
      }
      showClass.push(curClass.input)
    }
    this.setData({
      nowTag: curClass.input,
      showClassModal: false,
      classSelected: true,
      showClass: showClass,
      classArray: this.data.classArrayTemp
    })
  },
  // 提交队伍信息
  submitTeamInfo(e) {
    const team = this.data.team
    let success = true
    team.rule = this.data.showRule? team.rule : '无'
    teamable[3] = team.rule == ''? false : true
    team.goal = this.data.showGoal? team.goal : '无'
    teamable[4] = team.goal == ''? false: true
    for(let i=0; i<teamable.length; i++) {
      if(!teamable[i]) {
        success = false
        break
      }
    }
    if(success) {
      let steps = this.data.stepList
      steps[this.data.step].fined = true


      this.setData({
        team: team,
        stepList: steps
      })
      this.nextStep()
    } else {
      wx.showToast({
        title: '填写未完成',
        icon: 'error',
        duration: 2000
      })
    }
  },

  // 展示完成模态框
  showOkMoldal() {
    const that = this
    wx.showLoading({
      title: '队伍创建中',
    })
    const team = this.data.team
    const request_data = {
      field_id: team.field_id,
      type: team.type,
      typeinfo: team.typeinfo,
      goal: team.goal,
      name: team.name,
      description: team.description,
      rule: team.rule
    }
    console.log(request_data)
    let res = request('/team/new','POST',request_data)
    res.then(
      (res)=>{
        const team_id = res.data.data.team_id
        if(res.data.code===0) {
          this.setData({
            team_id: team_id,
        })
        that.upLoadLogo(team_id)
        } else {
          wx.showToast({
            icon: 'error',
            title: '创建失败',
            duration: 2000
          })
        }
        
      },
      res=>{
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: '创建失败',
          duration: 2000
        })
      }
    )

  },

  // 上传logo
  upLoadLogo(team_id) { 
    const that = this
    const cookie = wx.getStorageSync('cookie')
    const imagePath = this.data.team.avatar
    var root_url = CONFIG.online_url ? CONFIG.online_url : CONFIG.dev_url
    wx.uploadFile({
      url: root_url + '/upload/avatar/team',
      filePath: imagePath,
      name: 'file',
      formData: {
        'team_id': team_id
      },
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        'cookie': cookie
      },
      success (res) {
        wx.hideLoading()
        const data = JSON.parse(res.data)
        if(data.code==0) {
          that.setData({
            showOkModal: true
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: '创建失败',
            duration: 2000
          })
        }
      },
      fail (res) {
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: res.message,
          duration: 2000
        })
      }
    })
  },

    // 跳转到详情页
  redictToHome() {
    wx.redirectTo({
      url: '/pages/teamDetail/teamDetail?team_id=' +this.data.team_id ,
    })
  },

})