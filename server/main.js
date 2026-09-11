import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.route.js";
import skillRoutes from "./routes/skill.route.js";
import contactRoutes from "./routes/contact.route.js";
import blogRoutes from "./routes/blog.route.js";

import personalInfo from "./data/personalInfo.data.js";
import { skills } from "./data/skills.data.js";

connectDB();

const app = express();
const port = process.env.PORT || 5002;

/*  Middleware  */
app.use(
  cors({
    origin: [
      "http://localhost:3006",
      "http://localhost:3005",
      "https://www.saifcodes.in",
       "https://saifcodes.in"
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

/* Routes  */
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/personalInfo", (req, res) => {
  res.json(personalInfo);
});

/* ===== Server ===== */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
