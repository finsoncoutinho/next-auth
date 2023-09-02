'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(
    function () {
      if (
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.username.length > 0
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    },
    [user]
  );

  const onSignup = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post('/api/users/signup', user);
      console.log('Signup Success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl'>{isLoading ? 'Loading...' : 'Signup'}</h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input
        className='p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='text'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
      />
      <label htmlFor='email'>email</label>
      <input
        className='p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='text'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type='password'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />

      <button
        onClick={onSignup}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? 'no signup' : 'signup now'}
      </button>

      <Link href='/login'>Visit login page</Link>
    </div>
  );
}
