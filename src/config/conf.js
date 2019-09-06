const env = process.env.NODE_ENV

let SQL_CONFIG

if (env === 'production') {
    SQL_CONFIG = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'vrnjupqr',
        database: 'my_blog'
    }
}

if (env === 'dev') {
    SQL_CONFIG = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'vrnjupqr',
        database: 'my_blog'
    }
}

module.exports = {
    SQL_CONFIG
}
