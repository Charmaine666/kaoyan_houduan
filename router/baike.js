const express = require('express');
const db=require('../utils/db')
//创建一个路由控制器
const router=express.Router()

router.get('/api/baike',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    console.log(111111)
    console.log(req.body)
    console.log(111111)
    const sql = `select * from policy where item_id=${req.query.item_id}`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'查询成功',data})
            console.log(data)
        }
    })
})

module.exports=router;