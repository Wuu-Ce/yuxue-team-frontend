const request = require("./utils/util.js").request

App({
  onLaunch() {
    request('/test/login','POST',{'user_id':1}).then(
      (res)=>{
        wx.setStorageSync('cookie', res.cookies[0]);
        console.log(res)
      },
      (error)=>{
        console.log(error.message);
      }
    )

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
    user_id : 1,
  }
})
