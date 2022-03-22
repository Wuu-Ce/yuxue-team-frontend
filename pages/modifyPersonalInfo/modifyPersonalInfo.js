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
  }
})