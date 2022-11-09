import { Joi } from "express-validation";

const userRegisterSchema = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  }),
};

export default userRegisterSchema;
