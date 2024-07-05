const mongoose = require("mongoose");

const quiz=new mongoose.Schema({
name:{
    type:String,
   required:true,
    unique:true
},
questions_list:[
    {
        question_no:Number,
        question:String,
        options:{

        }
    }
],
answers:{},
is_createdby:{
    type:mongoose.Types.ObjectId,
    required:true
},
is_published:{
    type:Boolean,
    default:false
}
});
const quizschema=mongoose.model('quiz',quiz);
module.exports=quizschema;