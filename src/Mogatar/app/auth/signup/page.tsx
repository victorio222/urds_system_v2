'use client';

import React, { useState } from 'react';
import FormInput from '@/Mogatar/component/GreyInput';
import FormButton from '@/component/ui/Button';
import FormField from '@/Mogatar/component/Greyfield';
import NextImage from 'next/image';
import illustrationSrc from '@/assets/images/loginpage.png'; 
import Image from '@/assets/images/logo.png';


const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        suffixName: '',
        gender: '',
        email: '',
        phoneNum: '',
        password: '',
        confirmPassword: '',
    });
    const [role, setRole] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false); // New state for password strength
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "password") {
            setIsPasswordValid(value.length >= 8);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };
    const rolegender = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'others', label: 'Others' },
    ];
    const roleOptions = [
        { value: 'urds-staff', label: 'URDS Staff' },
        { value: 'dean', label: 'Dean' },
        { value: 'faculty', label: 'Faculty Research' },
        { value: 'research-evaluator', label: 'Research Evaluator' },
    ];
    const color = isPasswordValid ? 'text-blue-500 bg-blue-500' : 'text-gray-500 bg-gray-500';
    return (
        <div className="relative flex bg-white">
            <div className=" flex-col m-10  bg-white p-[115px] rounded-lg  max-w-[900px] w-full">
                <h2 className="text-3xl font-semibold  mb-6 text-gray-700">Welcome to University Research and
                    Development Services Portal!  </h2>
                <p className=" text-gray-700 text-sm">Create an account</p>

                <form onSubmit={handleSubmit} className='mt-5'>
                    <div className='flex justify-between'>
                        <FormInput
                            label="First Name"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            required
                        />
                        <div className='pr-4'></div>
                        <FormInput
                            label="Middle Name"
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                            placeholder="Enter your middle name"
                        />
                    </div>
                    <div className='flex justify-between'>
                        <FormInput
                            label="Last Name"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            required
                        />
                        <div className='pr-4'></div>
                        <FormInput
                            label="Suffix Name"
                            type="text"
                            name="suffixName"
                            value={formData.suffixName}
                            onChange={handleInputChange}
                            placeholder="Enter your suffix (e.g., Jr., Sr.)"
                        />
                    </div>
                    <div className='flex justify-between'>
                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                        <div className='pr-4'></div>
                        <FormField
                            label="Sex"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            options={rolegender}
                            required
                        />
                    </div>
                    <div className='pr-4'></div>
                    <FormField
                        label="Role / Position"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        options={roleOptions}
                        required
                    />
                    <div className='flex justify-between'>
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a strong password"
                            required
                        />
                        <div className='pr-4'></div>
                        <FormInput
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="flex items-center mb-1">
                        <span className={`w-3 h-3 rounded-full  ${color}`}>
                            <p className="text-xs pl-4 w-[200px] flex ">Use 8 or more characters</p>
                        </span>
                    </div>
                    <p className='mt-3 text-xs text-black p-2'>By creating an account, you agree to the Terms of use and Privacy Policy. </p>

                    <FormButton
                        type='submit'
                        className="text-sm w-[40%] py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition mt-4"
                    >
                        Sign up
                    </FormButton>

                    <p className=' mt-3 text-xs text-black mb-[-12px] p-1 '>Already have an account? <a href="/urds/auth/signin" className='text-blue-500'>Sign in</a></p>
                </form>
            </div>
            <div className=" bg-[#e9e9e9]  w-full 
       text-[#666666] hidden md:flex flex-col items-center    
       shadow-[1px_4px_10px_rgba(0,0,0,0.3)]">
                <div className="relative flex justify-center items-center pl-140 pt-5 mb-30">
                <h2 className="text-4xl pr-3 font-semibold  mb-2 text-[#190072]">
                    UEP-URDS
                </h2>
                    <NextImage src={Image} alt="UEP Logo" className="h-23 w-23 object-contain" />
                </div>


                <h2 className="text-3xl font-bold mb-2 text-center">
                    URDS PORTAL
                </h2>
                <p className="text-sl text-[#666666] max-w-xs text-center">
                    Your research journey starts here.
                </p>

                {/* Illustration placeholder */}
                <NextImage src={illustrationSrc} alt="Research Illustration" className="mt-8 h-40 w-40 md:h-120 md:w-120 object-contain" />
            </div>
        </div>


    );
};

export default SignupPage;
