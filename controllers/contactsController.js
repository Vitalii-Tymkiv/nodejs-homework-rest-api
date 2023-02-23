const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { contactSchema } = require("../schemas/validation");

/* GET */

const getContacts = async (req, res) => {
  try {
    const contactsList = await listContacts();
    res.json({
      status: "success",
      code: 200,
      contactsList,
    });
  } catch (error) {
    res.status(500).json({ error: express.message });
  }
};

/* GET api by ID */

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contactArray = await getContactById(contactId);
    if (contactArray.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contactArray);
  } catch (error) {
    res.status(500).json({ error: express.message });
  }
};

/* POST api contacts */

const addContacts = async (req, res) => {
  try {
    const data = req.body;
    const { error } = contactSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: "invalid contact" });
    }
    const newContact = req.body;
    const updatedContacts = await addContact(newContact);
    res.status(201).json({ status: "success", code: 201, updatedContacts });
  } catch (error) {
    res.status(500).json({ error: express.message });
  }
};

/* DELETE api contacts :id  */

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json({
      status: "success",
      code: 204,
      message: "contact removed",
      deletedContact,
    });
  } catch (error) {
    res.status(500).json({ error: express.message });
  }
};

/* PUT api contacts:id */

const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = req.body;
    const { error } = contactSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: "invalid update" });
    }
    const updatedContact = updateContact(contactId, data);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      updatedContact,
    });
  } catch (error) {
    res.status(500).json({ error: express.message });
  }
};

module.exports = {
  getContacts,
  getById,
  addContacts,
  deleteContact,
  changeContact,
};
