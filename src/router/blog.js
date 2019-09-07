const {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/baseModel')

// 登录检验
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const handleBlogRouter = (req, res) => {
    const {method} = req
    const {id} = req.query

    // 这是博客列表接口
    if (method === 'GET' && req.path === '/api/blog/list') {
        let {author, keyword} = req.query

        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }
            author = req.session.username
        }


        const listResult = getBlogList(author, keyword)
        return listResult.then(listData => {
            return new SuccessModel(listData)
        })

    }

    // 这是博客详情接口
    if (method === 'GET' && req.path === '/api/blog/detail') {
        if (id) {
            const detailResult = getBlogDetail(id)
            return detailResult.then(data => {
                return new SuccessModel(data[0])
            })
        }

    }

    // 这是新建博客接口
    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginResult = loginCheck(req)
        if (loginResult) {
            return loginResult
        }
        req.body.author = req.session.username
        const blogResult = newBlog(req.body)

        return blogResult.then(data => {
            // console.log(data)
            return new SuccessModel(data)
        })
    }

    // 这是博客更新接口
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginResult = loginCheck(req)
        if (loginResult) {
            return loginResult
        }

        const result = updateBlog(id, req.body)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 这是博客删除接口
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginResult = loginCheck(req)
        if (loginResult) {
            return loginResult
        }
        const author = req.session.username // 假数据
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })

    }
}

module.exports = handleBlogRouter
