// pages/goods/goods.js
let http = require("../../config/api")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        goods: {},
        attribute: [],
        issuelist: [],
        comment: [],
        brand: {},
        specificationList: [],
        productList: [],
        goodsprice: 0,
        more: '',
        choosenum: '规格数量选择',
        popshow: false,
        relategoods: [],
        acatarUrl: '',
        cartgoodnum: 0,// 购物车数量
        goodsnum: 1,//商品的数量
        specval: [], //渲染的选中属性


    },
    //  * 生命周期函数--监听页面加载
    onLoad(options) {
        console.log(options.id);
        this.setData({
            id: parseInt(options.id)
        })
        // console.log(this.data.id);
        this.getgoodsinfo()
        this.getralategoods()
    },
    // 获取商品数据
    getgoodsinfo: function () {
        let that = this
        http("/goods/detail", "GET", {
            id: that.data.id
        }).then(function (res) {
            console.log("商品详情页面数据", res);
            that.setData({
                goods: res.data.data.info,
                attribute: res.data.data.attribute,
                issuelist: res.data.data.issue,
                comment: res.data.data.comment,
                brand: res.data.data.brand,
                specificationList: res.data.data.specificationList,
                productList: res.data.data.productList,
                goodsprice: res.data.data.info.retailPrice,
                // more: res.data.data.info.detail.replace(/\<img/gi, '<img class="richimg" ')
                more: res.data.data.info.detail.replace(/\<img/gi, '<img class="xx" ')

            })
        })
    },
    // 弹出框选择
    switchpop: function () {
        this.setData({ popshow: true });
    },
    onClose() {
        this.setData({ popshow: false });
    },
    // 弹出框商品的属性切换
    changetag: function (e) {
        // console.log("类别", e.currentTarget.dataset.name);
        // console.log("goodsid", e.currentTarget.dataset.valueId);
        let name = e.currentTarget.dataset.name
        let goodsid = e.currentTarget.dataset.valueId
        let state = this.data.specificationList
        // 开始判断选中的属性
        for (let i = 0; i < state.length; i++) {
            if (state[i].name == name) {
                for (let j = 0; j < state[i].valueList.length; j++) {
                    if (state[i].valueList[j].id == goodsid) {
                        if (state[i].valueList[j].deleted == false) {
                            state[i].valueList[j].deleted = true
                        } else {
                            state[i].valueList[j].deleted = false
                        }
                    } else {
                        state[i].valueList[j].deleted = false
                        // console.log(state[i].valueList[j].deleted);
                    }
                }
            }
        }
        // 判断完毕,同步数据
        this.setData({
            specificationList: state
        })
        this.changespecinfo()
    },
    // 重新改变显示信息
    changespecinfo: function () {
        // console.log(this.data.specificationList);
        let choosedinfo = this.getchoosedinfo()
        // console.log(choosedinfo);
        // 然后就拿到了属性的拼凑结果
        // 渲染选中的属性到对应位置、

        this.setData({
            specval: choosedinfo
        })
        // console.log(this.data.specval);
        let newspecval = []
        let newspecvalue = ''
        // 渲染两种属性
        this.data.specval.map(item => {
            newspecval.push(item.valuetext)
        })
        newspecvalue = newspecval.join('')
        this.setData({
            newspecval,
            newspecvalue
        })
        console.log(newspecval);
        // 开始渲染价格
        // 判断本地的数据表和选中的属性是否匹配
        let productList = this.data.productList
        // console.log(productList);
        let specprice = ''
        for (let k = 0; k < productList.length; k++) {
            // console.log(this.data.newspecval);
            if (this.data.newspecval.every(item => Boolean(item) == true)) {
                if (String(productList[k].specifications) == String(this.data.newspecval)) {
                    // console.log(productList[k].specifications);
                    // console.log(k);

                    specprice = productList[k].price
                    console.log(specprice);
                    this.setData({
                        specprice
                    })
                }
            } else {
                console.log("空");
                this.setData({
                    specprice: ''
                })
            }

        }
    },
    // 获取选中商品的属性规格
    getchoosedinfo: function () {
        let choosedval = []
        // 定义一个空数组来装数据
        let state = this.data.specificationList
        for (let i = 0; i < state.length; i++) {
            let choosedobj = {
                name: state[i].name,
                valueid: 0,
                valuetext: ''
            }
            for (let j = 0; j < state[i].valueList.length; j++) {
                if (state[i].valueList[j].deleted) {
                    choosedobj.valueid = state[i].valueList[j].id
                    choosedobj.valuetext = state[i].valueList[j].value
                    console.log(choosedobj);
                }
                // 然后把数据推入数组


            }
            // console.log(choosedobj);
            choosedval.push(choosedobj)
            // console.log(choosedval);
        }
        return choosedval
    },
    // 加减器
    cutnum: function () {
        this.setData({
            goodsnum: (this.data.goodsnum - 1 < 1) ? 1 : this.data.goodsnum - 1
        })
    },
    addnum: function () {
        this.setData({
            goodsnum: this.data.goodsnum + 1

        })
    },
    // 添加商品到购物车
    addgoods: function () {
        console.log("添加购物车");
        http("/cart/add", "post", {
            
        })
    },
    // 相关商品
    getralategoods: function () {
        let that = this
        http("/goods/related", "GET", {
            id: that.data.id
        }).then(function (res) {
            console.log("相关商品数据", res);
            that.setData({
                relategoods: res.data.data.goodsList
            })
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