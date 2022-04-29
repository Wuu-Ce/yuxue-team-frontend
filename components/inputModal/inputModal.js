// components/inputModal/inputModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '名称'
    },
    type: {
      type: String,
      value: 'input'
    },
    value: {
      type: String,
      value: ''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    tempValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框失去焦点
    onBlur(e) {
      this.data.tempValue = e.detail.value
    },
    // 提交输入框内容
    onConfirm(e) {
      this.data.tempValue = e.detail.value
    },
    // 取消输入
    cancel() {
      this.data.tempValue = ''
      this.hideModal()
    },
    // 确认输入内容
    ok() {
      let value = this.data.value
      value = this.data.tempValue ==''? this.data.value: this.data.tempValue
      const detail = {
        title: this.data.title,
        value: value
      }
      this.hideModal()
      this.triggerEvent('confirm', detail)
    },
    // 隐藏输入窗口
    hideModal() {
      this.setData({
        show: false
      })
    }
  }
})
