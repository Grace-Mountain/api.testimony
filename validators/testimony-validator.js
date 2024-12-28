import joi from "joi";

export const postTestimonyValidator = joi.object({
    content: joi.string().required(),
    image: joi.string(),
});

export const updateTestimonyValidator = joi.object({
    content: joi.string().required(),
    image: joi.string().required(),
});