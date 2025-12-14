"use client";
import React, { useState } from "react";
import FormButton from "@/component/ui/FormButton"; 
import FormInput from "@/component/ui/FormInput";
import Link from "next/link";
// import { sendPasswordResetLink } from "@/utils/apiHelpers";

const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(null);

    // --- Standard Forgot Password Implementation (Simulated API Call) ---
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (email.includes("@") && email.length > 5) {
      setMessage(
        "A password reset link has been sent to your email address. Please check your spam folder."
      );
      setError(null);
      setEmail("");
    } else {
      setError("Please enter a valid email address.");
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="bg-white p-8 shadow-sm max-w-md w-full border border-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-4 text-slate-700">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit}>
          {/* NEW: ALERT BOX FOR SUCCESS MESSAGE 
            Tailwind classes for a Bootstrap success alert:
            - bg-green-100/70 for light background
            - border-green-400 for left border
            - text-green-700 for text color
          */}
          {message && (
            <div 
              className="bg-green-100/70 border-l-4 border-green-400 text-green-700 p-4 mb-4 rounded-md"
              role="alert"
            >
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {/* NEW: ALERT BOX FOR ERROR MESSAGE 
            Tailwind classes for a Bootstrap danger alert:
            - bg-red-100/70 for light background
            - border-red-400 for left border
            - text-red-700 for text color
          */}
          {error && (
            <div 
              className="bg-red-100/70 border-l-4 border-red-400 text-red-700 p-4 mb-4 rounded-md"
              role="alert"
            >
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g., yourname@uep.edu.ph"
            required
          />

          <FormButton
            type="submit"
            className="text-sm w-full py-3 bg-blue-500 text-white rounded-[10px] hover:bg-blue-600 transition mt-6"
            disabled={loading}
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </FormButton>
        </form>

        <div className="text-center mt-4">
          <Link
            href="/auth/login"
            className="text-xs text-blue-400 hover:text-blue-500"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;