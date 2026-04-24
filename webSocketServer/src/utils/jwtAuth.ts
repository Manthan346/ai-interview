import jwt from 'jsonwebtoken'
import { ApiError } from '../helpers/ApiError'

type JWT = {
    id: string,
    
    isVerified?: boolean,
   
    email?: string
}


 const generateAccessToken = (token: JWT) => {
    if(!process.env.JWT_SECRET){
        throw new ApiError(404,"token is not generated")
    }
    const generateToken = jwt.sign(token, process.env.JWT_SECRET, {
        expiresIn: "30m"
    })
    return generateToken

}


 const generateRefreshToken = (token: JWT) => {
     if(!process.env.JWT_SECRET){
        throw new ApiError(404,"token is not generated")
    }
    const generateToken = jwt.sign(token, process.env.JWT_SECRET,{
        expiresIn: "4d"
    })

    return generateToken


}

export {
    generateAccessToken,
    generateRefreshToken

}
