const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs");


const error={
   status:"Fail",
   message:"Not Authenticated"
};

//header-->token
//jwt -->decode using sign "mylittlesecrete" --->usedId
const isAuthenticated=(req,res,next)=>{

const header=req.get('Authorization');

if(!header){
  res.send(error);
}
const token=header.split(' ')[1];
let decodetoken;
try{
    decodetoken=jwt.verify(token,"mylittlesecrete");
 
}catch(err){
    res.send(error);
}
if(!decodetoken){
    res.send(error);
}
//console.log(decodetoken.userId);
req.userId=decodetoken.userId;
next();
}
module.exports={isAuthenticated};