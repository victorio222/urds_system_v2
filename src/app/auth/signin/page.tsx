'use client'
import React, { useState } from 'react';
import FormInput from '@/component/ui/FormInput';
import Link from 'next/link';
import FormButton from '@/component/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-200 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Welcome back</h2>
        <p className='text-center text-gray-700 text-sm mb-4'>Signin to your account</p>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className='text-right'>
            <Link
              href='/auth/forgot-password'
              className='text-green-400 text-xs'>
              Forgot Password?
            </Link>
          </div>

          <FormButton
            type='submit'
            className="text-sm w-full py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition mt-4"
          >
              Sign in
          </FormButton>

          <p className='text-center mt-3 text-xs text-gray-400 mb-[-12px]'>Don't have an account? <a href="/auth/signup" className='text-green-400'>Sign up</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
