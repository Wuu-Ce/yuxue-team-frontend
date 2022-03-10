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
    categoryColor: ['orange','mauve','purple','blue','cyan','red']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
