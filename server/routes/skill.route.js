import express from "express"

import {getSkills, updateSkill} from "../controllers/skill.controller.js"

import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", getSkills)
router.put("/edit",updateSkill)

export default router