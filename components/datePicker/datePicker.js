// components/datePicker/datePicker.js
const currentYear = new Date().getFullYear()
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'range'
    },
    value:  {
      type: String,
      value: '',
      observer: {
        "selectDate": function(selectDate) {
          this.setData({
            value: selectDate.year + "/" + selectDate.month + "/" + selectDate.day
          })
        }
      },
    },
    minDate: {
      type: Number,
      value: new Date(currentYear - 10, 0, 1).getTime(),
    },
    maxDate: {
      type: Number,
      value: new Date(currentYear + 10, 11, 31).getTime(),
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: 0,
    dateList: [],
    selectDate: {
      year: 2022,
      month: 1,
      day: 1
    },
    showDate: {
      year:'2022',
      month:'1'
    },
    animation: false
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      /**
       * 生成日期列表
       */
      const that = this
      let dateList = []
      const min = new Date(this.data.minDate)
      const max = new Date (this.data.maxDate)
      for(let i= min.getTime(); i<max.getTime(); i+=2592000000){
        let date = new Date(i);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = new Date(year, month, 0).getDate();
        let firstDay = new Date(year, month-1, 1).getDay()
        let item = {
          year: year,
          month: month,
          day: day,
          firstDay: firstDay,
          select: -1,
          min: 0,
          max: day - 1,
        }
        dateList.push(item)
      }
      dateList[0].min = min.getDate() - 1
      dateList[0].select = min.getDate() - 1
      dateList[dateList.length-1].max = max.getDate()
      // 选中值默认为最小值
      this.data.selectDate ={
        year: dateList[0].year,
        month: dateList[0].month,
        day: dateList[0].select + 1
      }
      that.setData({
        dateList: dateList,
        showDate:{
          year: dateList[0].year,
          month: dateList[0].month
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行

    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择日期
    selectDay(e) {
      let ind = this.data.selectIndex
      let dInd = e.currentTarget.dataset.dindex
      let dateList = this.data.dateList
      dateList[ind].select = -1
      ind = e.currentTarget.dataset.index
      dateList[ind].select = dInd
      this.setData({
        selectIndex: ind,
        dateList: dateList,
        selectDate: {
          year: dateList[ind].year,
          month: dateList[ind].month,
          day: dateList[ind].select + 1
        },
      })
    },

    // 滚动时
    onScroll(e) {
      const dateList = this.data.dateList
      let ind =parseInt((e.detail.scrollTop + 100) / (e.detail.scrollHeight/this.data.dateList.length)) 
      this.setData({
        showDate:{
          year: dateList[ind].year,
          month: dateList[ind].month
        }
      })
    },

    // 隐藏日期选择器
    onClose() {
      const that = this
      let date = that.data.selectDate
      let detail = {
        date: date.year + '/' + date.month + '/' + date.day,
        time: new Date(date.year, date.month, date.day).getTime()
      }
      that.setData({
        show: false,
        animation: true
      })
      setTimeout(function() {
        that.setData({
          animation: false
        })
      }, 500)
      this.triggerEvent('close', detail)
    },
    onConfirm() {
      const that = this
      let date = that.data.selectDate
      let detail = {
        date: date.year + '/' + date.month + '/' + date.day,
        time: new Date(date.year, date.month, date.day).getTime()
      }
      that.onClose()
      this.triggerEvent('confirm', detail)
    },
  }
})
