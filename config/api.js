let baseURL = "http://localhost:8082";
let version = "/wx"
function http(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + version + url,
      method,
      data,
      headers: {
        "token":wx.getStorageSync('mltoken')
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