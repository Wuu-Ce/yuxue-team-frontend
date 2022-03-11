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
    categoryName: ['创意','竞赛','考证','创业','科研','游戏'],
    categoryColor: ['orange','mauve','purple','blue','cyan','red'],
    membersShow: [], // 显示出来的成员列表
    collectButtonShow: false, // 是否显示收藏、举报按钮
    collected: false,  // 是否收藏
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      const that = this;
      const query = this.createSelectorQuery()
      query.select('#teamMembers').boundingClientRect()
      query.exec(function(res){
        const teamMemberQuery = that.createSelectorQuery()
        teamMemberQuery.select('.teamMember').boundingClientRect()
        teamMemberQuery.exec(function(res1){
          var avatarHeight = res1[0].height;
          var width = res[0].width;
          var avatarCapacity = Math.floor(width/(avatarHeight+5));
          if(that.data.team.members.length<=avatarCapacity){
            that.setData({
              iconMoreShow: false
            })
          }else{
            that.setData({
              iconMoreShow: true
            })
            let membersShow = [];
            for(let i=0;i<avatarCapacity-1;i++){
              membersShow.push(that.data.team.members[i]);
            }
            that.setData({
              membersShow: membersShow
            })
          }
        })
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 是否显示所有成员的头像
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
    onClickCollect(){
      var collected = !this.data.collected;
      this.setData({
        collected: collected
      })
      setTimeout(() => {
        this.hideCollectButton();
      }, 150)
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
    onClickAccuse(){
      wx.navigateTo({
        url: '/pages/accuseTeam/accuseTeam',
      })
    },
  }
})
