const express=require('express');
const router=express.Router();
const {getUser,updateUser}=require('./../conrollers/usercontroller');
const {isAuthenticated}=require('./../middlewares/isAuth');

router.get('/:userId',isAuthenticated,getUser);
router.patch('/:userId',isAuthenticated,updateUser);
module.exports = router;