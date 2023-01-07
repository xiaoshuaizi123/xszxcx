// pages/center/account/account.js
let http = require("../../../config/api")
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: ""
    },
    // 删除本行
    clearInput: function (e) {
        // console.log(e);
        switch (e.currentTarget.id) {
            case "clear-username":
                this.setData({
                    username: ""
                })
                break;
            case "clear-password":
                this.setData({
                    password: ""
                })
                break;
            case "clear-confirm-password":
                this.setData({
                    confirmPassword: ""
                })
                break;
            case "clear-mobile":
                this.setData({
                    mobile: ""
                })
                break;
            case "clear-code":
                this.setData({
                    code: ""
                })
                break;
            // ______
        }
    },

    // 获取账号
    inpaccount: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    // 获取密码
    inppassword: function (e) {
        this.setData({
            password: e.detail.value
        })

    },
    // 点击账号登陆
    accountLogin: function () {
        // console.log("账号开始登录");
        var that = this;
        if (this.data.password.length < 1 || this.data.username.length < 1) {
            wx.showModal({
                title: '错误信息',
                content: '请输入用户名和密码',
                showCancel: false
            });
            return false;
        }
        http("/auth/login", "POST", {
            username: that.data.username,
            password: that.data.password
        }).then(res => {
            console.log(res);
            if (res.data.errno == 0) {
                app.globalData.haveLogin = true;
                wx.setStorageSync('userInfo', res.data.data.userInfo);
                wx.setStorage({
                    key: "token",
                    data: res.data.data.token,
                    success: function () {
                        console.log(123);
                        wx.switchTab({
                            url: '/pages/center/index/index'
                        })
                        console.log(123);
                    }
                });
            } else {
                app.globalData.haveLogin = false;
                console.log("登录失败");
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})