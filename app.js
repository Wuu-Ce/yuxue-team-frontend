const request_nocheck = require("./utils/util.js").request_nocheck
const request = require("./utils/util.js").request

App({
  onLaunch() {
    let res = request('team/new','POST',{})
    res.then(
      (res)=>{
        console.log(res);
      },
      (res)=>{
        console.log(res);
      }
    )
    wx.login({
      success: res => {
        var code = res.code;
        var res = request_nocheck('auth/wx/login','POST',{code: code})
        res.then(
          (res)=>{  // 如果已经登录
            console.log(res);
            wx.setStorageSync('cookie',res.cookies[0]);
          },
          (res)=>{  // 尚未登录
            console.log(res);
            wx.login({
              success(res){
                var res = request_nocheck("auth/wx/reg",'POST',{code: res.code})
                res.then(
                  (res)=>{
                    console.log(res);
                  },
                  (res)=>{
                    console.log(res);
                  }
                )
              }
            })
          }
        )
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
  }
})
