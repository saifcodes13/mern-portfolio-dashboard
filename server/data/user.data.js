import bcrypt from "bcryptjs";
import dotenv from "dotenv"

dotenv.config()

const adminUser = {
  id: "admin-1",
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

export default adminUser;
