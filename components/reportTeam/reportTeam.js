const request = require("../../utils/util.js").request;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    team_id: Number,
    show: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    accuseOptions: [{id: 0,name: '色情',selected: false},{id: 1,name: '欺诈',selected: false},{id: 2,name: '赌博',selected: false}],
    accuseReason: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal() {
      this.setData({
        show: false
      })
    },
    // 选择举报选项
    chooseAccuseOption(e) {
      let optionID = e.currentTarget.dataset.id;
      let accuseOptions = this.data.accuseOptions;
      accuseOptions[optionID].selected = !accuseOptions[optionID].selected;
      this.setData({
        accuseOptions: accuseOptions
      })
      console.log(accuseOptions);
    },
    // 编辑举报理由
    editAccuseReason(e){
      console.log(e);
      var accuseReason = e.detail.value;
      this.data.accuseReason = accuseReason;
    },
    // 举报团队
    reportTeam() {
      if(this.data.accuseReason===''){
        wx.showToast({
          title: '请输入举报内容',
          icon: 'error'
        })
        return
      }
      var accuseOptionList = [];
      var accuseOptions = this.data.accuseOptions;
      for(let i=0;i<3;i++){
        accuseOptionList[i]=1?accuseOptions[i].selected:0;
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
      
    }

  }
})
