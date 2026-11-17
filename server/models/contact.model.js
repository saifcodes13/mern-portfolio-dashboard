import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    service: {
      type: String,
    },
  },
  { timestamps: true },
);
const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
