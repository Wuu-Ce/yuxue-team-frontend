// components/teamListPage/teamListPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      var from = this.properties.listData.from;
      if(from=="index"){  // 表示在“首页”中请求队伍列表
        // 以某种条件，向后端请求列表
        var topTabCur = this.properties.listData.topTabCur;
        this.setData({
          teamList: [
            {
              teamName: '暮光之城',
              category: 0,
              categoryExplain: ['做一款大学生组队平台'],
              introduction: '你为何来到这世上？为了在死的时候，灵魂比生的时候更纯洁一些，或者说带着更美好、更崇高的灵魂去迎接死亡。人生的过程本身，就像磨练灵魂的砂纸，人们在磨练中提升心性，涵养精神，带着比降生时更高层次的灵魂离开人世。',
              members: [
                {
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.1.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.2.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.3.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.2.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.3.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.2.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.3.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.2.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.3.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.2.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.3.png'
                },
              ]
            },{
              teamName: '我创建的队伍1',
              category: '0',
              categoryExplain: ['miss you'],
              introduction: '不睡觉的星星，代替我吻吻你的眼睛。',
              members: [
                {
                  avatar: 'https://qiniu.freespace.yuxue0824.com/book%20and%20letters.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/cyan.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/go%20with%20the%20flow.png'
                },
              ]
            }
            
          ]
        })
      }
      else if(from=="myTeam"){  // 表示在“我的队伍”中请求队伍列表
        // 以某种条件，向后端请求列表
        this.setData({
          teamList: [
            {
              teamName: '我创建的队伍1',
              category: '0',
              categoryExplain: [],
              introduction: '不睡觉的星星，代替我吻吻你的眼睛。',
              members: [
                {
                  avatar: 'https://qiniu.freespace.yuxue0824.com/book%20and%20letters.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/cyan.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/go%20with%20the%20flow.png'
                },
              ]
            },
          ]
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
