import axios from 'axios'

// 创建一个axios实例，为其设置一些基础配置参数
const instance = axios.create({
    timeout: 5000, // 请求超时时间,如果超过5s就会报错
    baseURL: 'http://localhost:8080' // 表示我们请求api时候的基地址,此地址会拼接上请求中的url
})

// Add a response interceptor
//  全局相应拦截，所有的网络请求返回之后都会走这里
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // response表示返回的结果，我们可以对这个结果做处理
        // console.log('请求执行完成')
        // console.log(response)
        return response.data
    },
    function (error) {
        // console.dir(error)
        if (error.response.status === 401) {
            window.location.href = '/' // 跳转到登录页
        }
        // if (error.message.indexOf('timeout') > -1) {
        //   alert('请求超时，请重试')
        // }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)

export default instance

/***
 * 发起get请求
 *  url     表示请求地址
 *  params  表示传递的参数
 */
export function get(url, params) {
    return instance.get(url, {
        params
    })
}

/**
 * 发起post请求
 * @param {*} url     请求地址
 * @param {*} data    传递的数据
 */
export function post(url, data) {
    return instance.post(url, data)
}

/**
 * 发起put请求
 * @param {*} url     请求地址
 * @param {*} data    传递的数据
 */
export function put(url, data) {
    return instance.put(url, data)
}

/**
 * 发起delete请求
 * @param {*} url   请求地址
 */
export function del(url) {
    return instance.delete(url)
}

