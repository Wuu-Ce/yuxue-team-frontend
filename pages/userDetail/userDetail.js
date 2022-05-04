const request = require("../../utils/util.js").request
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 年级列表
    gradeLst: [
      {id: 0,name: '大一',checked: false},
      {id: 1,name: '大二',checked: false},
      {id: 2,name: '大三',checked: false},
      {id: 3,name: '大四',checked: false},
      {id: 4,name: '大五',checked: false},
      {id: 5,name: '研一',checked: false},
      {id: 6,name: '研一',checked: false},
      {id: 7,name: '研一',checked: false},
      {id: 8,name: '博士',checked: false},
      {id: 9,name: '',checked: false}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var user_id = parseInt(options.user_id)
    request('/info/detail','POST',{user_id:user_id}).then(
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
      (error)=>{console.log(error)}
    )
  },
  // 返回到上一页
  backToLastPage(){
    wx.navigateBack({
      delta: 0,
    })
  }
})