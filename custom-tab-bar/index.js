// components/custom-tabBar/custom-tabBar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        tabBarArr: [
            {
            "pagePath": "/pages/home/home",
            "text": "首页",
            "icon":"home-o"
            },
            {
            "pagePath": "/pages/kinds/kinds",
            "text": "分类",
            "icon":"search"
            },
            {
            "pagePath": "/pages/cart/cart",
            "text": "购物车",
            "icon":"friends-o"
            },
            {
            "pagePath": "/pages/center/index/index",
            "text": "个人",
            "icon":"setting-o"
            }
        ],
        active:0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e){
            console.log(e.detail);
            this.setData({
                active:e.detail
            })
            wx.switchTab({
              url: this.data.tabBarArr[e.detail].pagePath
            })
        }
    }
})
