import ContactModel from "../models/contact.model.js";


/**
 * @desc		Create contact
 * @route		POST /api/contact
 * @access	    Public
 */

const createContact = async( req, res) => {
    const {name, email, message} = req.body
    
    if(!name || !email || !message){
        res.status(400).json("All feilds are required")
    }
    

    const contact = await ContactModel.create({
        name,
        email,
        message
    })

    res.status(202).json({
        message: "Message saved succesfully",
        contact
    })
}

const getAllContacts = async(req, res) => {
    const contacts = await ContactModel.find()
    res.status(200).json(contacts)
}

export{
    createContact,
    getAllContacts
}