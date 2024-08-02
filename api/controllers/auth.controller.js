import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs' //bcryptjs is compatible for deployment
import { errorHandler } from "../utils/error.js";

export const signup = async(req, res, next)=>{
  try{
      const {username, email, password} = req.body;
      if(!username || !email || !password
          || username.length === "" 
          || email.length === "" 
          || password.length === ""
      ){
        next(errorHandler(400, "all fields are required!"))
      }

      const hashedPassword = bcryptjs.hashSync(password, 10)
    
      const newUser = new User({
        username,
        email,
        password:hashedPassword
      })
    
      await newUser.save()
      res.json("signup successful")
  }catch(error){
    next(error)
  }
}

