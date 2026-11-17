import express from "express"

import { createContact, getAllContacts } from "../controllers/contact.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", createContact)
router.get("/", protect, getAllContacts)

export default router
