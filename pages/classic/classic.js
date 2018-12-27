// pages/classics/classics.js

import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'


let classicModel = new ClassicModel();
let likeModel = new LikeModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cid: Number,
    type: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    classicData:{},
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false,
    isShow: true
  },

  // 组件生命周期
  attached(options){
    const cid = this.properties.cid
    const type = this.properties.type
    if(!cid) {
      classicModel.getLatest((res) => {
        this.setData({
          classicData: res.data,
          likeCount: res.data.fav_nums,
          likeStatus: res.data.like_status,
          isShow: true
        })
      })
    }else {
      classicModel.getById(cid, type,res=>{
        this._getLikeStatus(res.data.id, res.data.type)
        this.setData({
          classicData: res.data,
          latest: classicModel.isLatest(res.data.index),
          first: classicModel.isFirst(res.data.index),
          isShow: false
        }) 
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      const behavior = event.detail.behavior
      likeModel.like(
        behavior, 
        this.data.classicData.id,
        this.data.classicData.type
      )
    },

    onNext: function () {
      this._updateClassic('next')
    },

    onPrevious: function () {
      this._updateClassic('previous')
    },

    _updateClassic( nextOrPrevious ) {
      let index = this.data.classicData.index
      classicModel.getClassic(index, nextOrPrevious, ( res )=> {
          this._getLikeStatus(res.data.id, res.data.type)
          this.setData({
            classicData: res.data, 
            first: classicModel.isFirst(res.data.index),
            latest: classicModel.isLatest(res.data.index),
          })
      })
    },

     // 单独处理link 组件的缓存问题
    _getLikeStatus( artId, category ) {
      likeModel.getClassicLikeStatus(artId, category, ( res )=> {
        this.setData({
          likeCount: res.data.fav_nums,
          likeStatus: res.data.like_status
        })
      }) 
    },
  }
})
