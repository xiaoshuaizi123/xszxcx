let http = require("../config/api")
let app = getApp()
// let util = require("../utils/util")

// pormise封装wx.login
function login() {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                if (res.code) {
                    resolve(res)
                } else {
                    reject(res)
                }
            },
            fail: function (err) {
                reject(err)
            }
        })
    }
    )
}
// 调用微信登录
function loginbywx(useInfo) {
    console.log(useInfo);
    return new Promise(function (resolve, reject) {
        return login().then((res) => {
            // console.log(res.code);
            // console.log(useInfo);
            http("/auth/login_by_weixin", "POST", {
                code: res.code,
                userInfo: useInfo
            }).then(res => {
                // console.log(res);
                wx.setStorageSync('userInfo', res.data.data.userInfo);
                wx.setStorageSync('token', res.data.data.token);
                resolve(res)
            })
        })
    })
}
/**
 * 判断用户是否登录
 */
function checkLogin() {
    return new Promise(function (resolve, reject) {
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
            checkSession().then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        } else {
            reject(false);
        }
    });
}
// 用户发送注册请求
function userrigister(username, password, mobile, code, wxcode) {
    // console.log(wxcode);
    http("/auth/register", "POST", {
        username: username,
        password: password,
        mobile: mobile,
        code: code,
        wxCode: wxcode,
    }).then(res => {
        console.log(res);
        if (res.data.errno == 0) {
            app.globalData.haveLogin = true;
            wx.setStorageSync('userInfo', res.data.data.userInfo);
            wx.setStorage({
                key: "token",
                data: res.data.data.token,
                success: function () {
                    wx.showToast({
                        title: '注册成功！',
                        icon: 'success',
                        duration: 2000 //持续的时间
                      })
                      setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/center/account/account'
                        })
                      }, 2000);

                }
            });
        } else {
            wx.showModal({
                title: '错误信息',
                content: res.data.errmsg,
                showCancel: false
            });
        }

    })


}
module.exports = {
    loginbywx,
    checkLogin,
    userrigister,
};