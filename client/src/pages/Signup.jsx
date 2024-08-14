import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      // handle successful signup (e.g., redirect, show success message)
      navigate('/sign-in')
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
              <Label value='Your Username' />
              <TextInput type='text' id='username' placeholder='username' onChange={handleChange} />
            </div>

            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
            </div>

            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='password' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm"/>
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Signup'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span className='text-sm text-gray-500'>You have an account?</span>
            <Link className='text-blue-500' to='/sign-in'>
              Sign In
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
  );
}
