const redis = require('redis')
const {REDIS_CONFIG} = require('../config/conf')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.error(err)
})

// 设置数据
function set (key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

// 获取数据
function get (key) {
    return new Promise ((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }

            if (val == null) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    set,
    get
}

