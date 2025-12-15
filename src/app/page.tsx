import Image from "next/image";
import LoginPage from "./auth/login/page";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
