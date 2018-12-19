import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: []
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if(userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
     console.log(userInfo)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor()
  },
  
  // 获取  喜欢的部分
  getMyFavor() {
    bookModel.getMyFavor()
             .then(res => {
                this.setData({
                  classics: res
                })
             })
  },

  //获取喜欢书的个数
  getMyBookCount() {
    bookModel.getMyBookCount()
             .then(res => {
               this.setData({
                  bookCount: res.count
               })
             })
  },

  // 获取权限逻辑
   userAuthorized() {
    wx.getSetting({
      success:res=> {
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                authorized: true
              })
            }
          })
        }else {
          console.log('err')
        }
      }
    }) 
   },


   // 我们跳转页面
   onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
   },


   // 喜欢部分跳转的页面
   onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    wx.navigateTo({
      url: '/pages/classic/classic'
      // url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
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