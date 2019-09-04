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

module.exports = {
    getBlogList,
    getBlogDetail
}
