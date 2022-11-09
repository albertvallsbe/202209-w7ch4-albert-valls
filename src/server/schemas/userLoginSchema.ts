import { Joi } from "express-validation";

const userLoginSchema = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  }),
};

export default userLoginSchema;
