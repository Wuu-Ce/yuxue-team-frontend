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
/**
 * 时间戳转化为年 月 日 时 分 秒
 * time: 需要被格式化的时间，可以被new Date()解析即可
 * format：格式化之后返回的格式，年月日时分秒分别为Y, M, D, h, m, s，这个参数不填的话则显示多久前
 */
const __formatTime = (time, format) => {
  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  function getDate(time, format) {
    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
    const returnArr = []
    const date = new Date(time)
    returnArr.push(date.getFullYear())
    returnArr.push(formatNumber(date.getMonth() + 1))
    returnArr.push(formatNumber(date.getDate()))
    returnArr.push(formatNumber(date.getHours()))
    returnArr.push(formatNumber(date.getMinutes()))
    returnArr.push(formatNumber(date.getSeconds()))
    for (const i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i])
    }
    return format
  }

  function getDateDiff(time) {
    let r = ''
    const ft = new Date(time)
    const nt = new Date()
    const nd = new Date(nt)
    nd.setHours(23)
    nd.setMinutes(59)
    nd.setSeconds(59)
    nd.setMilliseconds(999)
    const d = parseInt((nd - ft) / 86400000)
    switch (true) {
      case d === 0:
        const t = parseInt(nt / 1000) - parseInt(ft / 1000)
        switch (true) {
          case t < 60:
            r = '刚刚'
            break
          case t < 3600:
            r = parseInt(t / 60) + '分钟前'
            break
          default:
            r = parseInt(t / 3600) + '小时前'
        }
        break
      case d === 1:
        r = '昨天'
        break
      case d === 2:
        r = '前天'
        break
      case d > 2 && d < 30:
        r = d + '天前'
        break
      default:
        r = getDate(time, 'Y-M-D')
    }
    return r
  }
  if (!format) {
    return getDateDiff(time)
  } else {
    return getDate(time, format)
  }
}


const request = (url, method, data) => {
  var root_url = CONFIG.online_url ? CONFIG.online_url : CONFIG.dev_url
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
        } else if (res.data.code === 0) {
          resolve(res);
        } else if (res.data.code === 10301 || res.data.code === 10302) {
          // 用户未登录或用户登录信息无效，应跳转到登录页面
          console.log(res.data.message);
          reject({
            message: res.data.message || '数据错误',
            code: res.data.code
          })
        } else {
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
  var root_url = CONFIG.online_url ? CONFIG.online_url : CONFIG.dev_url
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
        } else if (res.data.code === 0) {
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
  __formatTime,
  formatTime
}