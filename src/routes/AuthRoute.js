const express=require('express');
const router=express.Router();
const {registerUser,loginUser}=require('./../conrollers/Authcontroller');

router.post('/', registerUser);
router.post('/login',loginUser)

module.exports = router;