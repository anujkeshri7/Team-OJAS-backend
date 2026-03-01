import jwt from "jsonwebtoken";
import User from "../models/user.js";


const checkAuthMiddelware = async (req, res, next) => {


    const token = req?.cookies['token'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token - user not found",
            });
        }
        req.user=decoded;

        next();
        
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({
            success: false,
            message: "Invalid token",
            error: error.message,
        });
        
    }
}

export default checkAuthMiddelware; 