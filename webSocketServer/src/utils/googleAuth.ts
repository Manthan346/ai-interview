import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function verifyGoogleAuth(token: string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const userId = payload!['sub'];

  

  console.log('User authenticated:', userId);

  return payload;
}