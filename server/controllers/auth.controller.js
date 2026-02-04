import bcrypt from "bcryptjs";
import adminUser from "../data/user.data.js";
import generateToken from "../utils/generate-token-utils.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";


/**
 * @desc    Authenticate admin and set JWT in httpOnly cookie
 * @route   POST /api/auth/login
 * @access  Public
 */

const loginAdmin = async (req,res) => {
    const {email, password} = req.body
    //Validate email
  
    if(email !== adminUser.email){
        return res.status(401).json({message: "Invalid credentials"})
    }


    //compare hashed password
    const isMatch = await bcrypt.compare(password, adminUser.password)
    if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"})
    }

     // Generate JWT and store in httpOnly cookie
     generateToken(res, adminUser.id)

    const token = jwt.sign(
    { id: adminUser.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

     res.json({
        token,
        message:"Login successfull",
        email: adminUser.email
     })
}



/**
 * @desc    Logout admin and clear JWT cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
 const logoutAdmin = (req, res) => {
  res.cookie("jwt", "", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  expires: new Date(0),
});
  res.status(200).json({ message: "Logged out successfully" });
};


const getAdminProfile = (req, res) => {
    res.status(200).json({
        id:req.admin.id,
        role: "admin"
    })
}


export  {loginAdmin, logoutAdmin, getAdminProfile}