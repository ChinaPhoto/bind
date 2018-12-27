// components/link/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      like: {
        type: Boolean
      },
      count: {
        type: Number
      },
      readOnly: {
        type: Boolean
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(){
        if(this.properties.readOnly) {
          return 
        }

        let like = this.properties.like,
            count = this.properties.count; 
            count = like?count-1:count+1         
        this.setData({
          count:count,
          like: !like
        })
        let behavior = this.properties.like? 'like' : 'cancel'
        this.triggerEvent('like', {
          behavior: behavior
        })
    }
  }
})
