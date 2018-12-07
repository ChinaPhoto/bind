// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      // observer  本身就是一个监听数值变化的函数
      //所以不要在这个函数里面进行数值改变你的操作
      // 不然会造成内存泄露
      observer (newVal, oldVal, changedPath) {
        let index = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: index
        })
        
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
    ],
    year:0,
    mounth: '',
    _index: '',
  },
  
  /**
   * 组件实例进入页面节点叔是执行
   */
  attached() {
    let date = new Date(),
        year = date.getFullYear(),
        mounth = date.getMonth();
    this.setData({
      year: year,
      mounth: this.data.months[mounth]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
