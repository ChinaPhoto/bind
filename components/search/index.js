// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'

import {
  paginationBev
} from '../behaviors.js'

const keyword = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [ paginationBev ],
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
    searching: false,
    value: '',
    isLoad: false
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
      this.initialize();
      this.triggerEvent('cancel',{})
    },

    // 查找关键字 放进缓存
    onConfirm(event) {
      this._showResult();
      this.initialize();
      const value =  event.detail.value || event.detail.text;
      this.setData({
        value
      })
      this.openLoading();
      keyword.getSearch( value, 0 ).then((res)=>{
        this.setMoreData(res.books);
        this.setTotal(res.total);
        this.closeLoading()
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
      this.initialize();
      this._hideResult();
      this.setData({
        value: ''
      })
    }, 

    // 接受传授的参数
    _loadMore() {
      const length = this.data.booksData.length;
      if( !this.data.value ) {
        return
      }
      if( this.isLocked() ) {
        return 
      }
      if( this.hasMore() ){  
        this.openResult()
        keyword.getSearch( this.data.value, length ).then(
          (res) => {
            this.setMoreData(res.books);
            this.closeResult()
          }, 
          ()=>{
            this.closeResult()
          }
        ) 
      }
    }, 

    // 
    _showResult(){
      this.setData({
        searching: true
      })
    },

    _hideResult(){
      this.setData({
        searching: false
      })
    }
  }
})
