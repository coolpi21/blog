const {exec} = require('../db/db')
const getBlogList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `

    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`

    return exec(sql)


}

const getBlogDetail = id => {
    const sql = `select * from blogs where id='${id}'`

    return exec(sql)

}

// 新建博客
const newBlog = blogData => {
    const title = blogData.title
    const author = blogData.author
    const content = blogData.content
    const createtime = Date.now()

    const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`

    return exec(sql).then(insertData => {
       return {
           id: insertData.insertId
       }
    })
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
