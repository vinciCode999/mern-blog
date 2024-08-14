import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import bodyParser from 'body-parser';
import cors from 'cors'
dotenv.config()

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined
const mongodbUri = process.env.MONGODBURI;

app.use(cors())
app.use(bodyParser.json())  
app.use(express.urlencoded({extended: false}))
app.use('/api/user',userRouter)
app.use('/api/auth', authRouter)

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

  app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';

    res.status(statusCode).json({
      success: false,
      statusCode,
      message
    })
  })
