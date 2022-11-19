import joi from "joi";

export const entryExitSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required().min(4).max(100)
})