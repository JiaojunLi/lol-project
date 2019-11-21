const router = require('express').Router()
const path = require('path')
const fs = require('fs')


// 获取新闻列表数据
router.get('/getBrandList', (req, res) => {
    // 查询数据库，获取到所有的新闻
    // 直接把所有的新闻返回
    readNewsData(data => {
        res.jsonp({
            status: 200,
            msg: '查询数据成功',
            list: data.list
        })
    })
})

// 获取详情的接口
router.get('/getBrandInfo', (req, res) => {
    let id = req.query.id
    readNewsData(data => {
        res.jsonp({
            status: 200,
            msg: '查询数据成功',
            list: data.list.find(item => item.id == id)
        })
    })
})

// 添加新闻
router.post('/addBrand', (req, res) => {
    console.log(req.body)
    let newsData = req.body
    readNewsData(data => {
        newsData.id = ++data.index
        data.list.push(newsData)
        writeNewsData(data, () => {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        })
    })
})

// 删除品牌
router.get('/deleteBrand', (req, res) => {
    let id = req.query.id
    readNewsData(data => {
        let index = data.list.findIndex(item => item.id == id)
        data.list.splice(index, 1)
        writeNewsData(data, () => {
            res.send({
                status: 200,
                msg: '删除数据成功'
            })
        })
    })
})

module.exports = router

function readNewsData(callback) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            return console.log('读取文件失败', err)
        }
        data = JSON.parse(data)

        callback(data)
    })
}

function writeNewsData(data, callback) {
    fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(data, null, 2), err => {
        if (err) {
            return console.log('写文件失败', err)
        }
        callback()
    })
}