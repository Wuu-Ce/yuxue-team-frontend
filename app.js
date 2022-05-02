const createTeam = require("./test.js").createTeam
const createFastRecruit = require("./test.js").createFastRecruit
App({
  onLaunch() {
    // request('/test/login','POST',{'user_id':7}).then(
    //   (res)=>{
    //     wx.setStorageSync('cookie', res.cookies[0]);
    //     console.log(res)
    //   },
    //   (error)=>{
    //     console.log(error.message);
    //   }
    // )

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
    // 创建团队
    // for(let i=0;i<20;i++){
    //   createTeam(1,1,'jfdoadi','jdfioa','jfdoa','jdfoai','djfioa')
    // }

    // 发布招募
    // for(let i=0;i<20;i++){
    //   createFastRecruit(i+14,false,3,'jfodaijo')
    // }

// 14-33
  },
  globalData: {
    userInfo: null,
    user_id : 1,
  }
})
