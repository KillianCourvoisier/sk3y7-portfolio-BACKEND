const Joi = require ('joi');

const categorySchema = Joi.object({
    label: Joi.string().required(),
    color: Joi.string().required()
});

module.exports =categorySchema;