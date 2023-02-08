const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const secretKey = 'secretKey'
// app.use(express.json());

// app.use(UserRouter);

app.get('/',(req,res)=>{
    res.json({message:'simple api'})
})

app.post('/login',(req,res)=>{
    const user = {
        id:1,
        username:'nikhar',
        email:'nikhar.gangwar13@gmail.com'
    }
    jwt.sign({user},secretKey,{expiresIn:'3000s'},(err,token)=>{
        console.log(token)
        res.json({token})
    })
})

app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({result:'invalid Token'})
        }else{
            res.json({
                message:"profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers.authorization;
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const token =bearer[1];
        req.token = token;
        next();
    }else{
        res.send({
            result:'token is not valid'
        })
    }
}
//starting server
app.listen(3000,()=>console.log('app started on port 3000'));