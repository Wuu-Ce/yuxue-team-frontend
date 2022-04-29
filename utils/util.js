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

// 检查cookie是否有效
// 使用一些功能时，需要查验cookie的有效性，若未登录或登录到期，则为无效。比如使用如下功能时：创建团队、申请加入。
// 有效：resolve(true) ，无效：resolve(false)，否则 reject（表示请求失败，比如网络问题）
// 若有效，那么正常进行下一步，若无效，那么弹出登录窗，否则弹出请求失败
const checkCookieValid = () =>{
  var root_url = CONFIG.online_url ? CONFIG.online_url : CONFIG.dev_url
  var url = root_url + '/auth/status';
  return new Promise((resolve, reject) => {
    var cookie = wx.getStorageSync('cookie');
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        'cookie': cookie
      },
      data: {},
      success(res){
        if(res.statusCode==200){
          if(res.data.code===0){  // 表示cookie有效
            resolve(true);
          }else{  // 表示cookie无效
            resolve(false);
          }
        }else{
          reject();
        }
      },
      fail(){  // 表示请求失败
        reject()
      }
    })
  })
};

// 发送请求前，会先查验cookie是否有效
// 请求成功：rosolve(请求结果)，请求失败：reject(错误原因message和错误码code)
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
        if (res.statusCode !== 200) {
          // 表示请求失败，提醒用户“请求失败”
          reject({
            message: '请求失败',
            code: -1
          })
        } else if (res.data.code === 0) {
          // 请求成功，将返回值resolve给用户
          resolve(res);
        } else if (res.data.code === 10301 || res.data.code === 10302) {
          // 用户未登录或用户登录信息无效，弹出登录窗口
          reject({
            message: res.data.message || '数据错误',
            code: res.data.code
          })
        } else {
          // 表示其他类型的错误，如参数格式不正确
          reject({
            message: res.data.message || '数据错误',
            code: res.data.code
          })
        }
      },
      fail() {
        // 表示请求失败，提醒用户“请求失败”
        reject({
          message: '请求失败',
          code: -1
        })
      },
    })
  })
};

module.exports = {
  request,
  __formatTime,
  formatTime,
  checkCookieValid
}