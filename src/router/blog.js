const {getBlogList} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/baseModel')
const handleBlogRouter = (req, res) => {
    const {method} = req

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
        return {
            msg: '这是博客详情接口'
        }
    }

    // 这是新建博客接口
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: '这是新建博客接口'
        }
    }

    // 这是博客更新接口
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '这是博客更新接口'
        }
    }

    // 这是博客删除接口
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: '这是博客删除接口'
        }
    }
}

module.exports = handleBlogRouter
