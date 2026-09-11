import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root as well as current working directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

const adminUser = {
  id: "admin-1",
  email: process.env.ADMIN_EMAIL || "admin@example.com",
  password: bcrypt.hashSync(adminPassword, 10),
};

export default adminUser;

