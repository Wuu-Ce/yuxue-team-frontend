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
    checkIfHaveCookie().then(
      function(cookie){
        wx.request({
          url: whole_url,
          method: method,
          data: data,
          header: {
            'Content-Type': 'application/json; charset=utf-8',
            'cookie': cookie[0]
          },
          success(res) {
            if (res.statusCode !== 200) {
              reject({
                msg: '请求失败',
                statusCode: res.statusCode
              })
            }
            else if (res.data.code === 0) {
              resolve(res);
            } else if(res.data.code===20101 || res.data.code===20102){
              wx.navigateTo({
                url: '/pages/signIn/signIn',
              })
              reject({
                msg: res.data.msg || res.data.message || '数据错误',
                statusCode: res.statusCode
              })
            }else{
              reject({
                msg: res.data.msg || res.data.message || '数据错误',
                statusCode: res.statusCode
              })
            }
          },
          fail(error) {
            reject(error)
          },
          complete(aaa) {
            // 加载完成
          }
        })
      }
    )
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
        console.log(res);
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
