const request = require("../../utils/util.js").request
const CONFIG = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoUrl: "https://qiniu.freespace.yuxue0824.com/yuxueLogo.png",
    ifPhoneNumberExist: null,  // 后端返回的手机号是否存在
    ifInfoAllowed: null,  // 用户是否允许使用个人信息
    ifCountingDown: false  // 倒计时是否开启
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 输入手机号
  setPhoneNum(e){
    var phoneNumber = e.detail.value;
    this.setData({
      phoneNumber: phoneNumber
    })
  },
  // 获取验证码
  getCode(){
    var phoneNumber = this.data.phoneNumber;
    if(this.data.ifCountingDown){
      return;
    }
    if(!phoneNumber){
      wx.showToast({
        title: '请输入手机号',
        icon: 'error'
      })
    }else if(phoneNumber&&phoneNumber.length!=11){
      wx.showModal({
        title: "手机号错误！",
        content: "请输入正确的手机号",
        showCancel: false,
        success:(res)=>{
          return
        }
      })
    }else{
      request('/auth/sendSMSCode','POST',{'tel':phoneNumber}).then(
        (res)=>{
          wx.showToast({
            title: '验证码已发送',
          })
          this.countDown();
          this.setData({
            getCode: true,
            exist: res.data.data.exist
          })
        },
        ()=>{
          wx.showToast({
            title: '验证码获取失败',
            icon: "error"
          })
        }
      )
    }
  },
  // 倒计时
  countDown: function() {
    let that = this;
    let countDownNum = 61;//倒计时初始值
    that.setData({
      ifCountingDown : true,
      timer: setInterval(function () {
        countDownNum--;
        that.setData({
          countDownNum: countDownNum
        })        
        if (that.data.countDownNum <= 0) {
          clearInterval(that.data.timer);
          that.setData({
            countDownNum:"重新发送",
            ifCountingDown: false
          })
        }
      }, 1000)
    })
  },
  // 提交
  formSubmit(e){
    var phoneNumber = e.detail.value.phoneNumber;
    var verificationCode = e.detail.value.verificationCode;
    if(!phoneNumber){
      wx.showModal({
        title: "请输入手机号！",
        showCancle: false,
        success:(res)=>{
          return 
        }
      })
    }else if(phoneNumber.length!=11){
      wx.showModal({
        title: "请输入正确的手机号！",
        showCancle: false,
        success:(res)=>{
          return 
        }
      })
    }else if(this.data.getCode==null){
      wx.showModal({
        title: "请获取验证码！",
        showCancle: false,
        success:(res)=>{}
      })
    }else if(verificationCode.length==0){
      wx.showModal({
        title: "请输入验证码！",
        showCancle: false,
        success:(res)=>{}
      })
    }else{
      var data={
        'tel': phoneNumber,
        'code': verificationCode,
      }
      var url = this.data.exist?'/auth/login':'/auth/register';
      request(url,'POST',data).then(
        (res)=>{
          wx.setStorageSync('cookie',res.cookies[0]);
          wx.setStorageSync('ifLogin', true);
          wx.showModal({
            title: '绑定微信',
            content: '绑定微信后，以后便可使用微信直接登录',
            cancelText: '不绑定',
            cancelColor: '#aaaaaa',
            confirmText: '绑定',
            confirmColor: '#0081ff',
            success(res){
              if(res.confirm){
                var that = this;
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
                              wx.showToast({
                                title: '绑定成功',
                              })
                              setTimeout(()=>{
                                wx.navigateBack({})
                              },1500)
                            },
                            ()=>{
                              wx.showToast({
                                title: '绑定失败',
                                icon: "error",
                              })
                              setTimeout(()=>{
                                wx.navigateBack({})
                              },1500)
                            }
                          )
                        }
                      }
                    })
                  }
                })
              }else if(res.cancel){
                wx.navigateBack({})
              }
            }
          })
        },
        (error)=>{
          wx.showModal({
            title: '登录失败',
            content: '手机号或验证码无效',
            showCancel: false
          })
        }
      )      
    }
  }
})