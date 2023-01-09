let baseURL = "http://localhost:8082";
let version = "/wx"
function http(url, method, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + version + url,
            method,
            data,
            header: {
                'Content-Type': 'application/json', // 表示数据以json的形式传给服务器
                'X-Mymall-Token': wx.getStorageSync('token') // 后面有些接口是我们需要带上token才能获取到数据
            },
            success(response) {
                // if (response.data.data && response.data.success) {
                resolve(response)
                //   console.log(response );
                // }
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

module.exports = http;

// http("/topics","get",{a:1,b:2})