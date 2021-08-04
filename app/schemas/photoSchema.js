const Joi = require ('joi');

const photoSchema = Joi.object({

    name: Joi.string().required(),
    image_url: Joi.string().required(),
    created_at: Joi.string().required(),
    shot_date: Joi.string().required(),
    camera_brand: Joi.string().required(),
    camera_model: Joi.string().required(),
    exposure_time: Joi.string().required(),
    exposure_program: Joi.string().required(),
    aperture_value: Joi.number().integer().required(),
    focal_lenght: Joi.number().integer().required(),
    shutter_speed: Joi.string().required(),
    iso_value: Joi.number().integer().required(),
    software_used: Joi.string().required(),
    localisation_id: [Joi.number().integer().optional(), Joi.allow(null)],
    album_id: Joi.number().integer().required(),
    categories: Joi.array().required({
        label: Joi.string(),
    })

});

module.exports = photoSchema ;