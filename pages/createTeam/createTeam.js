

const app = getApp()
// pages/teamDetail/teamDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选中一级分类
    firstSelect: {},
    inds: [-1, -1, -1, -1],
    curClass: {},
    cur: 0,
    classTitle: '',

    // 动画类型
    animationST: '',
    animationSB: '',
    animationSL: '',
    animationSR: '',
    reverse: true,
    

    // 选择分类模态框展示
    showClassModal: false,
    // 步骤条步骤
    step: 0,
    stepList: [{
      name: '队伍信息',
      fined: true,
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
    // 分类 
    class: {
      edit: false, name: '分类',
      nextClass:[{
        edit: false, name: '竞赛',
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
        edit: true, name: '证书', input:'', tip: '证书名称'
      },
      {
        edit: false, name: '创业'
      },
      {
        edit: false,name: '科研',
        nextClass: [
          {edit: false, name: '工科', input:'', tip: '科研名称'},
          {edit: false, name: '文体', input:'', tip: '科研名称'},
          {edit: false, name: '理科', input:'', tip: '科研名称'},
          {edit: false, name: '商科', input:'', tip: '科研名称'},
          {edit: false, name: '综合', input:'', tip: '科研名称'},
        ]
      },
      {
        edit: false,name: '创意'
      },
      {
        edit: false,name: '兴趣'
      },] },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curClass: this.data.class
    })
  },
  //  展示分类选择模态框
  showClassModal() {
    this.setData({
      showClassModal: true
    })
  },
    //  隐藏分类选择模态框
  hideModal() {
    this.setData({
      showClassModal: false,
      isFirstSelect: false
    })
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
    }, 500)
    setTimeout(function() {
      that.setData({
        animationSR: '',
      })
    }, 1000)
  },

  // 返回上一分级
  toPreClass() {
    const that = this
    let cur = this.data.cur
    let inds = this.data.inds
    let curClass = this.data.class
    let classTitle = ''
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
    }, 500)
  },

  // 步骤条步骤控制
  numSteps() {
    this.setData({
      step: this.data.step == this.data.stepList.length - 1 ? 0 : this.data.step + 1
    })
  },
})