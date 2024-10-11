import User from './../models/user.model.js'
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcrypt'

const test = (req, res)=>{
  res.json({message: "test api working!"})
}

const updateUser =async(req, res, next)=>{
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403, 'Failed to update User'))
  }
  if(req.body.password){
    if(req.body.password.length < 6){
      console.log(req.body.password)
      return next(errorHandler(400, 'password should be atleast 6 characters long'))
    }
    req.body.password = await bcrypt.hash(req.body.password,10)
  }

  if(req.body.username){
    if(req.body.username.length < 3 || req.body.username.length > 20){
      return next(errorHandler(400, 'username must be between 3 and 20 characters'))
    }

    if(req.body.username.includes(' ')){
      return next(errorHandler(400, 'username must not include spaces.'))
    }

    if(req.body.username !== req.body.username.toLowerCase()){
      return next(errorHandler(400, 'username must be in lowercase'))
    }

    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400, 'username can only contain letters and numbers'))
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password
        }
      }, {new: true})

      const {password, ...rest} = updatedUser._doc;
      res.status(200).json(rest)

      console.log(updatedUser)
    } catch (error) {
      next(error)
    }
  
  }

  console.log('req.user: ', req.user)
  console.log(req.params)
}

const deleteUser = async(req, res, next)=>{
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403, "you can not delete this User"))
  }
  try{
    const userToBeDeleted = await User.findOne({_id: req.params.userId})
    if(!userToBeDeleted){
      return next(errorHandler(404, "user not found"))
    }
    await User.findByIdAndDelete({_id: req.params.userId})
    res.status(200).json("user deleted")
  }catch(error){
    next(error)
  }
}
export {test, updateUser, deleteUser}