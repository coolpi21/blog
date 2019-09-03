const serverHandle = (req, res) => {
    // 设置响应头为 JSON 格式
    res.setHeader('Content-type', 'application/json')

    const resData = {
        'name': 'coolfish',
        'age': 20
    }

    res.end(JSON.stringify(resData))
}

module.exports = serverHandle
