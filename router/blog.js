const express = require('express');
const db=require('../utils/db')
//创建一个路由控制器
const router=express.Router()

router.get('/api/blogs',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    const sql = `SELECT DISTINCT blog_id, b.title, b.contend,u.nickname,u.avatar,b.creat_time FROM blog_img i, user u, blogs b WHERE i.blog_id = b.id AND b.user_id = u.id`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'用户获取成功',data})
        }
    })
})



module.exports=router;