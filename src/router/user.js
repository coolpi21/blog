const handleUserRouter = (req, res) => {
    const {method} = req

    // 这是用户登录接口
    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: '这是用户登录接口'
        }
    }
}

module.exports = handleUserRouter
