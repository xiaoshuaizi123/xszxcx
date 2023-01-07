let http = require("../../config/api")

Page({
  data: {
    newGoods:[],
    hotGoods:[],
    topics:[],
    brands:[],
    groupons:[],
    floorGoods:[],
    banner:[],
    channel:[],
    coupon:[],
    goodsCount:0,

  },
//   拿到首页数据
gethomedata:function(){
    http("/home/index", "GET", {
    }).then(res => {
      console.log("res:", res); 
      this.setData({
        banner:res.data.data.banner,
        newGoods:res.data.data.newGoodsList,
        hotGoods:res.data.data.hotGoodsList,
        topics:res.data.data.topicList,
        brands:res.data.data.brandList,
        groupons:res.data.data.grouponList,
        floorGoods:res.data.data.floorGoodsList,
        channel:res.data.data.channel,
        coupon:res.data.data.couponList,
        goodsCount:0
      })
    })
},
  onShow: function () {
    this.getTabBar().setData({
        active:0
    })
    this.gethomedata()
  },

})