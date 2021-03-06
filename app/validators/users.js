const Joi = require("joi");

function validateAddUser(req, res, next) {
  console.log('validating')
  const body = req.body;
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(12).max(120).required(),
    sex: Joi.string().required(),
    pin: Joi.number().integer().required(),
    role: Joi.string().min(3).max(15).required(),
    username: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  };
  let result = Joi.validate(body, schema);
  if (result.error) {
    res.status(400).send(result.error);
    console.log(result.error)
  } else {
    console.log('validated')
    next();
  }
  // console.log(result)
}

function changedUser(req, res, next) {
  const body = req.body
  const schema = {
    name: Joi.string().min(3).max(30),
    age: Joi.number().integer().min(12).max(120),
    sex: Joi.string(),
    pin: Joi.number().integer(),
    role: Joi.string().min(3).max(15),
    profilePic:Joi.string().min(3)
  };
  let result = Joi.validate(body, schema);
  if (result.error) {
    res.status(400).send(result.error);
  } else {
    next();
  }
  // console.log(result)
}

module.exports = {
  validateAddUser: validateAddUser,
  changedUser: changedUser,
};
