const express = require('express');
const db=require('../utils/db')
//创建一个路由控制器
const router=express.Router()

router.get('/api/user',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    console.log(req.query.id)
    const sql = `select * from user where id=${req.query.id};`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'用户获取成功',data})
        }
    })
})

router.get('/api/myFollow',function(req,res){
    console.log(req.query.id)
    const sql = `SELECT * FROM USER WHERE id IN (SELECT focus_user_id FROM focus WHERE user_id = ${req.query.id});`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'用户获取成功',data})
        }
    })
})

router.get('/api/myfan',function(req,res){
    console.log(req.query.id)
    const sql = `SELECT * FROM USER WHERE id IN (SELECT user_id FROM focus WHERE focus_user_id = ${req.query.id});`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'用户获取成功',data})
        }
    })
})




module.exports=router;