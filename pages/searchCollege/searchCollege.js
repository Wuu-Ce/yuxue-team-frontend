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

  },
  search(e){
    console.log(e);
    var key = e.detail.value;
    request("/enum/school",'POST',{key:key}).then(
      (res)=>{
        console.log(res);
        this.setData({
          schoolList: res.data.data
        })
      },
      (error)=>{
        console.log(error);
        if(error.code===20103){
          this.setData({
            schoolList: []
          })
        }
      }
    )
  },
  // 选择学校，同时传给后端
  chooseSchool(e){
    var school_id = e.currentTarget.dataset.school_id;
    console.log(school_id);
    request('/info/update','POST',{school_id:school_id}).then(
      (res)=>{
        wx.navigateBack({
          delta:1
        })
      },
      (error)=>{
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
      }
    )
  },
  deleteSchool(){
    
  }
})