const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
// 获取 POST 方式的数据
const getPostData = function (req) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = (req, res) => {
    // 设置响应头为 JSON 格式
    res.setHeader('Content-type', 'application/json')
    const {url} = req
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {} // k1=123;k2=246;k3=458
    const cookieStr = req.headers.cookie || ''
    if (req.headers.cookie) {
        cookieStr.split(';').forEach(item => {
            const arr = item.split('=')
            const key = arr[0]
            const value = arr[1]
            req.cookie[key] = value
        })
    }
    console.log(req.cookie)

    getPostData(req).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res)
        const userResult = handleUserRouter(req, res)

        // 命中博客路由
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 命中用户路由
        if (userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 没有命中路由，显示 404
        res.writeHead('404', {'Content-type': 'text/plain'})
        res.write('404 NOT FOUND')
        res.end()
    })

}

module.exports = serverHandle
