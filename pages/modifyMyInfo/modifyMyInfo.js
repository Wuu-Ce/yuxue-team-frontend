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
  },
  onShow(){
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
  changeName(){
    var editName = this.data.editName;
    this.setData({
      editName: true
    })
  },
  editName(e){
    this.data.newName = e.detail.value;
  },
  // 保存昵称
  saveName(){
    this.setData({
      editName: false
    })
    if(this.data.newName===""){
      if(this.data.newName.length===0){
        wx.showToast({
          title: '昵称不可为空',
          icon: 'error'
        })
        this.data.newName=this.data.nickname;
        return
      }
    }
    request('/info/update','POST',{nickname:this.data.newName}).then(
      (res)=>{
        this.setData({
          nickname:this.data.newName
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
  // 编辑个人介绍
  changeDescription(e){
    var modalName = e.currentTarget.dataset.modalname
    this.setData({
      modalName: modalName,
      description: this.data.description
    })
  },
  editDescription(e){
    this.data.newDescription = e.detail.value;
  },
  saveDescription(){
    this.hideModal();
    if(this.data.newDescription===""){
      if(this.data.newDescription.length===0){
        wx.showToast({
          title: '介绍不可为空',
          icon: 'error'
        })
        this.data.newDescription = this.data.description;
        return
      }
    }
    request('/info/update','POST',{description:this.data.newDescription}).then(
      (res)=>{
        console.log(res);
        this.setData({
          description:this.data.newDescription
        })
      },
      (error)=>{
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
        console.log(error);
      }
    )
  },
  // 跳转到搜索学校
  jumpToSearchCollege(){
    wx.navigateTo({
      url: '/pages/searchCollege/searchCollege',
    })
  },
  // 编辑专业
  changeMajor(e){
    var modalName = e.currentTarget.dataset.modalname
    this.setData({
      modalName: modalName
    })
  },
  editMajor(e){
    this.data.newMajor = e.detail.value;
  },
  savaMajor(){
    this.hideModal();
    request('/info/update','POST',{major:this.data.newMajor}).then(
      (res)=>{
        console.log(res);
        this.setData({
          major:this.data.newMajor
        })
      },
      (error)=>{
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
        console.log(error);
      }
    )
  },
  // 编辑擅长领域
  changeSkill(e){
    var modalName = e.currentTarget.dataset.modalname
    this.setData({
      modalName: modalName
    })
  },
  editSkill(e){
    this.data.newSkill = e.detail.value;
  },
  saveSkill(){
    this.hideModal();
    request('/info/update','POST',{skill:this.data.newSkill}).then(
      (res)=>{
        console.log(res);
        this.setData({
          skill:this.data.newSkill
        })
      },
      (error)=>{
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
        console.log(error);
      }
    )
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }, 
})