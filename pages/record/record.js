//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    motto: '加班记录',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    eventStr: "",
    modalHidden:true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //获取当前时间并赋值
    var nowDate = new Date();
    var date = util.pickerDateFormat(nowDate);
    var time = util.pickerTimeFormat(nowDate);
    this.setData({
      time: {
        startTime: time,
        endTime: time
      },
      date: {
        startDate: date,
        endDate: date
      },
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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



  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'date.startDate': e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'time.startTime': e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'date.endDate': e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'time.endTime': e.detail.value
    })
  },
  bindEventInput: function (e) {
    this.setData({
      eventStr: e.detail.value
    })
    console.log(e.detail.value)
  },


  formBindsubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData);
    var check = wx.showModal({
      title: '确认',
      content: '',
      cancelText:'取消',
      confirmText:'确认提交',
      success:function(res){
        if(res.confirm){
          console.log('用户点击确定')
          that.sendmsg(formData);
        }else if(res.cancel){
          console.log('用户点击取消')
        }
      }
    });
  },
sendmsg:function(e){
  console.log(this.data.eventStr);
}

})
