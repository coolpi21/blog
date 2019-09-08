const fs = require('fs')
const path = require('path')

// 写入日志
function writeLog (writeStream, log) {
    writeStream.write(log + '\n')
}

// 创建writeStream
function createWriteStream (fileName) {
    const file = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(file, {
        flags: 'a'
    })
    return writeStream
}

// 创建写入日志
const writeStream = createWriteStream('access.logs')
function access(log) {
    writeLog(writeStream, log)
}

module.exports = {
    access
}
