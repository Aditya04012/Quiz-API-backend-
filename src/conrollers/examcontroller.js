
const quiz=require("./../models/quizModel");
const exam=require("./../models/examModel");
const startExam=async(req,res)=>{
    try{
        const result=await quiz.findById(req.params.quizId);
        if(!result){
            res.send({
                status:"fail",
                message:"quiz not found"
                });
        }
        if(!result.is_published){
            res.send({
                status:"fail",
                message:"quiz is Not published"
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
}
const submitExam=async(req,res)=>{


    try{
        const id=req.body.quizId;
        const attempted_question=req.body.attempted_question;
      
        const Quiz=await quiz.findById(id);
        const answers=Quiz.answers;
      
        const quizId=id;
        const userId=req.userId;//from authentication controller
        const allQuestion=Object.keys(answers);
        const total=allQuestion.length;
        let score=0;

        for(let i=0;i<total;i++){
            let no=allQuestion[i];
            if(attempted_question[no] &&attempted_question[no]===answers[no] ){
                score++;
            }
        }
      
        const result=await exam.create({userId,quizId,score,total});
      const data=  await result.save();
   
    res.json({ score ,total,resultId:data._id});
    }catch(err){
        res.send({
            status:"fail",
            message:"something went wrong"
            });
    }

}
const getresult=async(req,res)=>{
   try{
    const userId=req.params.userId;
    const result=await exam.findOne({userId:userId});
    console.log(result)
    if(!result){
       return res.send({
            status:"fail",
            message:"quiz not found"
         });
    }
    res.send({
        "status":"Sucsess",
        data:{
           "quizId": result.quizId,
           "userId":result.userId,
           "Score":result.score,
           "total question":result.total

        }
    });
   }catch(err){
    res.send({
        status:"fail",
        message:"something went wrong"
        });
   }
   
};

module.exports={startExam,submitExam,getresult};