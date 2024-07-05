const { model } = require("mongoose");

const user=require('./../models/userModel');





const getUser=async (req,res)=>{
  if(req.userId!=req.params.userId){
    res.status(201).json({
      status:"fail",
      message:"Not authentiated"
     });
  }
try{
  const id=req.params.userId;
  const userdata=await user.findById(id);

  if(!userdata){
    res.status(201).json({
      status:"fail",
      data:{},
     });
  }else{
    res.status(200).json({
      status:"Sussess",
      data:{
        userdata
      },
      message:"get data success"
     });
  }
}catch(err){
  console.log(err);
}
};

const updateUser=async (req,res)=>{
  if(req.userId!=req.params.userId){
    throw new Error("not same user")
  }
try{
  const id=req.params.userId;
  const userdata=await user.findByIdAndUpdate(id,req.body);

  if(!userdata){
    res.status(201).json({
      status:"fail",
      data:{},
     });
  }else{
    res.status(200).json({
      status:"Sussess",
      data:{
        userdata
      },
      message:"updated data success"
     });
  }
}catch(err){
  console.log(err);
}
};




module.exports= {getUser,updateUser};