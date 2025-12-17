// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import NextImage from "next/image";

// // 1. IMPORT DYNAMIC AUTH CONTEXT
// import { useAuth, UserRole } from "@/context/AuthContext";

// // 2. IMPORT API HELPERS (Assume these are wrapper functions/hooks now)
// import { login as apiLogin, getRoles as apiGetRoles } from "@/utils/apiHelpers";

// // --- Assuming these components exist for UI/Styling ---
// import FormInput from "@/component/ui/FormInput";
// import FormButton from "@/component/ui/FormButton";
// import FormField from "@/component/ui/Formfield";
// import Image from "@/assets/images/logo.png";
// import URDS from "@/assets/images/urds.png";
// import illustrationSrc from "@/assets/images/loginpage.png";
// import { ErrorOutline } from "@mui/icons-material";

// // Define a structure for the role option
// interface RoleOption {
//   value: string; // The ID of the role (role_id.toString())
//   label: string; // The Name of the role (role_name)
//   role_name: string; // The name string needed for the login payload AND context
// }

// const LoginPage = () => {
//   // --- HOOKS & CONTEXT ---
//   const router = useRouter();
//   const { isAuthenticated, isAuthenticatedChecked, contextLogin } = useAuth();

//   // --- STATE ---
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [roleId, setRoleId] = useState<string>(""); // Stores the selected role's ID (value)
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleOptions, setRoleOptions] = useState<RoleOption[]>([]);
//   const [isRoleLoading, setIsRoleLoading] = useState(true);

//   // --- SOLUTION: SAFE REDIRECTION GUARD IN useEffect ---
//   useEffect(() => {
//     // Only attempt navigation if we have completed the auth check
//     if (isAuthenticatedChecked && isAuthenticated) {
//       console.log(
//         "🧭 [Guard] User authenticated. Redirecting to /urds/dashboard."
//       );
//       router.replace("/dashboard");
//     }
//   }, [isAuthenticatedChecked, isAuthenticated, router]); // Dependency array ensures it re-runs when these values change

//   // --- FETCH ROLES EFFECT ---
//   const fetchRoles = useCallback(async () => {
//     setIsRoleLoading(true);
//     try {
//       const response = await apiGetRoles();
//       const roles = response.data;

//       const options: RoleOption[] = roles.map((role: any) => ({
//         value: role.role_id.toString(),
//         label: role.role_name,
//         role_name: role.role_name,
//       }));

//       setRoleOptions(options);

//       // ensure placeholder shows after load
//       setRoleId("");
//     } catch (err) {
//       console.error("Failed to fetch roles", err);
//       setError("Failed to load roles. Please try refreshing the page.");
//     } finally {
//       setIsRoleLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchRoles();
//   }, [fetchRoles]);

//   // --- SUBMISSION HANDLER ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const selectedRole = roleOptions.find((option) => option.value === roleId);

//     if (!selectedRole) {
//       setError("Please select a valid role/position.");
//       setLoading(false);
//       return;
//     }

//     const payload = {
//       email,
//       password,
//       role_name: selectedRole.role_name, // Send the name for backend lookup
//     };

//     console.log("👉 [DEBUG] Sending Login Payload:", payload);

//     try {
//       // -------------------------------------------------------------------
//       // ⚠️ CRITICAL CHANGE: The component no longer calls apiLogin directly.
//       // It calls contextLogin, which now contains the apiLogin logic.
//       // This simplifies the component and centralizes state management.
//       // -------------------------------------------------------------------
//       // 1. Execute API Login (Backend sets cookie)
//       const response = await apiLogin(payload);
//       // 2. Extract user object which contains the role_id
//       const { user } = response.data; // 3. Resolve the full role name using the role_id from the successful API response

//       const authenticatedRoleOption = roleOptions.find(
//         // Match the role_id (number) from the API response to the value (string) in options
//         (option) => option.value === user.role_id.toString()
//       );

//       const resolvedRoleName = authenticatedRoleOption?.role_name;

//       if (!resolvedRoleName) {
//         throw new Error(
//           "User role ID from API not found in frontend role mapping."
//         );
//       } // 4. Update Global State (Pass API data and resolved role name)

//       contextLogin({
//         user: user,
//       }); // 5. Redirection

//       // Use setTimeout to avoid race condition with context state update
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 0);
//     } catch (err: any) {
//       console.error("❌ [DEBUG] Login Failure:", err);

//       const statusCode = err.response?.status;
//       const apiErrorMessage = err.response?.data?.message;
//       let userMessage = "Login failed. Please check your email and password.";

