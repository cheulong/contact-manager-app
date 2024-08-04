import asyncHandler from "express-async-handler"
import Contact from '../models/contactModel.js';

//@desc Get all contacts
//@route GET api/contacts
//@access Private
const getAllContacts = asyncHandler(async(req, res) => {
  const contacts = await Contact.find({ user_id: req.user._id });
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST api/contacts
//@access Private
const createNewContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('Missing required fields');
    }
    console.log(req.user);
    const contact = await Contact.create({name, email, phone, user_id: req.user._id});
    res.status(201).json(contact);
});

//@desc Get contact by id
//@route GET api/contacts/:id
//@access Private
const getContactById = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not authorized to access this contact');
  }

  res.status(200).json(contact);
});

//@desc Update contact by id
//@route PUT api/contacts/:id
//@access Private
const updateContactById = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You are not authorized to access this contact');
  }

  await Contact.deleteOne({_id: req.params.id});
  
  res.status(200).json(contact);
});

//@desc Delete contact by id
//@route DELETE api/contacts/:id
//@access Private
const deleteContactById = asyncHandler(async(req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});

export {
  getAllContacts,
  createNewContact,
  getContactById,
  updateContactById,
  deleteContactById
}