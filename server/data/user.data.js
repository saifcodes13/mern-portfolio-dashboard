import bcrypt from "bcryptjs";
import dotenv from "dotenv"

dotenv.config()

const adminUser = {
  id: "admin-1",
  email: process.env.ADMIN_EMAIL,
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
};

export default adminUser;
