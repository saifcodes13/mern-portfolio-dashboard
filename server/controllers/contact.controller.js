import ContactModel from "../models/contact.model.js";

/**
 * @desc		Create contact (lead)
 * @route		POST /api/contact
 * @access	    Public
 */
const createContact = async (req, res) => {
  const { name, email, message, subject, service } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }

  try {
    const contact = await ContactModel.create({
      name,
      email,
      message,
      subject,
      service,
    });

    return res.status(201).json({
      message: "Message saved successfully",
      contact,
    });
  } catch (error) {
    console.error("Failed to save contact:", error.message);
    return res.status(500).json({ message: "Failed to save message" });
  }
};

/**
 * @desc		Get all contacts (leads)
 * @route		GET /api/contact
 * @access	    Private (admin)
 */
const getAllContacts = async (req, res) => {
  const contacts = await ContactModel.find().sort({ createdAt: -1 });
  res.status(200).json(contacts);
};

export { createContact, getAllContacts };
