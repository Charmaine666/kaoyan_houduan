const express = require('express')
const mysql = require('mysql')
const app = express();
const db = require('./utils/db')

app.use((req,res,next)=>{
    // 响应头地址
    // origin参数的值指定了允许访问该资源的外域URL
    res.setHeader('Access-Control-Allow-Origin','*')
    // 响应头数据类型
    // 用来配置允许客户端向服务器发送额外的请求头信息
    res.setHeader('Access-Control-Allow-Headers','Content-Type')
    // res.setHeader('Access-Control-Allow-Headers','*')
    // 响应头请求类型
    // 用来配置允许客户端以其他的请求方式向服务器请求资源
    res.setHeader('Access-Control-Allow-Methods','*')
    next()
})
app.listen(90,function(){
    console.log('项目启动了')
    
})



app.use(express.json()); //数据格式未json格式 
app.use(express.urlencoded({extended:false}));

const userInfo = require('./router/userInfo')
const Login = require('./router/login.js')
const Baike = require('./router/baike.js')
const College = require('./router/college.js')
const Subject = require('./router/subject.js')
const Blogs = require('./router/blog.js')

app.use(userInfo);
app.use(Login);
app.use(Baike);
app.use(College);
app.use(Subject);
app.use(Blogs);




