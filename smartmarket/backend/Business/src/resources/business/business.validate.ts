import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    businessEmail: Joi.string().required(),
    ownerId: Joi.string().required(),
    businessType: Joi.string().required(),
    businessPhoneNumber: Joi.string().required(),
    location: Joi.object().required(),

});

export default {create}