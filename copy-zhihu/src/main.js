// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './routes'
//
// axios.defaults.header('Access-Control-Allow-Origin', '*')
// axios.defaults.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
// res.header('Access-Control-Allow-Headers','Content-Type')
// axios.defaults.baseURL = 'http://news-at.zhihu.com/api/4/news/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//
// axios.defaults.headers.head['Accept'] = 'Access-Control-Allow-Origin,*'
// // axios.defaults.headers.add("access-control-allow-origin","*")
// axios.defaults.headers.common['Accept'] = 'application/html, text/plain, */*'
const axiosInstance = axios.create({
    baseURL: ' https://bird.ioliu.cn/v1/?url=http://news-at.zhihu.com/api/4/news/',
    timeout: 10000,
    headers: {
    }
});
axios.interceptors.request.use(config => {
    // console.table(config.headers)
    return config
}, err => {
    return Promise.reject(err)
})
axios.interceptors.response.use(response => {
    // console.table(response)
    return response
}, err => {
    return Promise.reject(err)
})
Vue.prototype.axios = axiosInstance
Vue.prototype.covImg = (uri, callback) => {

    const data = window.btoa(uri.split('').reverse().join(''))
    axios.get(window.location.origin + '/imagebox?type=rev-64&data=' + data)
        .then(res => {
            if (res.status === 200) {
                console.info(res)
                callback(res.data.data)
            } else {
                console.table(res)
            }
        }).catch(err => {
        console.error(err)
    })
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    // template: '<App/>',
    components: {App},
    router,
    template: '<App/>'
})
