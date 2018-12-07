// pages/classic/classic.js

import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'


let classicModel = new ClassicModel();
let likeModel = new LikeModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:{},
    first: false,
    latest: true
  },

  methods:{
 
  },

  // 点心触发的事件
  onLike(event) {
    const behavior = event.detail.behavior
    likeModel.like(
        behavior, 
        this.data.classicData.id,
        this.data.classicData.type
      )
  },

  // 点击下一张触发的事件
  onNext() {
    this._updateClassic( 'next' )
  },

  // 点击上一级触发的事件
  onPrevious() {
   this._updateClassic( 'previous' )
  },

  // 数据统一处理的私有函数
  _updateClassic( nextOrPrevious ) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res)=>{
        this.setData({
          classicData: res.data, 
          first: classicModel.isFirst(res.data.index),
          latest: classicModel.isLatest(res.data.index),
        })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    classicModel.getLatest((res)=> {
      this.setData({
        classicData: res.data
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})