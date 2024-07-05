const mongoose=require('mongoose');
const { type } = require('superagent/lib/utils');
 
const user=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        index:true
    },
    password:String,
  
});
const Newuser=mongoose.model('user',user);
module.exports= Newuser;