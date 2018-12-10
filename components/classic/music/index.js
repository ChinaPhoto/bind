// components/classic/music/index.js

import { classicBeh } from '../classic-behaviors.js'
const BAM = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[ classicBeh ],
  properties: {
    src: String,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

   // 在组件实例进入页面节点树时的生命周期
  attached(){
    this._recoverStatus();
    this._monitorSwitch();
  },


  /**
   * 组件的方法列表
   */
   
  methods: {
    // 点击 切换装填
    onPlay(event) {
      if( !this.data.playing ) {
        this.setData({
          playing: true
        })
        BAM.title= this.properties.title;
        BAM.src= this.properties.src;
      }else {
        this.setData({
          playing: false
        })
        BAM.pause();      
      }    
    },

    // 判断状态的播放状态的私有方法
    _recoverStatus() {
      if( BAM.paused ) {
        this.setData({
          playing: false
        })
        return 
      }

      if( BAM.src == this.properties.src ) {
        this.setData({
          playing: true
        })
      }
    },

    // 监听播放事件
    _monitorSwitch() {
      BAM.onPlay(()=>{
        this._recoverStatus()
      });
      BAM.onPause(()=>{
        this._recoverStatus()
      });
      BAM.onStop(()=>{
        this._recoverStatus()
      });  
      BAM.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }


})
