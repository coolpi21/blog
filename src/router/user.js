const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/baseModel')
const {set} = require('../db/redis')

const handleUserRouter = (req, res) => {
    const {method} = req
    // 这是用户登录接口
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        if (username && password) {
            const result = login(username, password)
            return result.then(userData => {
                if (userData.username) {
                    req.session.username = userData.username
                    req.session.realname = userData.realname
                    set(req.sessionId, req.session)
                    return new SuccessModel()
                } else {
                    return new ErrorModel('登录失败')
                }
            })
        }
    }

    // 这是登录测试接口
    if (method === 'GET' && req.path === '/api/user/login-test') {
        const {username} = req.session
        if (username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }))
        }
        return Promise.resolve(new ErrorModel('登录失败'))

    }
}

module.exports = handleUserRouter
