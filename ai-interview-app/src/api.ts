
import axios from "axios";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import { SignupType } from "./lib/zod/user-validation";

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001",
  withCredentials: true,


})





backend.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        await backend.post("/api/v1/user/refresh")

        return backend(originalRequest)
      } catch (err) {
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

//create user 
export const signUps = (email: SignupType) => {
  return backend.post("/api/v1/user/register",
    email
  )

}

export const verifyOtp = (otp: string) => {
  return backend.post("/api/v1/user/verify-email", {
    otp
  })

}

export const sendOtpToEmail = () => {
  return backend.get("/api/v1/user/send-email")
}



//interceptor for refresh token when expired
backend.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        backend.post("")

        return backend(originalRequest)
      } catch (err) {
        window.location.href = "/signups"
      }
    }

    return Promise.reject(error)
  }
)