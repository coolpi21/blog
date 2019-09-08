const querystring = require('querystring')
const {get,set} = require('./src/db/redis')
const {access} = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const getExpiredTime = () => {
    const t = new Date()
    t.setTime(t.getTime() + 24 * 60 * 60 * 1000)
    console.log('t.toUTCString is', t.toUTCString())
    return t.toUTCString()
}

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
    // 解析日志
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

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
            const key = arr[0].trim()
            const value = arr[1].trim()
            req.cookie[key] = value
        })
    }
    console.log(req.cookie)

    // 解析 session
    // let userId = req.cookie.userid
    // let needCookieSetting = false
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needCookieSetting = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // // 两个对象引用同一指针，因为 req.session 改变了值，所以 SESSION_DATA[userId]也改变了值
    // req.session = SESSION_DATA[userId]

    // redis 设置 session
    let userId = req.cookie.userid
    let needCookieSetting = false
    if (!userId) {
        needCookieSetting = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then(val => {
        if (val == null) {
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            req.session = val
        }
        return getPostData(req)
    })
    .then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res)
        const userResult = handleUserRouter(req, res)

        // 命中博客路由
        if (blogResult) {
            blogResult.then(blogData => {
                if (needCookieSetting) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;  httpOnly; expires=${getExpiredTime()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 命中用户路由
        if (userResult) {
            userResult.then(userData => {
                if (needCookieSetting) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;  httpOnly; expires=${getExpiredTime()}`)
                }
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
