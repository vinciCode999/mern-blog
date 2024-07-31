import { Button, Label, TextInput } from 'flowbite-react'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'


export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e)=>{
    setFormData((prev)=>({...prev, [e.target.id]: e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log(data)
    }catch(error){
      console.log(error)
    }
  
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row
        md:items-center gap-5
      ">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className='font-bold
          dark:text-white text-4xl'>
            <span className='px-2 py-1 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
            text-white
          '>Alerta</span>
          Viva
        </Link>
        <p className='text-sm mt-5'>
          Mantente seguro con AlertaViva. 
          Regístrate para recibir alertas en tiempo real y actualizaciones esenciales adaptadas a tu área. 
          Mantente informado y preparado durante emergencias con nuestra información oportuna. 
          Regístrate ahora y mantente conectado cuando más lo necesites.
        </p>
      </div>

        {/* right */}
        <div className="flex-1">
          <form className='flex  flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username"/>
              <TextInput
                type="text"
                id="username"
                placeholder='username'
                onChange={handleChange}
              /> 
            </div>

            <div>
              <Label value="Your Email"/>
              <TextInput 
                type='email'
                placeholder='name@company.com'
                id="email"
                onChange={handleChange}
              /> 
            </div>

            <div>
              <Label value="Your Password"/>
              <TextInput
                type="password"
                placeholder='password'
                id="password"
                onChange={handleChange}
              /> 
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span className='text-sm text-gray-500'>You have an accont?</span>
            <Link className='text-blue-500' to="/sign-in">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
