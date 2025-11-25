import jwt from "jsonwebtoken"

export const generateAccessToken = (username) => { 
    return jwt.sign({ 
        username: username
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "30m" }
)}

export const generateRefreshToken= (username) => { 
    return jwt.sign({ 
        username: username
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "1d" }
)}