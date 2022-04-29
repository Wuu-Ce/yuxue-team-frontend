// pages/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    neccessary: {
      // type: 'fast',
      // detail: '测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。测试文本，测试文本。',
      type: 'normal',
      // type: 'fast',
      detail: [
        {area: '计算机-前端', num: 2, need: '能使用微信开发者工具制作小程序'},
        {area: '绘画，UI设计', num: 2,need: '有绘画基础，能制作插图、UI'},
        {area: '数据库', num: 2, need: '能够熟练操作数据库'},
        {area: '计算机-前端', num: 2, need: '能开发web页面'},
        {area: '计算机-前端', num: 2, need: '能开发web页面'},
        {area: '计算机-前端', num: 2, need: '能开发web页面'},
      ],
      num: 4,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },
  enterReason(e){
    var content = e.detail.value
    if(e.detail.value !== '') {

    }
  },
  enterContact(e){

  }
})