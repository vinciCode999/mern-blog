import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInSuccess, signInFailure, resetError } from '../app/user/userSlice';
import { Oauth } from '../layouts';

export default function Signin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const {loading, error: errorMessage} = useSelector(state=>state.user)


  useEffect(()=>{
    dispatch(resetError())
  },[dispatch])
  
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleSubmit = async (e) => {
    dispatch(signInStart())
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('please fill all fields'))
    }
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        return dispatch(signInFailure(data.message))
      }else{
        // handle successful signup (e.g., redirect, show success message)
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Alerta
            </span>
            Viva
          </Link>
          <p className='text-sm mt-5'>
            Mantente seguro con AlertaViva. Regístrate para recibir alertas en tiempo real y actualizaciones esenciales adaptadas a tu área. Mantente informado y preparado durante emergencias con nuestra información oportuna. Regístrate ahora y mantente conectado cuando más lo necesites.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
            </div>

            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='********' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm"/>
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Signin'
              )}
            </Button>
            <Oauth/>
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span className='text-sm text-gray-500'>do not have an account?</span>
            <Link className='text-blue-500' to='/sign-up'>
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