//       if (statusCode === 401 || statusCode === 400) {
//         userMessage =
//           apiErrorMessage ||
//           "The email or password you entered is incorrect, or your account is inactive.";
//       } else if (!err.response) {
//         userMessage =
//           "Could not connect to the server. Please check your network connection.";
//       }

//       setError(userMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Render Loading State (before auth check or role fetch completes) ---
//   if (!isAuthenticatedChecked || isRoleLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="flex flex-col items-center">
//           {/* Spinner */}
//           <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//         </div>
//       </div>
//     );
//   }

//   // --- Render Login Form ---
//   return (
//     <div className="relative flex items-center justify-center min-h-screen p-4 bg-white">
//       <div className="w-full max-w-4xl bg-transparent md:grid md:grid-cols-2 md:min-h-[520px] md:max-w-[950px]">
//         {/* Form container */}
//         <div className="w-full h-full bg-white p-8 flex flex-col justify-center z-10 shadow-xl md:rounded-r-none md:mr-[-50px] md:relative md:shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
//           <div className="flex items-center justify-center">
//             <div className="flex ml-5 justify-center mb-2">
//               <NextImage
//                 src={Image}
//                 alt="UEP Logo"
//                 className="h-16 w-16 object-contain"
//               />
//             </div>
//             <div className="flex justify-center">
//               <NextImage
//                 src={URDS}
//                 alt="URDS Logo"
//                 className="h-31 w-31 object-contain"
//               />
//             </div>
//           </div>

//           <h2 className="text-xl font-semibold text-center mb-6 text-slate-700 hidden md:block">
//             University of Eastern Philippines
//           </h2>
//           <div className="block md:hidden text-center mb-6">
//             <h1 className="text-3xl font-bold text-slate-800">URDS PORTAL</h1>
//             <p className="text-xs text-gray-500">
//               Your research journey starts here.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* ALERT BOX FOR ERROR MESSAGE */}
//             {error && (
//               <div
//                 className="bg-red-100/70 border-l-4 border-red-400 text-red-700 p-3 mb-4 rounded-md"
//                 role="alert"
//               >
//                 <p className="text-sm text-left flex items-center">
//                   <span className="pr-2">
//                     <ErrorOutline className="h-5 w-5" />
//                   </span>
//                   {error}
//                 </p>
//               </div>
//             )}

//             <FormInput
//               label="Email"
//               type="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />

//             <FormField
//               label="Role/ Position"
//               value={roleId}
//               onChange={(e) => setRoleId(e.target.value)}
//               options={roleOptions}
//               placeholder="Select your role"
//               required
//             />

//             <FormInput
//               label="Password"
//               type="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />

//             <div className="text-right -mt-2">
//               <Link
//                 href="/auth/forgot-password"
//                 className="text-blue-400 text-xs hover:text-blue-500 transition"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             <FormButton
//               type="submit"
//               className="text-md uppercase w-full h-12 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-4"
//               disabled={loading || isRoleLoading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </FormButton>

//             <p className="text-center mt-3 text-xs text-gray-400 mb-[-12px]">
//               Don't have an account?{" "}
//               <Link
//                 href="/auth/signup"
//                 className="text-blue-400 hover:text-blue-500 transition"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </form>
//         </div>

//         {/* Illustration Panel */}
//         <div className="hidden md:flex relative bg-[#4267FF] text-white flex-col items-center justify-center px-8 py-10 md:px-12 md:rounded-l-none md:h-auto md:ml-[-50px] shadow-xl">
//           <div className="text-center">
//             <h2 className="text-4xl font-semibold">URDS PORTAL</h2>
//             <p className="text-sm text-blue-200 max-w-xs mx-auto">
//               Your research journey starts here.
//             </p>

//             <NextImage
//               src={illustrationSrc}
//               alt="Research Illustration"
//               className="mt-8 h-40 w-40 md:h-70 md:w-70 object-contain mx-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// 1. AUTH CONTEXT
import { useAuth } from "@/context/AuthContext";

// 2. API HELPERS
import { login as apiLogin, getRoles as apiGetRoles } from "@/utils/apiHelpers";

// 3. UI COMPONENTS
import FormInput from "@/component/ui/FormInput";
import FormButton from "@/component/ui/FormButton";
import FormField from "@/component/ui/Formfield";
import Image from "@/assets/images/logo.png";
import URDS from "@/assets/images/urds.png";
import illustrationSrc from "@/assets/images/loginpage.png";
import { ErrorOutline } from "@mui/icons-material";
import { Divider } from "@mui/material";

