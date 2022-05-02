const request = require("../../utils/util.js").request
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success(res){
        if(res.code){
          request('/auth/wx/status','POST',{code:res.code}).then(
            (res)=>{
              var bind = res.data.data.bind;
              that.setData({
                bind: bind  // 表示是否与微信绑定
              })
            },
            ()=>{}
          )
        }
      }
    })
    
  },
  // 退出登录
  logOut(){
    wx.clearStorageSync()
    wx.setStorageSync('ifLogin', false)
    wx.navigateBack({
      delta: 0,
    })
  },
  // 绑定微信
  bindWechat(){
    var bind = this.data.bind;
    var that = this;
    if(bind){  // 解绑微信
      wx.login({
        success(res){
          if(res.code){
            request('/auth/wx/unbind','POST',{code:res.code}).then(
              ()=>{
                that.setData({
                  bind: false
                })
                wx.showToast({
                  title: '解绑成功',
                })
              },
              ()=>{
                wx.showToast({
                  title: '解绑失败',
                  icon: "error",
                })
              }
            )
          }
        }
      })
    }else{  // 绑定微信
      wx.getUserProfile({
        lang: "zh_CN",
        desc: "您的信息将用于账号与微信的绑定",
        success(res){
          var avatar = res.userInfo.avatarUrl;
          var nickname = res.userInfo.nickName;
          wx.login({
            success(res){
              if(res.code){
                request('/auth/wx/bind','POST',{code:res.code,avatar:avatar,nickname:nickname}).then(
                  ()=>{
                    that.setData({
                      bind: !bind
                    })
                    wx.showToast({
                      title: '绑定成功',
                    })
                  },
                  ()=>{
                    wx.showToast({
                      title: '绑定失败',
                      icon: "error",
                    })
                  }
                )
              }
            }
          })
        }
      })
    }
  },
})