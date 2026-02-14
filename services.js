import bcrypt from 'bcrypt';    
import jwt from 'jsonwebtoken';

import User from './models/user.js';

const checkAuth = async (req, res) => {
    console.log("Checking authentication...");
    console.log(req.cookies);
    const token = req?.cookies['token'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        res.status(200).json({
            success: true,
            message: "Token is valid",
            user: decoded,
        }); 
      
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({
            success: false,
            message: "Invalid token",
            error: error.message,
        });
    }   
}

export { checkAuth };