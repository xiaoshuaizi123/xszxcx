let app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nickName: "点击登录",
            avatarUrl: "https://img2.baidu.com/it/u=333016990,977824001&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        },
        hasLogin: false
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(app.globalData.haveLogin);
        this.getTabBar().setData({
            active: 3
        })
        if (app.globalData.haveLogin) {
            console.log(123);
            let userInfo = wx.getStorageSync('userInfo');
            if (this.data.hasLogin) {
                return
            }
            wx.showToast({
                title: '登录成功！',
                icon: 'success',
                duration: 2000 //持续的时间
            })
            this.setData({
                userInfo: userInfo,
                hasLogin: true
            })
        }
    },
    // 点击去登录页面
    tologin: function () {
        if (app.globalData.haveLogin) {
            wx.showToast({
                title: '已登陆',
                icon: 'success',
                duration: 2000 //持续的时间
            })
        } else {
            wx.navigateTo({
                url: '/pages/center/login/login',
            })
        }

    },
    // 退出登录
    cleaninfo: function () {
        wx.clearStorage({
            userInfo: "",
            token: "",
        })

        wx.reLaunch({
            url: '/pages/center/index/index',
        })


        // 还原默认头像和昵称
        app.globalData.haveLogin = false
        this.setData({
            userInfo: {
                nickName: "点击登录",
                avatarUrl: "https://img2.baidu.com/it/u=333016990,977824001&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            },
            hasLogin: false
        })

        wx.showToast({
            title: '退出成功',
        })
    },
    onPullDownRefresh: function () {

    },

})