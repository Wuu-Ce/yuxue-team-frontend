const request = require("../../utils/util.js").request
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 年级选择器
    undergraduate:[
      {id: 0,name: '大一'},
      {id: 1,name: '大二'},
      {id: 2,name: '大三'},
      {id: 3,name: '大四'},
      {id: 4,name: '大五'},
    ],
    graduate: [
      {id: 5,name: '研一'},
      {id: 6,name: '研一'},
      {id: 7,name: '研一'},
    ],
    doctor: [
      {id: 8,name: '博士'}
    ],
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
    checked: false, //年级radio列表是否全部为空 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request('/info/detail','POST',{}).then(
      (res)=>{
        console.log(res);
        var gradeLst = this.data.gradeLst;
        gradeLst[res.data.data.grade].checked = true;
        this.setData({
          avatar: res.data.data.avatar,
          nickname: res.data.data.nickname,
          description: res.data.data.description,
          school: res.data.data.school,
          major: res.data.data.major,
          skill: res.data.data.skill,
          grade: this.data.gradeLst[res.data.data.grade].name,
          gradeLst: gradeLst
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
          grade: this.data.gradeLst[res.data.data.grade].name
        })
        this.data.gradeLst[res.data.data.grade].checked = true;
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
  // 编辑年级
  changeGrade(e){
    var modalName = e.currentTarget.dataset.modalname
    this.setData({
      modalName: modalName
    })
  },
  selectGrade(e){
    var id = parseInt(e.detail.value);
    console.log(id);
    request('/info/update','POST',{grade: id}).then(
      ()=>{
        this.setData({
          grade: this.data.gradeLst[id].name
        })
      },
      ()=>{
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
      }
    )
  },
  setDefaultGrade(){
    this.hideModal();
    request('/info/update','POST',{grade: 9}).then(
      ()=>{
        var gradeLst = this.data.gradeLst;
        for(let i=0;i<gradeLst.length;i++){
          gradeLst[i].checked = false;
        }
        this.setData({
          grade: '',
          gradeLst: gradeLst
        })
      },
      ()=>{
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
      }
    )
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
  // 隐藏modal
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }, 
})