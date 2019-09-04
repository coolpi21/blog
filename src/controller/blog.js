const getBlogList = (author, keyword) => {
    // 返回假数据
    return [
        {
            id: 1,
            title: '可爱女人',
            author,
            createTime: 1567578198986
        },
        {
            id: 2,
            title: '可爱男人',
            author,
            createTime: 1567578218422
        }
    ]

}

const getBlogDetail = id => {
    return {
        id,
        title: '可爱女人',
        author: '张三',
        createTime: 1567578198986
    }
}

const newBlog = blogData => {
    console.log('new Blog...', blogData)
    return {
        id: '3'
    }
}

const updateBlog = (id, blogData) => {
    console.log('update Blog...', id, blogData)
    return true
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
}
