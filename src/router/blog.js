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
        if (author && keyword) {
            const listData = getBlogList(author, keyword)
            return new SuccessModel(listData)
        } else {
            return {
                msg: '缺少参数信息'
            }
        }
    }

    // 这是博客详情接口
    if (method === 'GET' && req.path === '/api/blog/detail') {
        if (id) {
            const detailData = getBlogDetail(id)
            return new SuccessModel(detailData)
        }

    }

    // 这是新建博客接口
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = newBlog(req.body)
        return new SuccessModel(blogData)
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
