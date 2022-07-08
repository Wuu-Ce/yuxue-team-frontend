const createTeam = require("./test.js").createTeam
const createFastRecruit = require("./test.js").createFastRecruit
const request = require("./utils/util.js").request;
App({
  onLaunch() {
		// 18330205262：1
		// 18192973090：3
		// 赵迪：4
		// 潘：12
		// 吴金志：5
		// 路伯钰：8
		//  38：2，3，6，7，9，10，11； 1，4，5
    // 45：2，3，6； 1，4，5
<<<<<<< HEAD
    
		request('/test/login','POST',{'user_id': 5}).then(
		  (res)=>{
		    wx.setStorageSync('cookie', res.cookies[0]);
		    wx.setStorage({
		      key: "ifLogin",
		      data: true
		    })
		  },
		  (error)=>{
		    console.log(error.message);
		  }
		)
=======
    request('/test/login','POST',{'user_id':3}).then(
      (res)=>{
        wx.setStorageSync('cookie', res.cookies[0]);
        wx.setStorage({
          key: "ifLogin",
          data: true
        })
      },
      (error)=>{
        console.log(error.message);
      }
    )
>>>>>>> 0ceac29df6c7a95a3dab7a6e545df09659d57327

		// 环境信息
		wx.getSystemInfo({
			success: (e) => {
				this.globalData.StatusBar = e.statusBarHeight
				let capsule = wx.getMenuButtonBoundingClientRect()
				if (capsule) {
					this.globalData.Custom = capsule
					this.globalData.CustomBar =
						capsule.bottom + capsule.top - e.statusBarHeight
				} else {
					this.globalData.CustomBar = e.statusBarHeight + 50
				}
			},
		})
		// 创建团队
		// for(let i=0;i<20;i++){
		//   createTeam(1,1,'jfdoadi','jdfioa','jfdoa','jdfoai','djfioa')
		// }

		// 发布招募
		// for(let i=0;i<20;i++){
		//   createFastRecruit(i+14,false,3,'jfodaijo')
		// }

		// 14-33
	},
  globalData: {
    userInfo: null,
    user_id : 1,
  }
})
