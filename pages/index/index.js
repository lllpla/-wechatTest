//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');  

Page({
  data: {
    motto: '加班记录',
    userInfo: {},
    hasUserInfo: false,
    hasSysInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindRecord:function(){
    wx.switchTab({
      url: '../record/record',
    })
  },
  bindLog: function () {
    wx.switchTab({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.brand);
        console.info(res.model);
        console.info(res.screenWidth);
        console.info(res.screenHeight);

        that.setData({
          hasSysInfo:true,
          sysInfo:{
            brand:res.brand,
            model:res.model,
            screenWidth: res.screenWidth,
            screenHeight: res.screenHeight,
          }
        })
      }
    })

    //获取当前时间并赋值
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
