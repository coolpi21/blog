const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.logs')

// 创建 read stream
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
    input: readStream
})

// 累加统计数据
let chromeNum = 0
let sum = 0

rl.on('line', (lineData)=>{
    // 判断数据是否存在
    if (!lineData) {
        return
    }
    // 总数增加
    sum++
    const splitData = lineData.split(' -- ')[2]
    if (splitData && splitData.indexOf('Chrome') > 0) {
        chromeNum++
    }

})

rl.on('close', () => {
    console.log('chrome 占比:', chromeNum / sum)
})
