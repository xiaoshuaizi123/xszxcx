// pages/author/login/login.js
let user = require("../../../utils/user")
let app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },
    // 点击微信登录
    wxlogin: function (e) {
        console.log(e);
        if (e.detail.userInfo == undefined) {
            console.log("错误");
            return
        }
        user.loginbywx(e.detail.userInfo).then(res => {
            app.globalData.haveLogin = true
            console.log(app.globalData.haveLogin);
            wx.navigateBack({
                delta: 1
            })
        }).catch((err) => {
            app.globalData.haveLogin = false
            console.log(app.globalData.haveLogin);
        })
    },
    // 点击账号登录
    accountlogin: function () {
        wx.navigateTo({
            url: '/pages/center/account/account',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },
})