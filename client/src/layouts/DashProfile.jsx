import React, { useEffect, useRef, useState } from 'react'
import { TextInput, Button, Alert } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from './../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess } from '../app/user/userSlice.js';


export default function DashProfile() {
  const filePickerRef = useRef()
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const {currentUser} = useSelector(state=>state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        setImageFileUploadError('File must be less than 2MB');
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
        return;
      }
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if(Object.keys(formData).length === 0){
      setUpdateUserError("no changes made!")
      return
    }

    if(imageFileUploading){
      setUpdateUserError("please wait for image to upload")
      return
    }

    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("user's profile updated successfully")
      }
      console.log(data)
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }    
  }

  useEffect(()=>{
    if(imageFile){
      uploadImage()
    }
  }, [imageFile])

  const handleTextInput = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const uploadImage = async()=>{
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read, 
    //       write: if
    //         request.resource.size < 2 * 1024 * 1024 &&
    //         request.resource.contentType.matches('image/.*')
          
    //     }
    //   }
    // }
    setImageFileUploading(true)
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error)=>{
        setImageFileUploadError(`could not upload image ${error.message}`)
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      ()=>{
         getDownloadURL(uploadTask.snapshot.ref)
         .then((downloadUrl)=>{
          setImageFileUrl(downloadUrl)
          setFormData({...formData, profilePicture: downloadUrl})
         });
         setImageFileUploading(false)
      }
    )
  }

  return (
  <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 font-semibold text-3xl text-center'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
      <div 
        className='relative h-32 w-32 self-center rounded-full 
          cursor-pointer shadow-md overflow-hidden
        '
        onClick={()=>filePickerRef.current.click()}
        >
          {
            imageFileUploadProgress && (
              <CircularProgressbar 
                value={imageFileUploadProgress || 0 } 
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  },
                  path: {
                    stroke: `rgba(62,152,199, ${imageFileUploadProgress/100})`
                  }
                }
                }
              />
            )
          }
          <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt="user profile picture"
            className={`rounded-full h-full w-full object-cover border-[lightgray] border-8 
              ${imageFileUploadProgress  && imageFileUploadProgress < 100 && 'opacity-60'}`}          
            
            />
      </div>
      {
        imageFileUploadError && 
        <Alert color="failure">
          {imageFileUploadError}
        </Alert>
      }
      <TextInput 
        type="text" 
        placeholder='username' 
        id="username" 
        name="username"
        onChange={handleTextInput}
        defaultValue={currentUser.username}/>

      <TextInput 
        type="text" 
        placeholder='email' 
        id="email" 
        name="email"
        onChange={handleTextInput}
        defaultValue={currentUser.email}/>

      <TextInput 
        type="password" 
        id="password"
        name="password" 
        onChange={handleTextInput}
        placeholder='password'/>

      <Button type="submit" gradientDuoTone="purpleToBlue" outline>
        Update
      </Button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-600 cursor-pointer'>Delete account</span>
      <span className='text-red-600 cursor-pointer'>Sign Out</span>
    </div>
    {
      updateUserSuccess && (
        <Alert color="success" className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )
    }

    {
      updateUserError && (
        <Alert color="failure" className='mt-5'>
          {updateUserError}
        </Alert>
      )
    }
 </div>
 )
    
}
