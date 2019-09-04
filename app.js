const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


const serverHandle = (req, res) => {
    // 设置响应头为 JSON 格式
    res.setHeader('Content-type', 'application/json')
    const {url} = req
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    const blogData = handleBlogRouter(req, res)
    const userData = handleUserRouter(req, res)

    // 命中博客路由
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }

    // 命中用户路由
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }

    // 没有命中路由，显示 404
    res.writeHead('404', {'Content-type': 'text/plain'})
    res.write('404 NOT FOUND')
    res.end()
}

module.exports = serverHandle
