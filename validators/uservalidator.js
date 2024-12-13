import joi from "joi";

export const userRegisterValidator = joi.object({   
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const userLoginValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});
