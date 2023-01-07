// pages/center/register/register.js
let check = require("../../../utils/check")
let user = require("../../../utils/user")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        code: "",
    },
    // 输入用户名
    bindUsernameInput: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    // 输入密码
    bindPasswordInput: function (e) {

        this.setData({
            password: e.detail.value
        })


    },
    // 确认密码
    bindConfirmPasswordInput: function (e) {
        this.setData({
            confirmPassword: e.detail.value
        })


    },
    // 手机号
    bindMobileInput: function (e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    // 验证码
    bindCodeInput: function (e) {
        this.setData({
            code: e.detail.value
        })


    },
    // 删除已输入
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
    // 注册按钮
    startRegister: function () {
        var that = this;
        if (this.data.password.length < 6 || this.data.username.length < 6) {
            wx.showModal({
                title: '错误信息',
                content: '用户名和密码不得少于6位',
                showCancel: false
            });
            return false;
        }
        if (this.data.password != this.data.confirmPassword) {
            wx.showModal({
                title: '错误信息',
                content: '确认密码不一致',
                showCancel: false
            });
            return false;
        }
        if (this.data.mobile.length == 0 || this.data.code.length == 0) {
            wx.showModal({
                title: '错误信息',
                content: '手机号和验证码不能为空',
                showCancel: false
            });
            return false;
        }
        if (!check.istruephone(this.data.mobile)) {
            wx.showModal({
                title: '错误信息',
                content: '手机号输入不正确',
                showCancel: false
            });
            return false;
        }
        // 校验结束,开始注册,没有登陆过才可以注册
        wx.login({
            success: function (res) {
                console.log(res);
                if (!res.code) {
                    wx.showModal({
                        title: '错误',
                        content: '注册失败',
                        showCancel: false
                    });
                }
                // console.log(res.code);
                user.userrigister(
                    that.data.username,
                    that.data.password,
                    that.data.mobile,
                    that.data.code,
                    res.code)
            }
        })


    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

})