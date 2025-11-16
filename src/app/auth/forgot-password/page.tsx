'use client'
import React, { useState } from "react";
import FormButton from "@/component/ui/Button";
import FormInput from "@/component/ui/FormInput";

const ForgotPassPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-200 to-green-500">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-left mb-6 text-gray-700">Reset Your Password</h2>

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Enter your email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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

                    <FormButton
                        type='submit'
                        className="text-sm w-full py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition mt-4"
                    >
                        Click here
                    </FormButton>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassPage;