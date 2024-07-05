const express=require("express");
const {createQuiz,getQuiz,updateQuiz,deleteQuiz,publishQuiz}=require("./../conrollers/quizcontroller")
const router=express.Router();
const {isAuthenticated}=require('./../middlewares/isAuth');
//create quiz 
router.post("/",isAuthenticated,createQuiz);



//get request with id with id 
router.get('/:quizId',isAuthenticated,getQuiz);

//update quiz
router.put('/',isAuthenticated,updateQuiz);

// delete quiz
router.delete("/:quizId",isAuthenticated,deleteQuiz);

//publish (attempt quiz)
router.patch("/publish",isAuthenticated,publishQuiz);


module.exports=router;