// src/utils/storageTypes.ts
export interface PersonalInfo {
  firstName: string;
  lastName?: string;
  image?: string;
  [key: string]: any;
}

export interface Role {
  permission: string[];
  [key: string]: any;
}

export interface Account {
  _id: string;
  email: string;
  personalInfo: PersonalInfo;
  hasCompany: boolean;
  ssoLogin: boolean;
  token: string;
  role: Role;
  [key: string]: any;
}
