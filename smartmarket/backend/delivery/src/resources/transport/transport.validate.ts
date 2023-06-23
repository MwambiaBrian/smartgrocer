import Joi from 'joi';

const create = Joi.object({
    transportNumber: Joi.string().required(),
    transportEmail: Joi.string().required(),
    ownerId: Joi.string().required(),
    transportMobileNumber: Joi.string().required(),
    transportType: Joi.string().required()
});

export default {create}