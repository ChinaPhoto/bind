// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'

const keyword = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: 'String',
      observer() {
        this._loadMore()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyData: [],
    hotData: [],
    booksData: [],
    searching: false,
    value: ''
  },

  attached() {
    this._getHistoryData()
    this._getHotData()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel',{})
    },

    // 查找关键字 放进缓存
    onConfirm(event) {

      const value =  event.detail.value || event.detail.text;
      this.setData({
        searching: true,
        value
      })

      keyword.getSearch( value, 0 ).then((res)=>{
        this.setData({
          booksData: res.books
        })
        keyword.setHistory( value );
      })
    },

    // 获取历史搜索数据
    _getHistoryData() {
      const historyData = keyword.getHistory();
      this.setData({
        historyData
      })
    },

    // 获取热门所搜数据
    _getHotData() {
      keyword.getHot().then( res=>{
        this.setData({
          hotData: res.hot
        })
      })
    },

    // 点击 x 图片返回按钮
    onDelect(){
      this.setData({
        searching: false,
        value: ''
      })
    }, 

    // 接受传授的参数
    _loadMore() {
      const length = this.data.booksData.length;

      if( !this.data.value ) {
        return
      }

      keyword.getSearch( this.data.value, length ).then(
        res => {
          const arrayData = this.data.booksData.concat(res.books);
          this.setData({
            booksData: arrayData
          })
        }
      )
    }
    
  }
})
