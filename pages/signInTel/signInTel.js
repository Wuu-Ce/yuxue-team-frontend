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
      wx.showModal({
        title: "请输入手机号",
        showCancel: false,
        success:(res)=>{
          return
        }
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
          console.log(res);
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
          console.log(res);
          wx.setStorage({
            key: 'cookie',
            data: res.cookies[0],
          })
          wx.navigateBack({
            delta: 0,
          })
        },
        (error)=>{
          console.log(error);
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