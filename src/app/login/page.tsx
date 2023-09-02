'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios, { Axios } from 'axios';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/login', user);

      console.log('Login Success', response.data);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log('Login failed', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(
    function () {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    },
    [user]
  );
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl'>{isLoading ? 'Loading...' : 'Login'}</h1>
      <hr />

      <label htmlFor='email'>email</label>
      <input
        className='p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='text'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        className='p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='password'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />

      <button
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        Login here
      </button>

      <Link href='/signup'>Visit signup page</Link>
    </div>
  );
}