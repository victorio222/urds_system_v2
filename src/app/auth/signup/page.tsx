'use client';

import React, { useState } from 'react';
import FormInput from '@/component/ui/FormInput';
import FormButton from '@/component/ui/Button';

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-200 to-green-500">
            <div className="m-10 bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">Create Account</h2>
                <p className="text-center text-gray-700 text-sm">Sign up to get started</p>

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
                            label="Last Name"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className='flex justify-between'>
                        <FormInput
                            label="Middle Name"
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                            placeholder="Enter your middle name"
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
                    <FormInput
                        label="Gender"
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        placeholder="Enter your gender"
                        required
                    />
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
                        <FormInput
                            label="Phone Number"
                            type="tel"
                            name="phoneNum"
                            value={formData.phoneNum}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
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

                    <FormButton
                        type='submit'
                        className="text-sm w-full py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition mt-4"
                    >
                        Sign up
                    </FormButton>

                    <p className='text-center mt-3 text-xs text-gray-400 mb-[-12px]'>Already have an account? <a href="/auth/signin" className='text-green-400'>Sign in</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
