const express = require('express');
const db=require('../utils/db')
//创建一个路由控制器
const router=express.Router()

router.get('/api/sub',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    const sql = `select * from subs`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'查询成功',data})
            console.log(data)
        }
    })
})
router.get('/api/sb',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    const sql = `select * from subrelate`
    const sql2 = `select * from subrelate where subType = ${req.query.sub_type}`
    const sql3 = `select * from subrelate where is_Special = ${req.query.is_spe} and is_Acd = ${req.query.is_acd}`
    const sql4 = `select id from subrelate where is_Special = ${req.query.is_spe} and is_Acd = ${req.query.is_acd} and subType = ${req.query.sub_type}`
    if(req.query.is_spe == '' && req.query.is_acd == ''){
        if(req.query.sub_type == ''){
            db.query(sql,function(err,data){
                if(err){
                    res.send({code:500,msg:err})
                }else{
                    res.send({code:200,msg:'查询所有成功',data})
                    // console.log(data)
                }
            })
        }else{
            db.query(sql2,function(err,data){
                if(err){
                    res.send({code:500,msg:err})
                }else{
                    res.send({code:200,msg:'查询成功',data})
                    // console.log(data)
                }
            })
        }
    }else{
        if(req.query.sub_type == ''){
            db.query(sql3,function(err,data){
                if(err){
                    res.send({code:500,msg:err})
                }else{
                    res.send({code:200,msg:'查询成功',data})
                    // console.log(data)
                }
            })
        }else{
            db.query(sql4,function(err,data){
                if(err){
                    res.send({code:500,msg:err})
                }else{
                    res.send({code:200,msg:'查询成功',data})
                    // console.log(data)
                }
            })
        }
    }
    
})

router.get('/api/ml',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    const sql = `select * from subtype`
    db.query(sql,function(err,data){
        if(err){
            res.send({code:500,msg:err})
        }else{
            res.send({code:200,msg:'查询成功',data})
            console.log(data)
        }
    })
})

router.get('/api/xk',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    const sql = `SELECT * FROM subrelate WHERE subType = ${req.query.select_ml}`
    const sql2 = `SELECT * FROM subrelate WHERE subType = ${req.query.select_ml} and is_Special = ${req.query.is_spe}`
    if(req.query.is_spe == ''){
        db.query(sql,function(err,data){
            if(err){
                res.send({code:500,msg:err})
            }else{
                res.send({code:200,msg:'查询成功',data})
                console.log(data)
            }
        })
    }
    else{
        db.query(sql2,function(err,data){
            if(err){
                res.send({code:500,msg:err})
            }else{
                res.send({code:200,msg:'查询成功',data})
                console.log(data)
            }
        })
    }
    
})
router.get('/api/zy',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    var sql
    // const sql1 = `SELECT id FROM subrelate WHERE subType = ${req.query.sub_type}`
    const sql1 = `select * from subs, subrelate where subs.relate_id = subrelate.id`
    const sql4 = `SELECT * FROM subs, subrelate WHERE subs.relate_id = subrelate.id and relate_id IN (SELECT id FROM subrelate WHERE is_Special = ${req.query.is_spe})`
    const sql2 = `SELECT * FROM subs, subrelate WHERE subs.relate_id = subrelate.id and relate_id IN (SELECT id FROM subrelate WHERE subType = ${req.query.sub_type})`
    const sql5 = `SELECT * FROM subs, subrelate WHERE subs.relate_id = subrelate.id and relate_id IN (SELECT id FROM subrelate WHERE subType = ${req.query.sub_type} and is_Special = ${req.query.is_spe})`
    const sql6 = `select * from subs, subrelate where subs.relate_id = subrelate.id and relate_id = ${req.query.select_xk}`
    const sql3 = `SELECT * FROM subs, subrelate WHERE subs.relate_id = subrelate.id and relate_id IN (SELECT id FROM subrelate WHERE id = ${req.query.select_xk} and is_Special = ${req.query.is_spe})`
    if(req.query.is_spe == ''){
        if(req.query.sub_type == ''){
            sql = sql1
        }else{
            if(req.query.select_xk == ''){
                sql = sql2
            }else{
                sql = sql6
            }
        }
    }else{
        if(req.query.sub_type == ''){
            sql= sql4
        }else{
            if(req.query.select_xk == ''){
                sql = sql5
            }else{
                sql = sql3
            }
        }
    }
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