const jwt = require('jsonwebtoken')
const {Jwt_secret} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("USER")
module.exports = (req,res ,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have logged In"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,Jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be Logged In"})
        }
        const {_id} = payload
        User.findById(_id).then(userData =>{
            //console.log(userData)
            req.user = userData
            next()
        })
    })
    
}