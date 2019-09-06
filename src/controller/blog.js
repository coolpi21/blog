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
    const {title, content} = blogData
    const sql = `update blogs set title='${title}', content='${content}' where id='${id}';`

    return exec(sql).then(updateResult => {
        if (updateResult.affectedRows > 0) {
            return true
        }
        return false
    })

}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(delResult => {
        if (delResult.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
}
