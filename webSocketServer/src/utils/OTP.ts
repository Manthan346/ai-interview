  export const emailSubject =(otp: string) => {
    
    
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email OTP Template</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f4f6f8;
      font-family: Arial, sans-serif;
    }

    .wrapper { 
      width: 100%;
      padding: 40px 0;
      background: #f4f6f8;
    }

    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      padding: 35px;
      text-align: center;
      color: white;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
      letter-spacing: 1px;
    }

    .content {
      padding: 40px 30px;
      text-align: center;
      color: #333;
    }

    .content h2 {
      margin-top: 0;
      font-size: 24px;
    }

    .content p {
      color: #666;
      font-size: 16px;
      line-height: 1.6;
    }

    .otp-box {
      margin: 30px 0;
    }

    .otp {
      display: inline-block;
      background: #f3f4f6;
      color: #111827;
      font-size: 34px;
      font-weight: bold;
      letter-spacing: 12px;
      padding: 18px 30px;
      border-radius: 14px;
      border: 2px dashed #6366f1;
    }

    .expire {
      font-size: 14px;
      color: #ef4444;
      margin-top: 15px;
    }

    .footer {
      padding: 25px;
      text-align: center;
      font-size: 13px;
      color: #888;
      background: #fafafa;
    }

    @media only screen and (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }

      .otp {
        font-size: 28px;
        letter-spacing: 8px;
        padding: 15px 20px;
      }
    }
  </style>
  </head>
  <body>

  <div class="wrapper">
    <div class="container">

      <div class="header">
        <h1>AI-Interview</h1>
      </div>

      <div class="content">
        <h2>Email Verification</h2>
        <p>Use the OTP below to verify your email address. This code is valid for 3 minutes.</p>

        <div class="otp-box">
          <div class="otp">${otp}</div>
        </div>

        <p class="expire">Do not share this code with anyone.</p>
      </div>

      <div class="footer">
        © 2026 AI-Interview. All rights reserved.
      </div>

    </div>
  </div>

  </body>
  </html>

  `

  } 