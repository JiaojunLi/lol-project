const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    // 允许请求的源
    res.setHeader('Access-Control-Allow-Origin', "*")
        // 允许请求的方法
    res.setHeader("Access-Control-Allow-Methods", "*")
        // 允许所有的头
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

app.use(router)

app.listen(5000, () => {
    console.log('服务器启动在:http://localhost:5000')
})