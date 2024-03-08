
const express = require('express');
const db=require('../utils/db')
//创建一个路由控制器
const router=express.Router()

router.post('/api/userLogin',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    const sql = `select * from user where account=${req.body.account} and password=${req.body.password};`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'登录成功',data})
            console.log(data)
        }
    })
})

router.post('/api/reg',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    // console.log(111111)
    // console.log(req.body)
    // console.log(111111)
    const sql = `insert into user (account,password) values (${req.body.account},${req.body.password});`
    const sql2 = `select * from user where account = ${req.body.account}`
    db.query(sql2,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            // res.send({code:200,msg:'查询成功',data})ss
            console.log(data.length)
            if(data.length>0){
                res.send({code:500,msg:'账号已存在，注册失败'})
            }
            else{
                db.query(sql,function(err,data){
                    if(err){
                        res.send({code:500,msg:err})
                    }else{
                        res.send({code:200,msg:'注册成功',data})
                        console.log(data)
                    }
                })
            }
        }
    })

})

module.exports=router;