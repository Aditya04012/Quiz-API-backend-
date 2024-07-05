require('dotenv').config({ path: './config.env' });

const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute.js'); // Ensure this path is correct
const AuthRouter=require('./routes/AuthRoute.js');
const quizRouter=require("./routes/quizRoutes.js");
const examRouter=require("./routes/examRoutes.js");
const { default: mongoose } = require('mongoose');

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use(express.json());
//middleware
app.use('/user', userRouter); // Ensure this is using the correct variable
app.use('/user',AuthRouter);
app.use('/quiz',quizRouter);
app.use('/exam',examRouter);



const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
  console.log("DB connected");
});



app.listen(3000,()=>{
    console.log('server is live at port 3000');
});