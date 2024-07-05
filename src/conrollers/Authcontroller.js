const { model } = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs");
const user=require('./../models/userModel');


const registerUser=async (req,res)=>{
    const data={...req.body};
  try{
    let name=req.body.name;
    let email=req.body.email;
  
    var salt = bcrypt.genSaltSync(10);
    let password =await bcrypt.hashSync(req.body.password, salt);
  
    const user1= user.create({name,email,password});
    const result=(await user1).save();
    if(!result){
      res.status(201).json({
       status:"fail",
       data:{},
      });
      console.log('No result found');
    }else{
      res.status(200).json({
        status:"Sussess",
        data:{
          data
        },
        message:"registration done"
       });
    }
  }catch(err){
    console.log(err);
    res.status(500).send('something went wrong');
  }
  };


  const loginUser=async(req,res)=>{
    try{
     let password=req.body.password;
     let email=req.body.email;
      const obj= await user.findOne({email});
 
      if(!obj){
       res.status(200).json({
         status:"Failed",
         message:"invalid Email"
        });
      }else{
      if(await bcrypt.compareSync(password,obj.password)){
 
       let token=jwt.sign({userId:obj._id},"mylittlesecrete",{expiresIn:"1h"});
 
       res.status(200).json({
         status:" login Sussess",
         data:{
         token
         },
         message:"welcome user"
        });
      }else{
       res.status(200).json({
         status:" login failed",
         message:"Invalid password"
        });
      }
     }
    }catch(err){
     
     console.log(err);
    }
 };
 module.exports= {registerUser,loginUser};