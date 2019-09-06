const {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/baseModel')
const handleBlogRouter = (req, res) => {
    const {method} = req
    const {id} = req.query

    // 这是博客列表接口
    if (method === 'GET' && req.path === '/api/blog/list') {
        const {author, keyword} = req.query


        const listResult = getBlogList(author, keyword)
        return listResult.then(listData => {
            return new SuccessModel(listData)
        })
        // return new SuccessModel(listData)

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
        req.body.author = 'zhangsan' // 假数据，待登录端口后开发
        const blogResult = newBlog(req.body)

        return blogResult.then(data => {
            // console.log(data)
            return new SuccessModel(data)
        })
    }

    // 这是博客更新接口
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败')
        }
    }

    // 这是博客删除接口
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter
