const Joi = require ('joi');

const localisationSchema = Joi.object({
    city: Joi.string().required(),
    country: Joi.string().required()
});

module.exports =localisationSchema;