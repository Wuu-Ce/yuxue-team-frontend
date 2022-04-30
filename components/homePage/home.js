// pages/user/home/home.js
const app = getApp()
const checkCookieValid = require('../../utils/util.js').checkCookieValid
const request = require("../../utils/util.js").request
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showLoginRequired: false,
    modalName: null
  },

  lifetimes: {
    attached: function() {
      request('/info/detail','POST',{}).then(
        (res)=>{
          console.log(res);
          this.setData({
            avatar: res.data.data.avatar,
            nickname: res.data.data.nickname,
            description: res.data.data.description,
            school: res.data.data.school,
            major: res.data.data.major,
            skill: res.data.data.skill,
            grade: res.data.data.grade
          })
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  },
  pageLifetimes:{
    show(){
      request('/info/detail','POST',{}).then(
        (res)=>{
          console.log(res);
          this.setData({
            avatar: res.data.data.avatar,
            nickname: res.data.data.nickname,
            description: res.data.data.description,
            school: res.data.data.school,
            major: res.data.data.major,
            skill: res.data.data.skill,
            grade: res.data.data.grade
          })
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToMyTeam() {
      // wx.navigateTo({
      //   url: '/pages/myTeam/myTeam',
      // })
      checkCookieValid().then(
        (res)=>{
          if(res){
            wx.navigateTo({
              url: '/pages/myTeam/myTeam',
            })
          }
          else if(!res){
            this.setData({
              showLoginRequired: true
            })
          }
        },
        ()=>{
          wx.showToast({
            title: '请求失败',
            icon: 'error'
          })
        }
      );
    },
    jumpToModifyMyInfo(){
      wx.navigateTo({
        url: '/pages/modifyMyInfo/modifyMyInfo',
      })
    },
    // 跳转到消息通知界面
    jumpToMessage(){
      wx.navigateTo({
        url: '/pages/message/message',
      })
    },
    // 联系客服
    contactService(){
      this.setData({
        modalName: "contactService"
      })
    },
    // 关于我们
    aboutUS(){
      this.setData({
        modalName: "aboutUS"
      })
    },
    hideModal() {
      this.setData({
        modalName: null
      })
    },
    // 跳转到getcode界面
    jumpToCode(){
      wx.navigateTo({
        url: '/pages/getCode/code',
      })
    },
    // 跳转到设置界面
    jumpToSettings(){
      wx.navigateTo({
        url: '/pages/settings/settings',
      })
    },
    // 跳转到手机号登录界面
    jumpToSignInTel(){
      wx.navigateTo({
        url: '/pages/signInTel/signInTel',
      })
    }
  }
})
