import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
        
    } catch (error) {

            console.error("Error registering user:", error);
            res.status(500).json({
                success: false,
                message: "Error registering user",
                error: error.message,
            });
        
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        console.log("User found:", user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign({ userId: user._id ,email: user.email,name:user.name, role:user.role}, process.env.JWT_SECRET);


        res
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })

        .status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
        });
        
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            message: "Error logging in user",
            error: error.message,
        });
        
    }
}

const fetchAdmins = async(req,res)=>{

    try {
        const admins = await User.find({ role: { $in: ['Admin', 'SuperAdmin'] } });
        res.status(200).json({
            success: true,
            message: "Admins fetched successfully",
            admins,
        });
        
    } catch (error) {
            console.error("Error fetching admins:", error);
            res.status(500).json({
                success: false,
                message: "Error fetching admins",
                error: error.message,
            });
        
    }

}

const addAdmin = async(req,res)=>{
    const user = req.user;
    if(user.role !== "SuperAdmin"){
        return res.status(403).json({
            success: false,
            message: "Only SuperAdmin can add Admins",
        });
    }

    try {

        const {email} = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        existingUser.role = "Admin";
        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "Admin added successfully",
            admin: existingUser,
        });
        
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({
            success: false,
            message: "Error adding admin",
            error: error.message,
        });
        
    }


}

const removeAdmin = async(req,res)=>{
    const user = req.user;
    if(user.role !== "SuperAdmin"){
        return res.status(403).json({
            success: false,
            message: "Only SuperAdmin can remove Admins",
        });
    }

    try {

        const {email} = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        existingUser.role = "Member";
        await existingUser.save();
        res.status(200).json({
            success: true,
            message: "Admin removed successfully",
            user: existingUser,
        });
        
    } catch (error) {
        console.error("Error removing admin:", error);
        res.status(500).json({
            success: false,
            message: "Error removing admin",
            error: error.message,
        });
    }
}

export { registerUser , loginUser ,fetchAdmins, addAdmin, removeAdmin};

