const mongoose=require("mongoose");
const examSchema=new mongoose.Schema({
 userId:{
    type:mongoose.Types.ObjectId,
    required:true
 },
 quizId:{
    type:mongoose.Types.ObjectId,
    required:true
 },
 score:{
     type:Number,
     required:true
 },
 total:{
   type:Number,
   required:true
 }
});

const exam=mongoose.model('exam',examSchema);
module.exports=exam;