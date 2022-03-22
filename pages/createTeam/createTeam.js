const app = getApp()
// 队伍信息可用 队名-分类-介绍-规约
let teamable = [false, false, false, false]
// 队长信息可用 队长名-年级-介绍
let leaderable = [false, false, false]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 步骤条步骤
    step: 0,
    stepList: [{
      name: '队伍信息',
      fined: false,
    }, {
      name: '队长信息',
      fined: false,
    }, {
      name: '确认',
      fined: false,
    }, {
      name: '完成',
      fined: false,
    }, ],
    // 选中分类
    cur: 0,
    inds: [-1, -1, -1, -1],
    curClass: {},
    classTitle: '',

    // 展示分类
    classSelected: false,
    showClass: [],

    // 返回结果-队伍信息
    team: {
      teamName: '',
      classification: {},
      teamAbout: '',
      teamProtocol: ''
    },
    // 返回结果-队长信息
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

    // 分类 
    class: {
      edit: false, name: '分类',
      nextClass:[{
        id:0, edit: false, name: '竞赛',
        nextClass: [
          {edit: false, name: '工科', nextClass:[
            {edit: true, name: '数学建模', input:'', tip: '竞赛名称' },
            {edit: true, name: '程序设计',input:'', tip: '竞赛名称'},
            {edit: true, name: '机器人',   input:'', tip: '竞赛名称'},
            {edit: true, name: '工程机械',input:'', tip: '竞赛名称'},
            {edit: true, name: '土木建筑',input:'', tip: '竞赛名称'},
            {edit: true, name: '大数据',   input:'', tip: '竞赛名称'},
          ]},
          {edit: false, name: '工业&创意设计', nextClass:[
            {edit: true, name: '外语',input:'', tip: '竞赛名称'},
            {edit: true, name: '演讲主持&辩论',input:'', tip: '竞赛名称'},
            {edit: true, name: '模特',   input:'', tip: '竞赛名称'},
            {edit: true, name: '歌舞书画&摄影',input:'', tip: '竞赛名称'},
            {edit: true, name: '体育',input:'', tip: '竞赛名称'},
            {edit: true, name: '科技文化艺术节',   input:'', tip: '竞赛名称'},
          ]},
          {edit: false, name: '理科', input:'', tip: '竞赛名称'},
          {edit: false, name: '商科', input:'', tip: '竞赛名称'},
          {edit: false, name: '综合', input:'', tip: '竞赛名称'},
        ],},
      {
        id:1, edit: true, name: '创业', input:'', tip:'创业方向'
      },
      {
        id:2, edit: true,name: '兴趣', input:'', tip:'兴趣类型'
      },
      {
        id:3, edit: true,name: '学习', input:'', tip:'学习内容'
      },] 
    },
    // 年级
    grades: ["大一", "大二", "大三", "大四", "研一", "研二"],
    // 年级必要性
    gradeNecessary: false,
    // 展示年级选择组件
    showGradePicker: false,
    // 容器高度
    scrollH: wx.getSystemInfoSync().windowHeight - app.globalData.CustomBar - 90,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curClass: this.data.class
    })
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
    this.data.team.teamName = e.detail.value
    if(e.detail.value !== '') {
      teamable[0] = true
    }
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
    this.data.team.teamAbout = e.detail.value
    if(e.detail.value !== '') {
      teamable[2] = true
    }
  },
  // 输入队伍规约
  bindTeamProtocol(e) {
    this.data.team.teamProtocol = e.detail.value
    if(e.detail.value !== '') {
      teamable[3] = true
    }
  },
  // 获得一级分类
  getNextClass(e) {
    // 动画
    const that = this
    // 修改当前所在分类类别
    let cur = this.data.cur
    let inds = this.data.inds
    let curClass = this.data.curClass
    let classTitle = this.data.classTitle
    const index = e.currentTarget.dataset.index
    
    curClass = curClass.nextClass[index]
    inds[cur++] = index
    if(cur>1)
      classTitle+= ' - '
    classTitle += curClass.name
    that.setData({
      selected: index,
      classTitle: classTitle
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
    // 修改选中值
    this.setData({
      selected: inds[--cur],
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
    let inds = this.data.inds
    let cur = this.data.cur
    let classTitle = this.data.classTitle
    let curClass = this.data.class.nextClass[inds[0]]
    let curClassification = this.data.team.classification
    let showClass = []
    // 设置展示的分类
    showClass.push(classTitle)
    // 一级分类
    curClassification.id = curClass.id
    curClassification.name = curClass.name
    // 判定年级是否必须
    if(curClass.id<2) {
      this.setData({
        gradeNecessary: true,
        showGradePicker: true
      })
    } else {
      this.setData({
        gradeNecessary: false,
        showGradePicker: false
      })
    }
    // 次级分类
    curClassification.subcategories = []
    for(let i=1; i<cur; i++) {
      curClass = curClass.nextClass[inds[i]]
      curClassification.subcategories.push(curClass.name)
    }
    // 名称
    console.log(curClass)
    if(curClass.edit) {
      curClassification.subcategories.push(curClass.input)
      showClass.push(curClass.input)
    }
    this.setData({
      showClassModal: false,
      classSelected: true,
      showClass: showClass,
      // 点击确认后重置数据
      // cur: 0,
      // inds: [-1, -1, -1, -1],
      // curClass: {},
      // classTitle: ''
    })
  },
  
  submitTeamInfo(e) {
    const that = this
    let success = true
    let unfinish = ''
    for(let i=0; i<teamable.length; i++) {
      if(!teamable[i]) {
        success = false
        unfinish += ((i+1).toString()+ ' ')
      }
    }
    if(success) {
      let steps = this.data.stepList
      steps[this.data.step].fined = true
      this.setData({
        team: this.data.team,
        stepList: steps
      })
      this.nextStep()
    } else {
      this.setData({
        showWarningModal: true,
        warningText: unfinish + '还未完成'
      })
      setTimeout( function() {
        that.setData({
          showWarningModal: false
        })
      }, 2000)
    }
  },
  // 输入队长名称
  bindLeaderName(e) {
    this.data.leader.leaderName = e.detail.value
    if(e.detail.value.length) {
      leaderable[0] = true
    }
  },
  // 选择年级
  gradeChange(e) {
    const ind = e.detail.value[0]
    this.data.leader.grade = this.data.grades[ind]
    leaderable[1] = true
  },
  // 输入队长介绍
  bindLeaderInfo(e) {
    this.data.leader.leaderInfo = e.detail.value
    if(e.detail.value.length) {
      leaderable[2] = true
    }
  },
  // 展示/隐藏年级选择
  bindGradePicker() {
    this.setData({
      showGradePicker: !this.data.showGradePicker
    })
  },

  submitLeaderInfo(e) {
    let unfinish = ''
    const that = this
    for(let i=0; i<leaderable.length; i++) {
      if(!leaderable[i]) {
        unfinish += (i+1).toString() + ' '
      }
    }
    console.log(leaderable)
    if(unfinish.length) {
      //error
      this.setData({
        showWarningModal: true,
        warningText: unfinish + '还未完成'
      })
      setTimeout( function() {
        that.setData({
          showWarningModal: false
        })
      }, 2000)
    } else {
      // success
      this.setData({
        leader: this.data.leader
      })
      this.nextStep()
    }
  },

})