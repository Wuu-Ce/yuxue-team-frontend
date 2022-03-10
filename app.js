// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 环境信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // 页面列表
    pageList: [
      {index: 0,pageName: '主界面',pageFile: 'index'},
      {index: 1,pageName: '我的队伍',pageFile: 'myTeam'},
      {index: 2,pageName: '创建队伍',pageFile: 'createTeam'}],
    // 当前页面
    pageCur: 0,
    // 用户依次访问的页面，便于回退，初始时只有0
    pageVisited: [0],
  },
  // 修改当前页面的index
  setPageCur(index){
    this.globalData.pageCur = index;
  },
  // 将用户访问的新页面加入页面访问表
  setPageNext(index){
    this.globalData.pageVisited.push(index);
  },
  // 页面回退函数，返回上一个页面的index
  pageBack(){
    console.log()
    if(this.globalData.pageVisited.length>1){
      this.globalData.pageVisited.pop();
      return this.globalData.pageVisited[this.globalData.pageVisited.length-1];
    }else{
      return 0;
    }
  },
  // 回到主页面
  pageInitialize(){
    while(this.globalData.pageVisited.length>0){
      this.globalData.pageVisited.pop();
    }
    this.globalData.pageVisited.push(0);
  }
})
