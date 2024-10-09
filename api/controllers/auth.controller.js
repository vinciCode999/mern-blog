import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs' //bcryptjs is compatible for deployment
import { errorHandler } from "../utils/error.js"; 
import jwt from 'jsonwebtoken'
import { trusted } from "mongoose";

export const signup = async(req, res, next)=>{
  try{
      const {username, email, password} = req.body;
      if(!username || !email || !password
          || username.length === "" 
          || email.length === "" 
          || password.length === ""
      ){
        return next(errorHandler(400, "all fields are required!"))
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
    return next(error)
  }
}

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, "email or password incorrect"));
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(404, "email or password incorrect"));
    }

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
    const {password: pass, ...rest} = user._doc
    res.status(200).cookie('access_token', token, {httpOnly: true})
    .json(rest)
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async(req, res, next)=>{
  try {
    const {email, name, googlePhotoUrl} = req.body
    const user = await User.findOne({email})
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      const {password, ...rest} = user._doc
      res.status(200).cookie("access-token", token, {
        httpOnly: true
      }).json(rest)
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + 
      Math.random().toString(36).slice(-8)
  

      const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
      const newUser = new User({
        username: name.toLowerCase().split(' ').join("") + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      });

      await newUser.save()
      const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET)
      const {password, ...rest} = newUser._doc
      return res.status(200).cookie("access_token", token, {
        httpOnly: true
      }).json(rest)
    }

  } catch (error) {
    next(error)
  }
}