import { NextResponse } from "next/server";
import axios, { AxiosError, toFormData } from "axios";

import config from "./config";

export const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: "*/*",
    "Content-type": "application/json",
    // Authorization: `Basic ${config.authorization}`,
  },
});

export const apiToken = () =>
  axios.create({
    baseURL: config.apiUrl,
    //baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

export const apiContact = () =>
  axios.create({
    baseURL: config.apiUrl,
    //baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

export const apiAuth = () =>
  axios.create({
    baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
    },
    withCredentials: true,  // Ensure cookies are sent with every request
  });

export const apiChangePassword = (props: any, type: any) =>
  axios.create({
    baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
      Authorization: `Bearer ${type}`,
    },
  });

export const apiUsersOld = (token: any) =>
  axios.create({
    baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

export const apiUsers = (token: any) =>
  axios.create({
    baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const validateExchangeCode = () =>
  axios.create({
    baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
    },
  });

export const apiTransactions = () =>
  axios.create({
    baseURL: config.apiUrl,
    headers: {
      // Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data"
      "Content-type": "application/json",
    },
  });

export const biddingDocs = (token: any) =>
  axios.create({
    baseURL: config.apiUrl,
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserRoles = () => {};

export const Redirection = (req: any) => {
  let url = req.url;

  if (url.includes("/dashboard")) {
    return NextResponse.redirect("/");
  }
};
