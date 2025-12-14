// src/utils/storage.ts
import CryptoJS from "crypto-js";
import config from "./config";
import useStorage from "../hooks/useStorage";
import { Account, PersonalInfo } from "./storageTypes";

const { getItem, setItem, removeItem } = useStorage();

// Helper: get decrypted account object
const getAccount = (): Account | null => {
  const account = getItem("account");
  if (!account) return null;

  try {
    return JSON.parse(CryptoJS.AES.decrypt(account, config.secret).toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Failed to parse account:", error);
    return null;
  }
};

// Encrypt & Decrypt helpers
export const encrypt = (value: string) => CryptoJS.AES.encrypt(value, config.secret).toString();
export const decrypt = (cipher: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipher, config.secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Account getters
export const tokenValue = (): string => getAccount()?.token ?? "";
export const userId = (): string => getAccount()?._id ?? "";
export const userEmail = (): string => getAccount()?.email ?? "";
export const userChecker = (): string => getAccount()?.personalInfo?.firstName ?? "";
export const companyChecker = (): boolean => getAccount()?.hasCompany ?? false;
export const userInfo = (): PersonalInfo | null => getAccount()?.personalInfo ?? null;
export const userImage = (): string => getAccount()?.personalInfo?.image ?? "";
export const ssoChecker = (): boolean => getAccount()?.ssoLogin ?? false;
export const permissions = (): string[] => getAccount()?.role?.permission ?? [];
export const userAccount = (): Account | null => getAccount();
export const counter = (): string => getItem("counter") ?? "";

// Permissions check
export const hasPermission = (permissionsList: string[], endpoint: string): boolean =>
  permissionsList.includes(endpoint);



// Usage in frontend
// import React from "react";
// import { tokenValue, userInfo, encrypt, decrypt } from "@/utils/storage";

// const UserInfoDisplay = () => {
//   const token = tokenValue();
//   const info = userInfo();

//   const secretMessage = "Hello Frontend!";
//   const encrypted = encrypt(secretMessage);
//   const decrypted = decrypt(encrypted);

//   return (
//     <div>
//       <h2>User Info</h2>
//       <p>Token: {token}</p>
//       <p>Name: {info?.firstName} {info?.lastName}</p>

//       <h3>Encryption Test</h3>
//       <p>Encrypted: {encrypted}</p>
//       <p>Decrypted: {decrypted}</p>
//     </div>
//   );
// };

// export default UserInfoDisplay;
