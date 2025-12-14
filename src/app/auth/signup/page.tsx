"use client";

import React, { useState } from "react";
// Assuming you have FormInput and FormField components that handle internal width
import FormInput from "@/component/ui/GreyInput"; 
import FormButton from "@/component/ui/Button";
import FormField from "@/component/ui/Greyfield";
import NextImage from "next/image";
import Link from "next/link"; // Added Link for better routing

import illustrationSrc from "@/assets/images/loginpage.png";
import Image from "@/assets/images/logo.png";
import { Divider } from "@mui/material";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffixName: "",
    gender: "", // Note: This state is currently unused; 'role' state is used for the select fields.
    email: "",
    phoneNum: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "password") {
      // Basic validation: at least 8 characters
      setIsPasswordValid(value.length >= 8);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    // Note: If you need to store gender in formData, you should update that state here.
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData, role });
    // Add logic for sign up here (API call, etc.)
  };

  // Select field options
  const rolegender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  const roleOptions = [
    { value: "urds-staff", label: "URDS Staff" },
    { value: "dean", label: "Dean" },
    { value: "faculty", label: "Faculty Research" },
    { value: "research-evaluator", label: "Research Evaluator" },
  ];
  
  // Password strength indicator color
  const color = isPasswordValid
    ? "text-blue-500 bg-blue-500" // Green/Blue for valid
    : "text-gray-500 bg-gray-500"; // Gray for invalid

  return (
    // 1. Outer Container: Flex, Full Screen Height, no padding/margin
    <div className="flex min-h-screen">
      
      {/* 2. Left Panel: Form Container 
          - md:w-1/2: Takes half width on desktop
          - w-full: Takes full width on mobile
      */}
      <div 
        className="
          flex flex-col p-8 md:p-10 lg:p-16 
          w-full md:w-1/2 min-h-screen md:min-h-0 
          bg-white shadow-xl md:shadow-none
        "
      >
        <div className="max-w-full mx-auto md:mx-0 w-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-700">
              Welcome to University Research and Development Services Portal!{" "}
            </h2>
            <p className="text-gray-500 text-sm mb-1">Create an account</p>
            <Divider />

            <form onSubmit={handleSubmit} className="mt-5 space-y-1">
                
                {/* Name Fields (2 Columns on Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                    />
                    <FormInput
                      label="Middle Name"
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      placeholder="Enter your middle name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                    <FormInput
                      label="Suffix Name"
                      type="text"
                      name="suffixName"
                      value={formData.suffixName}
                      onChange={handleInputChange}
                      placeholder="e.g., Jr., Sr."
                    />
                </div>

                {/* Contact and Gender (2 Columns on Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                    <FormField
                      label="Sex"
                      // NOTE: Using 'role' state for gender here based on your original code, 
                      // but it might be better practice to use a separate state like 'gender'.
                      value={role} 
                      onChange={handleSelectChange} 
                      options={rolegender}
                      required
                    />
                </div>

                {/* Role/Position (Full Width) */}
                <FormField
                  label="Role / Position"
                  value={role}
                  onChange={handleSelectChange}
                  options={roleOptions}
                  required
                />

                {/* Password Fields (2 Columns on Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      required
                    />
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
                
                {/* Password Strength Indicator */}
                <div className="flex items-center mt-2">
                    <span 
                      className={`w-3 h-3 rounded-full mr-2 inline-block ${color}`} 
                      // Removed unnecessary text- and bg- classes from the span since we use the background color for the dot
                    ></span>
                    <p className="text-xs text-gray-600">
                        Use 8 or more characters
                    </p>
                </div>
                
                {/* Terms and Policy */}
                <p className="mt-3 text-xs text-black pt-2">
                  By creating an account, you agree to the Terms of use and Privacy
                  Policy.{" "}
                </p>

                <FormButton
                  type="submit"
                  className="text-sm w-full md:w-[40%] py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition mt-4"
                >
                  Sign up
                </FormButton>

                <p className="mt-3 text-xs text-black pt-1">
                  Already have an account?{" "}
                  <Link href="/urds/auth/login" className="text-blue-500 hover:underline">
                    Sign in
                  </Link>
                </p>
            </form>
        </div>
      </div>
      
      {/* 3. Right Panel: Illustration Container (Hidden on Mobile, w-1/2 on Desktop) 
          - flex-grow: Ensures it fills the remaining height.
          - md:w-1/2: Takes half width on desktop
      */}
      <div
        className="
          hidden md:flex flex-col items-center justify-center 
          bg-[#e9e9e9] md:w-1/2 p-10 lg:p-16 
          text-[#666666]
        "
      >
        <div className="absolute top-0 right-0 p-6 flex items-center">
            <h2 className="text-xl md:text-3xl lg:text-4xl pr-3 font-semibold text-[#462f99]">
              UEP-URDS
            </h2>
            <NextImage
              src={Image}
              alt="UEP Logo"
              className="h-10 w-10 object-contain"
            />
        </div>

        <div className="mt-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">URDS PORTAL</h2>
            <p className="text-md text-[#666666] max-w-xs mx-auto">
              Your research journey starts here.
            </p>

            <NextImage
              src={illustrationSrc}
              alt="Research Illustration"
              className="mt-8 h-60 w-60 md:h-80 md:w-80 object-contain mx-auto"
            />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;