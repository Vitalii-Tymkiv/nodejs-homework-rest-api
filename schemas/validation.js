const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(10).max(12).required(),
});

module.exports = { contactSchema };
