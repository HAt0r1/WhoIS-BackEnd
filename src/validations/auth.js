import Joi from "joi";

export const registrationValidation = Joi.object({
    phone: Joi.string().required().pattern(/^\+?[0-9]{10,15}$/).messages({
        'string.pattern.base': 'Phone number must be a valid format (e.g., +380123456789)',
        'any.required': 'Phone number is required',
    }),
    password: Joi.string().required().min(6).messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
    countryCode: Joi.string().optional().length(3).messages({
            'string.length': 'Country code must be 3 characters long',
    }),
})

export const loginValidation = Joi.object({
    phone: Joi.string().required().pattern(/^\+?[0-9]{10,15}$/).messages({
        'string.pattern.base': 'Phone number must be a valid format (e.g., +380123456789)',
        'any.required': 'Phone number is required',
    }),
    password: Joi.string().required().min(6).messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
})