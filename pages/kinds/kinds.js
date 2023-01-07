let http = require("../../config/api")
import Notify from '@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList: [],
        currentCategory: {},
        currentSubCategoryList: {},
        goodsCount: 0,
        activeKey: 0,
    },
    // 切换索引
    switchCate: function (e) {
        let that = this
        console.log(e);
        var currentid = e.currentTarget.dataset.id
        if (this.data.currentCategory.id == currentid) {
            return false
        }
        http("/catalog/current", "GET", {
            id: currentid
        }).then(res => {
            console.log("res:", res);
            that.setData({
                currentCategory: res.data.data.currentCategory,
                currentSubCategoryList: res.data.data.currentSubCategory,
            })
        })
    },
    // 渲染分类页数据
    getkindsdata: function () {
        http("/catalog/index", "GET", {
        }).then(res => {
            console.log("res:", res);
            this.setData({
                categoryList: res.data.data.categoryList,
                currentCategory: res.data.data.currentCategory,
                currentSubCategoryList: res.data.data.currentSubCategory,
            })
        })
    },
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading()
        this.getkindsdata();
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },
    onShow: function () {
        this.getTabBar().setData({
            active: 1
        })
        this.getkindsdata()
    },
})