// ROLE OPTION INTERFACE
interface RoleOption {
  value: string;
  label: string;
  role_name: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAuthenticatedChecked, contextLogin } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([]);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  // REDIRECT IF ALREADY AUTHENTICATED
  useEffect(() => {
    if (isAuthenticatedChecked && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticatedChecked, isAuthenticated, router]);

  // FETCH ROLE OPTIONS
  const fetchRoles = useCallback(async () => {
    setIsRoleLoading(true);
    try {
      const response = await apiGetRoles();
      const roles = response.data;
      const options: RoleOption[] = roles.map((role: any) => ({
        value: role.role_id.toString(),
        label: role.role_name,
        role_name: role.role_name,
      }));
      setRoleOptions(options);
      setRoleId("");
    } catch (err) {
      console.error("Failed to fetch roles", err);
      setError("Failed to load roles. Please try refreshing the page.");
    } finally {
      setIsRoleLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // HANDLE LOGIN SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const selectedRole = roleOptions.find((option) => option.value === roleId);
    if (!selectedRole) {
      setError("Please select a valid role/position.");
      setLoading(false);
      return;
    }

    if (!executeRecaptcha) {
      setError("reCAPTCHA is not ready. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await executeRecaptcha("login");

      const payload = {
        email,
        password,
        role_name: selectedRole.role_name,
        recaptchaToken,
      };

      console.log("Sending Login Payload:", payload);

      // Call backend API
      const response = await apiLogin(payload);
      const { user } = response.data;

      const authenticatedRoleOption = roleOptions.find(
        (option) => option.value === user.role_id.toString()
      );

      if (!authenticatedRoleOption) {
        throw new Error("User role ID not found in frontend role mapping.");
      }

      contextLogin({ user });

      // Redirect after context update
      setTimeout(() => {
        router.push("/dashboard");
      }, 0);
    } catch (err: any) {
      console.error("Login Failure:", err);
      const statusCode = err.response?.status;
      const apiErrorMessage = err.response?.data?.message;
      let userMessage = "Login failed. Please check your email and password.";

      if (statusCode === 401 || statusCode === 400) {
        userMessage =
          apiErrorMessage ||
          "The email or password you entered is incorrect, or your account is inactive.";
      } else if (!err.response) {
        userMessage =
          "Could not connect to the server. Please check your network connection.";
      }

      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
  if (!isAuthenticatedChecked || isRoleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        </div>
      </div>
    );
  }

  // LOGIN FORM
  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-4xl bg-transparent md:grid md:grid-cols-2 md:min-h-[520px] md:max-w-[950px]">
        {/* Form container */}
        <div className="w-full h-full bg-white p-8 flex flex-col justify-center z-10 shadow-xl md:rounded-r-none md:mr-[-50px] md:relative md:shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
          <div className="flex items-center justify-center gap-5 mb-3">
            <div className="flex justify-center">
              <NextImage
                src={Image}
                alt="UEP Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="flex justify-center">
              <NextImage
                src={URDS}
                alt="URDS Logo"
                className="h-15.5 w-15.5 object-contain mt-[-5px]"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-6 text-slate-700 hidden md:block">
            University of Eastern Philippines
          </h2>
          <div className="block md:hidden text-center mt-1 mb-6">
            <h1 className="text-3xl font-bold text-slate-800">URDS PORTAL</h1>
            <p className="text-xs text-gray-500">
              Your research journey starts here.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div
                className="bg-red-100/70 border-l-4 border-red-400 text-red-700 p-3 mb-4 rounded-md"
                role="alert"
              >
                <p className="text-sm text-left flex items-center">
                  <span className="pr-2">
                    <ErrorOutline className="h-5 w-5" />
                  </span>
                  {error}
                </p>
              </div>
            )}

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
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              options={roleOptions}
              placeholder="Select your role"
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
              <Link
                href="/auth/forgot-password"
                className="text-blue-400 text-xs hover:text-blue-500 transition"
              >
                Forgot Password?
              </Link>
            </div>

            <FormButton
              type="submit"
              className="text-md uppercase w-full h-12 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-4"
              disabled={loading || isRoleLoading}
            >
              {loading ? "Logging in..." : "Login"}
            </FormButton>

            <p className="text-center mt-3 text-xs text-gray-400 mb-[-12px]">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-400 hover:text-blue-500 transition"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* Illustration Panel */}
        <div className="hidden md:flex relative bg-[#4267FF] text-white flex-col items-center justify-center px-8 py-10 md:px-12 md:rounded-l-none md:h-auto md:ml-[-50px] shadow-xl">
          <div className="text-center">
            <h2 className="text-4xl font-semibold">URDS PORTAL</h2>
            <p className="text-sm text-blue-200 max-w-xs mx-auto">
              Your research journey starts here.
            </p>

            <NextImage
              src={illustrationSrc}
              alt="Research Illustration"
              className="mt-8 h-40 w-40 md:h-70 md:w-70 object-contain mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
