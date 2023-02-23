const express = require("express");

const router = express.Router();

const {
  getContacts,
  getById,
  addContacts,
  deleteContact,
  changeContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", addContacts);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
