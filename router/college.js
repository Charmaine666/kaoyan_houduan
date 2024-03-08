const express = require('express');
const db=require('../utils/db')
//创建一个路由控制器
const router=express.Router()

router.get('/api/colInfo',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')

    const sql1 = `select * from college`
    const sql2 = `select * from college where id in (SELECT col_id FROM col_special WHERE special_id = ${req.query.special})`
    const sql3 = `select * from college where type = '${req.query.type}'`
    const sql4 = `select * from college where id in (SELECT col_id FROM col_special WHERE special_id = ${req.query.special}) and type = '${req.query.type}'`
    const sql5 = `select * from college where area = '${req.query.area}'`
    const sql6 = `select * from college where id in (SELECT col_id FROM col_special WHERE special_id = ${req.query.special}) and area = '${req.query.area}'`
    const sql7 = `select * from college where type = '${req.query.type}' and area = '${req.query.area}'`
    const sql8 = `select * from college where id in (SELECT col_id FROM col_special WHERE special_id = ${req.query.special}) and area = '${req.query.area}' and type = '${req.query.type}'`
    var sql
    if(req.query.area == ''){
        if(req.query.type == ''){
            if(req.query.special == ''){
                sql = sql1
            }else{
                sql = sql2
            }
        }else{
            if(req.query.special == ''){
                sql = sql3
            }else{
                sql = sql4
            }
        }
    }else{
        if(req.query.type == ''){
            if(req.query.special == ''){
                sql = sql5
            }else{
                sql = sql6
            }
        }else{
            if(req.query.special == ''){
                sql = sql7
            }else{
                sql = sql8
            }
        }
    }
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'查询院校成功',data})
            console.log(data)
        }
    })
    // const sql1 = `select * from college where area = ${req.query.area}`
    // const sql2 = `select * from college where type = ${req.query.type}`
    // const sql3 = `select * from college where is_985 = 1`
    // const sql4 = `select * from college where is_211 = 1`
    // const sql5 = `select * from college where is_Syl = 1`
    // const sql6 = `select * from college where is_Zhx = 1`
    // const sql7 = `select * from college where is_Gd = 1`
    // const sql8 = `select * from college where is_ky = 1`
    // var sql
    // if(req.query.special == 1){
    //     sql = sql3
    // }else if(req.query.special == 2){
    //     sql = sql4
    // }
    // else if(req.query.special == 3){
    //     sql = sql5
    // }
    // else if(req.query.special == 4){
    //     sql = sql6
    // }
    // else if(req.query.special == 5){
    //     sql = sql7
    // }
    // else if(req.query.special == 6){
    //     sql = sql8
    // }
    
})


module.exports=router;