import VerifyOtp from '@/components/otpVerification/OtpVerify'
import React, { Suspense } from 'react'


function page() {
  return (
   <div>
    
    <Suspense fallback={<div>loading....</div>} >
    <VerifyOtp />

    </Suspense>
   </div>
  )
}

export default page