const CONFIG = require("../config.js")
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
};

const request = (url, method, data) => {
  var root_url = CONFIG.online_url?CONFIG.online_url:CONFIG.dev_url
  var url = root_url + url;
  return new Promise((resolve, reject) => {
    var cookie = wx.getStorageSync('cookie');
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        'cookie': cookie
      },
      success(res) {
        console.log(res);
        if (res.statusCode !== 200) {
          reject({
            message: '请求失败',
          })
        }
        else if (res.data.code === 0) {
          resolve(res);
        }else if(res.data.code===10301 || res.data.code===10302){ 
          // 用户未登录或用户登录信息无效，应跳转到登录页面
          console.log(res.data.message);
          reject({
            message: res.data.message || '数据错误',
            code: res.data.code
          })
        }else{
          reject({
            message: res.data.message || '数据错误',
            code: res.data.code
          })
        }
      },
      fail() {
        reject({
          message: '请求失败',
        })
      },
    })
  })
  

};
const request_nocheck = (url, method, data) => {
  var root_url = CONFIG.online_url?CONFIG.online_url:CONFIG.dev_url
  var url = root_url + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      success(res) {
        if (res.statusCode !== 200) {
          reject({
            message: '请求失败',
          })
        }
        else if (res.data.code === 0) {
          resolve(res);
        } else {
          reject({
            message: res.data.message || '数据错误',
            code: res.data.code
          })
        }
      },
      fail(error) {
        reject({
          message: '请求失败',
        })
      },
      complete() {
        // 加载完成
      }
    })
  })
};

module.exports = {
  request,
  request_nocheck,
  formatTime
}
