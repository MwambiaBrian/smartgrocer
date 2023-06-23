import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    businessEmail: Joi.string().required(),
    ownerId: Joi.string().required(),
    desc: Joi.string().required(),
});

export default {create}