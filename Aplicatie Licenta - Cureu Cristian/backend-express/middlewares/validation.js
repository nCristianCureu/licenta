// VALIDATION
const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
        }),
        password: Joi.string().required().min(6).max(255),
  });
    return schema.validate(data)
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
        password: Joi.string().required().min(6).max(255),
    });
    return schema.validate(data)
  };

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation