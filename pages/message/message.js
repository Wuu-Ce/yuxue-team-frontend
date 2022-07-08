const app = getApp()
const request = require("../../utils/util.js").request
const __formatTime = require("../../utils/util.js").__formatTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    tabCur: 0,
    showLoginRequired: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowInfo  = wx.getWindowInfo();
    this.setData({
      scrollHeight: windowInfo.windowHeight-this.data.CustomBar
    })
    request('/notify/list','POST',{type:1}).then(
      (res)=>{
        console.log(res);
        var myApproval = this.processMessageList(res.data.data);
        this.setData({
          myApproval: myApproval,
        })
      },
      ()=>{}
    )
    request('/notify/list','POST',{type:2}).then(
      (res)=>{
        console.log(res);
        var myApply = this.processMessageList(res.data.data);
        this.setData({
          myApply: myApply,
        })
      },
      ()=>{}
    )
    request('/notify/list','POST',{type:3}).then(
      (res)=>{
        console.log(res);
        var notice = this.processMessageList(res.data.data);
        this.setData({
          notice: notice,
        })
      },
      ()=>{}
    )
  },
  // 处理列表，将时间由时间戳调整为字符串
  processMessageList(messageList){
    for(let i=0;i<messageList.length;i++){
      let item = messageList[i];
      item.time = __formatTime(item.time*1000);
    }
    return messageList
  },
  // 选择标签
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
    console.log(this.data.tabCur);
  },
  examine(e){
    var related_id = e.currentTarget.dataset.related_id;
    var catalog = e.currentTarget.dataset.catalog;
    var type = e.currentTarget.dataset.type;
    if(type==0){  // 同意
      if(catalog===10001){
        // 允许加入
        request('/apply/leader/check','POST',{apply_id: related_id,agree:true}).then(
          (res)=>{
            console.log(res);
            wx.showToast({
              title: '已同意',
            })
            var myApproval = this.data.myApproval;
            for(let i=0;i<myApproval.length;i++){
              let item = myApproval[i];
              if(item.related_id===related_id){
                item.status=1;
              }
            }
            this.setData({
              myApproval: myApproval
            })
          },
          ()=>{}
        )
      }else if(catalog===10002){
        // 接受邀请
        request('/invite/check','POST',{invite_id:related_id,agree:true}).then(
          (res)=>{
            console.log(res);
            wx.showToast({
              title: '已同意',
            })
            var myApproval = this.data.myApproval;
            for(let i=0;i<myApproval.length;i++){
              let item = myApproval[i];
              if(item.related_id===related_id){
                item.status=1;
              }
            }
            this.setData({
              myApproval: myApproval
            })
          }
        )
      }
    }else if(type==1){  // 拒绝

    }
  },

  // 编辑拒绝理由
  editAccuseReason(e){
    console.log(e);
    var rejectReason = e.detail.value;
    this.data.rejectReason = rejectReason;
  },
  // 举报团队
  rejectSend(related_id,) {
    if(this.data.rejectReason===''){
      wx.showToast({
        title: '请输入拒绝理由',
        icon: 'error'
      })
      return
    }
    if(catalog===10001){
      // 允许加入
      request('/apply/leader/check','POST',{apply_id: related_id,agree:true}).then(
        (res)=>{
          console.log(res);
          wx.showToast({
            title: '已同意',
          })
          var myApproval = this.data.myApproval;
          for(let i=0;i<myApproval.length;i++){
            let item = myApproval[i];
            if(item.related_id===related_id){
              item.status=1;
            }
          }
          this.setData({
            myApproval: myApproval
          })
        },
        ()=>{}
      )
    }else if(catalog===10002){
      // 接受邀请
      request('/invite/check','POST',{invite_id:related_id,agree:true}).then(
        (res)=>{
          console.log(res);
          wx.showToast({
            title: '已同意',
          })
          var myApproval = this.data.myApproval;
          for(let i=0;i<myApproval.length;i++){
            let item = myApproval[i];
            if(item.related_id===related_id){
              item.status=1;
            }
          }
          this.setData({
            myApproval: myApproval
          })
        }
      )
    }
    var data = {
      type: accuseOptionList,
      reason: this.data.accuseReason,
      team_id: this.data.team_id
    }
    request('/accuse/add','POST',data).then(
      (res)=>{
        this.hideModal();
        wx.showToast({
          title: '举报成功',
          icon: 'success'
        })
      },
      ()=>{

      }
    )
    
  },
  // 不允许对方加入
  disapprove(e){
    
  },
  // 跳转到用户个人主页
  jumpToUserDetail(e){
    var user_id = e.currentTarget.dataset.user_id;
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?user_id='+user_id,
    })
  },
  // 跳转到团队详情页
  jumpToTeamDetail(e){
    var team_id = e.currentTarget.dataset.team_id;
    wx.navigateTo({
      url: '/pages/teamDetail/teamDetail?team_id=' + team_id,
    })
  }
})