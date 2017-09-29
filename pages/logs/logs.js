//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  
  clearLogs:function (){
    var that = this;
    wx.showModal({
      title: '确认',
      content: '',
      cancelText: '取消',
      confirmText: '确认提交',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定,清除日志')
          wx.removeStorageSync('logs')
          that.setData({
            logs: []
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  }
})
