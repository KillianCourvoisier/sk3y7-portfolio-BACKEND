const Joi = require ('joi');

const albumSchema = Joi.object({
    title: Joi.string().required(),
    created_at: Joi.string().required(),
    updated_at: Joi.string().required(),
    localisation_id: Joi.number().integer().required(),

});

module.exports = albumSchema ;