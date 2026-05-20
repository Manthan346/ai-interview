"use client"

import { sendOtpToEmail, verifyOtp } from "@/api"
import { Button } from "@/components/ui/button"
import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function VerifyOtp() {
  const router = useRouter()
  const digits = 5
  
  const [otp, setOtp] = useState(
    new Array(digits).fill("")
  )




  const digitRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    digitRef.current[0]?.focus()
  }, [])

  const handleText = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const newDigits = [...otp]
    newDigits[index] = value.slice(-1)
    setOtp(newDigits)

    value && digitRef.current[index + 1]?.focus()
    console.log(otp)
    console.log("finalOtp",newDigits.join(""))

  }

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      !e.currentTarget.value &&
        digitRef.current[index - 1]?.focus()
    }
  }

  useEffect(() => {
    //send otp to email
   try {
     sendOtpToEmail()
   } catch (error:any) {
      console.log(error.message) 
   }
   
  }, [])

  const handleOtpVerify = async () => {
   try {
     const finalOtp = otp.join("")
     const res =  await verifyOtp(finalOtp) 
     console.log(res.data?.data)
     if (res.status === 200) {
      router.push("/dashboard")
      
     }
 
   } catch (error: any) {
    console.log(error.message)
    
   }
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl p-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 17v.01" />
              <path d="M7 10V7a5 5 0 0 1 10 0v3" />
              <rect x="5" y="10" width="14" height="10" rx="2" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            OTP Verification
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter the 5 digit verification code sent to your email.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                digitRef.current[index] = el
              }}
              value={otp[index]}
              onChange={(e) =>
                handleText(index, e.target.value)
              }
              onKeyDown={(e) =>
                handleOnKeyDown(e, index)
              }
              maxLength={1}
              type="text"
              className="h-16 w-16 rounded-2xl border border-border bg-background text-center text-2xl font-semiboldtext-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/15 "
            />
          ))}
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mt-5">
          {otp.map((digit, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                digit
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          disabled={!isComplete}
          className={`mt-8 w-full h-12 rounded-3xl
            font-medium text-sm
            transition-all duration-200
            ${
              isComplete
                ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }
          `}
          onClick={()=> handleOtpVerify()}
        >
          Verify Code
        </Button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm flex justify-center text-muted-foreground">
          Didn&apos;t receive code?{" "}
          <p className="text-primary font-medium hover:underline cursor-pointer" onClick={() => sendOtpToEmail()}>
            Resend
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp