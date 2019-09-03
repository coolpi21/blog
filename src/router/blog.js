const handleBlogRouter = (req, res) => {
    const {method} = req

    // 这是博客列表接口
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: '这是博客列表接口'
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
