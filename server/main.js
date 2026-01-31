import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.route.js";
import skillRoutes from "./routes/skill.route.js";
import contactRoutes from "./routes/contact.route.js";

import personalInfo from "./data/personalInfo.data.js";
import { skills } from "./data/skills.data.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5002;

/*  Middleware  */
app.use(
  cors({
    origin: [
      "http://localhost:3005",
      "https://mern-portfolio-dashboard.vercel.app/",
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

app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/personalInfo", (req, res) => {
  res.json(personalInfo);
});

/* ===== Server ===== */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
