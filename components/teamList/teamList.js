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
            },
            {
              teamName: '怦然心动',
              category: 1,
              categoryExplain: ['计算机&信息技术','中国计算机大赛-网络技术挑战赛'],
              introduction: '愿少年在征途后，回眸时，眼有星辰大海，胸有丘壑万千，心有繁花似锦。',
              members: [
                {
                  avatar: 'https://qiniu.freespace.yuxue0824.com/amazing.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/blue%20and%20lover.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.6.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/TobiasHall.png'
                },
              ]
            },
            {
              teamName: '触不可及',
              category: 2,
              categoryExplain: ['注册会计师'],
              introduction: '不合时宜的东西，如果自己虚弱，终究会成为人们嘲笑的对象，但有力量了，或坚持久了，或许反而能成为众人追捧的魅力和个性。',
              members: [
                {
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.3.1.1.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.3.1.2.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.3.1.3.png'
                },
              ]
            },
            {
              teamName: '怦然心动',
              category: 3,
              categoryExplain: ['大学生技能交换'],
              introduction: '愿少年在征途后，回眸时，眼有星辰大海，胸有丘壑万千，心有繁花似锦。',
              members: [
                {
                  avatar: 'https://qiniu.freespace.yuxue0824.com/amazing.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/blue%20and%20lover.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.6.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/TobiasHall.png'
                },
              ]
            },
            {
              teamName: '怦然心动',
              category: 4,
              categoryExplain: ['基于NLP的智能聊天机器人'],
              introduction: '愿少年在征途后，回眸时，眼有星辰大海，胸有丘壑万千，心有繁花似锦。',
              members: [
                {
                  avatar: 'https://qiniu.freespace.yuxue0824.com/amazing.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/blue%20and%20lover.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.6.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/TobiasHall.png'
                },
              ]
            },
            {
              teamName: '怦然心动',
              category: 5,
              categoryExplain: ['王者荣耀'],
              introduction: '愿少年在征途后，回眸时，眼有星辰大海，胸有丘壑万千，心有繁花似锦。',
              members: [
                {
                  avatar: 'https://qiniu.freespace.yuxue0824.com/amazing.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/blue%20and%20lover.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.6.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/TobiasHall.png'
                },
              ]
            },
            {
              teamName: '怦然心动',
              category: 6,
              categoryExplain: ['想找西西区一起打乒乓球的人'],
              introduction: '愿少年在征途后，回眸时，眼有星辰大海，胸有丘壑万千，心有繁花似锦。',
              members: [
                {
                  avatar: 'https://qiniu.freespace.yuxue0824.com/amazing.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/blue%20and%20lover.png'
                },{
                  avatar: 'https://qiniu.pregnancy.yuxue0824.com/1.1.1.6.png'
                },{
                  avatar: 'https://qiniu.freespace.yuxue0824.com/TobiasHall.png'
                },
              ]
            },
          ]
        })
      }
      else if(from=="myTeam"){  // 表示在“我的队伍”中请求队伍列表
        // 以某种条件，向后端请求列表
        this.setData({
          teamList: [
            {
              teamName: '开往早晨的午夜',
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
            }
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
