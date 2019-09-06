const {loginCheck} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/baseModel')

const handleUserRouter = (req, res) => {
    const {method} = req
    // 这是用户登录接口
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        if (username && password) {
            const result = loginCheck(username, password)
            return result.then(userData => {
                if (userData.username) {
                    return new SuccessModel()
                } else {
                    return new ErrorModel('登录失败')
                }
            })
        }
    }
}

module.exports = handleUserRouter
