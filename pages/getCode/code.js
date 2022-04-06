// pages/getCode/code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getcode(){
    var that = this;
    wx.login({
      success(res){
        var code = res.code;
        var codes = that.data.codes;
        codes.push(code);
        that.setData({
          codes:codes
        })
      },
    })
  },
  postcode(){
    var codes = this.data.codes;
    console.log(codes);
    this.setData({
      codes: []
    })
  }
  
})