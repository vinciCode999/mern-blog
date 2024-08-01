import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
dotenv.config()


const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined
const mongodbUri = process.env.MONGODBURI;
app.use('/api/user',userRouter)

mongoose.connect(mongodbUri)
  .then(()=>{
    console.log('mongodb connected successfully')
    app.listen(port, ()=>{
      console.log(`server listening on port ${port}`)
    })
  })
  .catch((error)=>{
    console.log(error)
  })

