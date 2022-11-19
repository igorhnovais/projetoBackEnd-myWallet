import joi from "joi";

export const userSignUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
});
