// pages/team/teamItem/teamItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    team: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 以下类型分别用不同的颜色标识，自定义类型用默认的颜色（黑色）
    categroyList: [{index: 0,name: '兴趣',color: 'orange'},
                   {index: 1,name: '创意',color: 'mauve'},
                   {index: 2,name: '竞赛',color: 'purple'},
                   {index: 3,name: '创业',color: 'blue'},
                   {index: 4,name: '科研',color: 'cyan'},
                   {index: 5,name: '考证',color: 'red'}],

    membersShow: [1], // 显示出来的成员列表
    collectButtonShow: false, // 是否显示收藏、举报按钮
    modalName: null,
    iconMoreShow: true,  // 是否显示“more”按钮，若显示则不展开
  },

  lifetimes: {
    attached: function() {
      console.log(this.data.team)
      // 在组件实例进入页面节点树时执行
      // const that = this;
      // const query = this.createSelectorQuery()
      // query.select('#teamMembers').boundingClientRect()  
      // query.exec(function(res){
      //   const teamMemberQuery = that.createSelectorQuery()
      //   teamMemberQuery.select('.teamMember').boundingClientRect()
      //   teamMemberQuery.exec(function(res1){
      //     var avatarHeight = res1[0].width;  // 计算头像的宽度
      //     var width = res[0].width;  // 计算容纳头像的区域的宽度
      //     var avatarCapacity = Math.floor(width/(avatarHeight+5));  // 计算出该区域一行可以容纳的头像数量
      //     if(that.data.team.members.length<=avatarCapacity){  // 如果成员头像的数量小于区域可以容纳的数量
      //       that.setData({
      //         iconMoreShow: false
      //       })
      //     }else{
      //       that.setData({
      //         iconMoreShow: true
      //       })
      //       let membersShow = [];
      //       for(let i=0;i<avatarCapacity-3;i++){
      //         membersShow.push(that.data.team.members[i]);
      //       }
      //       that.setData({
      //         membersShow: membersShow
      //       })
      //     }
      //   })
      // }）
      this.setData({
        collected: this.data.team.relation.isCollected
      })
      if(this.data.team.members.length<=5){  // 如果成员头像的数量小于区域可以容纳的数量
        this.setData({
          iconMoreShow: false
        })
      }else{
        this.setData({
          iconMoreShow: true
        })
        let membersShow = [];
        for(let i=0;i<5;i++){
          membersShow.push(this.data.team.members[i]);
        }
        this.setData({
          membersShow: membersShow
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 是否显示所有成员的头像，若显示，则“more”按钮消失
    showAllMembers(){
      this.setData({
        iconMoreShow: false
      })
    },
    // 点击卡片右上角的三个点
    onClickMore(){
      var collectButtonShow = !this.data.collectButtonShow;
      this.setData({
        collectButtonShow: collectButtonShow
      })
    },
    // 隐藏收藏、举报按钮
    hideCollectButton(){
      this.setData({
        collectButtonShow: false
      })
    },
    // 点击收藏按钮
    collectTeam(){
      var collected = !this.data.collected;
      // team表示收藏/取消收藏哪支队伍，collect表示收藏还是取消收藏
      this.triggerEvent('collectTeam', {team:this.data.team,collect:collected}, { bubbles: true,composed: true});
      // this.hideCollectButton();
      
      this.setData({
        collected: collected
      })
      // setTimeout(() => {
      //   this.hideCollectButton();
      // }, 150)
      if(collected){
        wx.showToast({
          title: '已收藏',
          icon: 'success',
          duration: 500
        })
      }else{
        wx.showToast({
          title: '已取消',
          icon: 'none',
          duration: 500
        })
      }
    },
    // 点击举报按钮
    accuseTeam(){
      this.triggerEvent('accuseteam', {team:this.data.team}, { bubbles: true,composed: true});
      this.hideCollectButton();
    },
    //  跳转到队伍详情页
    jumpToTeamDetailPage() {
      wx.navigateTo({
        url: '/pages/teamDetail/teamDetail?team_id=' + this.data.team.team_id,
      })
    },
    // 跳转到用户详情页
    jumpToUserDetail(e){
      var user_id = e.currentTarget.dataset.user_id;
      wx.navigateTo({
        url: '/pages/userDetail/userDetail?user_id='+user_id,
      })
    },
    // 点击右下角的按钮
    jumpToApply(e){
      console.log(this.data.team)
      var ifLogin = wx.getStorageSync('ifLogin');
      var relation = this.data.team.relation
      if(ifLogin){
        if(relation.isLeader){  // 是否为队长
          wx.navigateTo({
            url: '/pages/manageTeam/manageTeam?team_id=' + this.data.team.team_id,
          })
        }else if(relation.isMember){  //  是否为队员
  
        }else if(relation.isApplying){  // 是否正在申请该团队
  
        }else if(relation.isInviting){  // 是否正在被该团队邀请
  
        }else{  // 按钮显示为：申请加入
          wx.navigateTo({
            url: '/pages/apply/apply?team_id='+this.data.team.team_id+'&recruit_id='+this.data.team.recruit_id,
          })
        }
      }else{
        this.triggerEvent('login',{},{})
      }
    }
  }
})
