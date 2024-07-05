const express=require("express");
const router=express.Router();
const {startExam,submitExam,getresult}=require("./../conrollers/examcontroller")
const {isAuthenticated}=require('./../middlewares/isAuth');
router.get("/:quizId",isAuthenticated,startExam);
router.post("/",isAuthenticated,submitExam);

router.get("/result/:userId",isAuthenticated,getresult);

module.exports=router;