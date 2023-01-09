let http = require("../../config/api")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: [],//当前购物车商品数据
        cartTotal: 0,
        isedit: false,

    },
    // 获取购物车数据
    getcartinfo: function () {
        let that = this
        http("/cart/index", "GET", {
        }).then(function (res) {
            console.log("获取购物车数据");
            console.log(res);
            let cartnum = res.data.data.cartTotal.goodsCount
            let cartList = res.data.data.cartList
            console.log(cartnum);
            that.setData({
                cartnum,
                cartList,

            })
            // console.log(that.data.cartnum);
        })
    },
    // 加减购物车商品数量
    cutnum: function (e) {
        let that = this
        let index = e.currentTarget.dataset.index
        let num = this.data.cartList[index].number - 1
        console.log(num);
        // console.log(e.currentTarget.dataset.index);

        http("/cart/update", "POST", {
            "productId": this.data.cartList[index].productId,
            "goodsId": this.data.cartList[index].goodsId,
            "number": num,
            "id": this.data.cartList[index].id
        }).then(function (res) {
            // console.log(res);

            http("/cart/index", "GET", {
            }).then(function (res) {

                let cartnum = res.data.data.cartTotal.goodsCount
                let cartList = res.data.data.cartList

                that.setData({
                    cartnum,
                    cartList,

                })
                // console.log(that.data.cartnum);
            })


        })
    },
    addnum: function (e) {
        let that = this
        let index = e.currentTarget.dataset.index
        let num = this.data.cartList[index].number + 1
        console.log(num);
        // console.log(e.currentTarget.dataset.index);

        http("/cart/update", "POST", {
            "productId": this.data.cartList[index].productId,
            "goodsId": this.data.cartList[index].goodsId,
            "number": num,
            "id": this.data.cartList[index].id
        }).then(function (res) {
            // console.log(res);

            http("/cart/index", "GET", {
            }).then(function (res) {

                let cartnum = res.data.data.cartTotal.goodsCount
                let cartList = res.data.data.cartList

                that.setData({
                    cartnum,
                    cartList,

                })
                // console.log(that.data.cartnum);
            })


        })
    },
    // 开启编辑模式
    openedit: function () {
        this.setData({
            isedit: !this.data.isedit
        })
    },
    // 选择取消
    choose: function () {
        http("/cart/checked", "POST", {
            "productIds": [
                1
            ],
            "isChecked": 0

        })
    },
    onLoad: function (options) {
        this.getcartinfo()
        // this.getgoodsinfo()

        // this.setData({
        //     cartList: this.data.productList.cartList,
        //     cartTotal: this.data.cartnum

        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().setData({
            active: 2
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})