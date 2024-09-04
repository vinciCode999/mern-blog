import React from 'react'
import {Button} from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../app/user/userSlice'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'


function Oauth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = getAuth(app)
  const handleGoogleClick = async()=>{
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt: "select_account"})
  
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle)
      const res = await fetch('/api/auth/google', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL
        }),
      }) 
      const data = await res.json()
      console.log(data)
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }

  }
  return (
    <Button className="" gradientDuoTone="pinkToOrange" onClick={handleGoogleClick} outline>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      Continue with google
    </Button>
  )
}

export default Oauth