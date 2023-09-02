'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('');
  async function logout() {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successfull');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  async function getUserDetails() {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  }

  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className='p-1 rounded bg-slate-800'>
        {data === '' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        GetUser Details
      </button>
    </div>
  );
}
