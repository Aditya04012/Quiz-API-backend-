const quiz=require("./../models/quizModel");

const createQuiz= async(req,res)=>{

  try{
    const is_createdby=req.userId;//from authentication
    const name=req.body.name;
    const questions_list=req.body.questions_list;
    const answers=req.body.answers;
  
  const Quiz=new quiz({name,questions_list,answers,is_createdby});
  const result=await Quiz.save();
console.log(result);
  res.status(201).json({
    Status:"success",
    data:{
      quizId:result._id
    },
    message:"Quiz created succesful"
  });
  }catch(err){
    res.status(201).json({
      Status:"Fail",
      message:"Something went wrong"
    });
  }
  

};
const getQuiz=async(req,res)=>{

  try{
    const id=req.params.quizId;
    const result=await quiz.findById(id,{name:1,questions_list:1,answers:1,is_createdby:1});
    if(!result){
      res.send({
        status:"fail",
        message:"quiz not found"
        });
    }
    if(req.userId!==result.is_createdby.toString()){
      res.status(200).send({
        status: "fail",
        message: "You are not autharized",
      });
    }
    else{
      res.status(201).send({
        status:"sucess",
        message:"Get quiz success",
        data:{
          result
        }
        });
    }
  }catch(err){
    res.send({
    status:"fail",
    message:"something went wrong"
    });
  }
  
};


const updateQuiz = async (req, res) => {
  try {
    const id = req.body._id;
    const result = await quiz.findById(id);

    if (!result) {
      return res.status(404).send({
        status: "fail",
        message: "quiz not found",
      });
    }

    if(req.userId!==result.is_createdby.toString()){
      return res.status(200).send({
        status: "fail",
        message: "You are not autharized",
      });
    }
    if(result.is_published==true){
     return res.send({
        status: "fail",
        message: "You can not Update publish quiz",
      });
    }

    result.name = req.body.name;
    result.questions_list = req.body.questions_list;
    result.answers = req.body.answers;
    await result.save();

   return res.status(200).send({
      status: "success",
      message: "quiz updated successfully",
    });
  } catch (err) {
    console.error(err);
   return res.status(500).send({
      status: "fail",
      message: "something went wrong",
    });
  }
};

   

 const deleteQuiz=async(req,res)=>{
  try{ 
    const id=req.params.quizId;
   const result=await quiz.findById(id);

   if(req.userId!==result.is_createdby.toString()){
    res.status(200).send({
      status: "fail",
      message: "You are not autharized",
    });
  }


   await quiz.findByIdAndDelete(id);
   res.status(200).send({
    status: "success",
    message: "quiz deleted successfully",
  });

  }catch(err){
    console.error(err);
    res.status(500).send({
      status: "fail",
      message: "something went wrong",
    });
  }
 };
 const publishQuiz=async(req,res)=>{

  try{
    const id=req.body.quizId;
    
    const result=await quiz.findById(id);

  
    if (!result) {
      return res.status(404).send({
        status: "fail",
        message: "quiz not found",
      });
    }
    else{
      result.is_published=true;
      await result.save();
      res.status(200).send({
        status: "success",
        data:{
          result
        }
      });
    }
  }catch(err){
    console.error(err);
    res.status(500).send({
      status: "fail",
      message: "something went wrong",
    });
  }
  
 }


module.exports={createQuiz,getQuiz,updateQuiz,deleteQuiz,publishQuiz};