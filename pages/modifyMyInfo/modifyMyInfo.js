// pages/modifyPersonalInfo/modifyPersonalInfo.js
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

  },
  // 更改头像
  chooseImage(){
    wx.chooseMedia({
      count: 1,
      mediaType: "image",
      sourceType: 'album',
      success(res){
        var imagePath = res.tempFiles[0]. tempFilePath;
        console.log(res);
      }
    })
  },
  // 更改昵称
  editName(){
    var editName = this.data.editName;
    this.setData({
      editName: true
    })
  },
  // 保存昵称
  saveName(){
    var editName = this.data.editName;
    this.setData({
      editName: false
    })
  },
  // 跳转到搜索学校
  jumpToSearchCollege(){
    wx.navigateTo({
      url: '/pages/searchCollege/searchCollege',
    })
  },
  // 编辑个人介绍
  editIntroduction(e){
    var modalName = e.currentTarget.dataset.modalname
    this.setData({
      modalName: modalName
    })
  },
  // 编辑专业
  editMajor(e){
    var modalName = e.currentTarget.dataset.modalname
    this.setData({
      modalName: modalName
    })
  },
  // 编辑擅长领域
  editSkilled(e){
    var modalName = e.currentTarget.dataset.modalname
    this.setData({
      modalName: modalName
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }, 
})