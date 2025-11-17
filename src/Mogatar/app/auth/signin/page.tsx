'use client'
import React, { useState } from 'react'
import FormInput from '@/Mogatar/component/FormInput'
import Link from 'next/link'
import FormButton from '@/component/ui/Button'
import Image from '@/assets/images/logo.png'
import NextImage from 'next/image'
import illustrationSrc from '@/assets/images/loginpage.png'
import FormField from '@/Mogatar/component/Formfield'



const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password, role })
  }
   const roleOptions = [
    { value: 'urds-staff', label: 'URDS Staff' },
    { value: 'dean', label: 'Dean' },
    { value: 'faculty', label: 'Faculty Research' },
    { value: 'research-evaluator', label: 'Research Evaluator' },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="relative z-10 bg-white p-8  rounded-4xl shadow-[10px_4px_10px_rgba(0,0,0,0.3)] max-w-[500px] w-full ">
        <div className="flex justify-center mb-1">
          <NextImage src={Image} alt="UEP Logo" className="h-16 w-16 object-contain" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-6 text-[#190072]">
          University of Eastern Philippines
        </h2>

        <form onSubmit={handleSubmit} >
          <FormInput   
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            
          />

      <FormField
        label="Role/ Position"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        options={roleOptions}
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


          <div className="text-right -mt-2">
            <Link href="/auth/forgot-password" className="text-blue-400 text-xs">
              Forgot Password?
            </Link>
          </div>

          <FormButton
            type="submit"
            className="text-sm w-full py-2 bg-blue-500 text-white rounded-[10px] hover:bg-blue-600 transition mt-4"
          >
            Sign in
          </FormButton>

          <p className="text-center mt-3 text-xs text-gray-400 mb-[-12px]">
            Don't have an account? <Link href="/auth/signup" className="text-blue-400">Sign up</Link>
         
          </p>
        </form>
      </div>
      <div className="relative inset-x-[-50] bg-[#4267FF] h-[500px] w-[28%] rounded-4xl
       text-white hidden md:flex flex-col items-center justify-center px-8 py-10 md:px-12 
       shadow-[1px_4px_10px_rgba(0,0,0,0.3)]">

            <h2 className="text-2xl font-semibold mb-2 text-center">
              URDS PORTAL
            </h2>
            <p className="text-sm text-blue-100 max-w-xs text-center">
              Your research journey starts here.
            </p>

            {/* Illustration placeholder */}
            <NextImage src={illustrationSrc} alt="Research Illustration" className="mt-8 h-40 w-40 md:h-70 md:w-70 object-contain" />
          </div>
      </div>
    
    
  )
}

export default LoginPage
