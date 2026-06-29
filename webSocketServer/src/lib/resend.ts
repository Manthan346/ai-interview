import { Resend } from 'resend';
import { asyncHandler } from '../helpers/asyncHandler';
import { emailSubject } from '../utils/OTP';

const resend = new Resend(process.env.RESEND_API_KEY);

export const ResendEmail = async (email: string, otp: string) => {


  try {
    return  await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: email,
          subject: 'otp verification',
          html: emailSubject(otp)!,
      });
  } catch (error: any) {
    console.log(error.message)
    
  }

}

