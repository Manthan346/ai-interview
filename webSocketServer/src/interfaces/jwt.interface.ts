
//jwt token payload
export interface TokenPayload {
    id: string,
    email: string,
    isVerified?: boolean
}