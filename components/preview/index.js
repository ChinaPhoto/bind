// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer(newVal) {
        if(newVal) {
            this.setData({
              typeText: this.data.typeTextData[newVal.type]
            })
          }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: '',
    typeTextData: {
      100: "电影",
      200: "音乐",
      300: "句子"
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
        type:this.properties.classic.type
      }, {}) 
    }
  }
})
