const request_nocheck = require("../../utils/util.js").request_nocheck
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
        var res = request_nocheck('team/list','POST',{type:2})
        res.then(
          (res)=>{
            console.log(res);
            var teamList = res.data.data;
          },
          (res)=>{
            console.log(res);
          }
        )
        this.setData({
          teamList: [
            {
              avatar: 'https://team.test.yuxue0824.com/static/avatar/team/8.jpg',
              teamName: '予学团队',
              category: 0,
              categoryExplain: ['做一款大学生组队平台'],
              introduction: '当我们想做一件事情的时候，不容易找到能够一起做这件事情的人。',
              members: [
                {
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/1.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/3.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/9.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/18.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/1.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/4.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/3.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/6.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/9.jpg'
                }
              ]
            },{
              avatar: 'https://team.test.yuxue0824.com/static/avatar/user/1.jpg',
              teamName: '予学小精灵',
              category: 0,
              categoryExplain: ['计算机&信息技术','微信小程序应用开发大赛'],
              introduction: '我们通过设计一个平台，实现完整的组队流程，帮助有组队需求的人在平台上找到合适的队友。',
              members: [
                {
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/18.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/11.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/10.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/14.jpg'
                },
              ]
            },{
              avatar: 'https://team.test.yuxue0824.com/static/avatar/user/1.jpg',
              teamName: '予学小精灵',
              category: 0,
              categoryExplain: ['计算机&信息技术','微信小程序应用开发大赛'],
              introduction: '我们通过设计一个平台，实现完整的组队流程，帮助有组队需求的人在平台上找到合适的队友。',
              members: [
                {
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/18.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/11.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/10.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/14.jpg'
                },
              ]
            }
            // ,{
            //   teamName: '我创建的队伍1',
            //   category: '0',
            //   categoryExplain: ['miss you'],
            //   introduction: '不睡觉的星星，代替我吻吻你的眼睛。',
            //   members: [
            //     {
            //       avatar: 'https://qiniu.freespace.yuxue0824.com/book%20and%20letters.jpg'
            //     },{
            //       avatar: 'https://qiniu.freespace.yuxue0824.com/cyan.jpg'
            //     },{
            //       avatar: 'https://qiniu.freespace.yuxue0824.com/go%20with%20the%20flow.jpg'
            //     },
            //   ]
            // }
            
          ]
        })
      }
      else if(from=="myTeam"){  // 表示在“我的队伍”中请求队伍列表
        // 以某种条件，向后端请求列表
        this.setData({
          teamList: [
            {
              avatar: 'https://team.test.yuxue0824.com/static/avatar/team/8.jpg',
              teamName: '予学团队',
              category: 0,
              categoryExplain: ['做一款大学生组队平台'],
              introduction: '当我们想做一件事情的时候，不容易找到能够一起做这件事情的人。',
              members: [
                {
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/20.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/1.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/3.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/9.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/18.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/1.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/4.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/3.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/6.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/9.jpg'
                }
              ]
            },{
              avatar: 'https://team.test.yuxue0824.com/static/avatar/user/1.jpg',
              teamName: '予学小精灵',
              category: 0,
              categoryExplain: ['计算机&信息技术','微信小程序应用开发大赛'],
              introduction: '我们通过设计一个平台，实现完整的组队流程，帮助有组队需求的人在平台上找到合适的队友。',
              members: [
                {
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/18.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/11.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/10.jpg'
                },{
                  avatar: 'https://team.test.yuxue0824.com/static/avatar/user/14.jpg'
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
