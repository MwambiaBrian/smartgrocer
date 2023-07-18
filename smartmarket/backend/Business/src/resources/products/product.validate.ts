import Joi from 'joi';

const create = Joi.object({
    businessId: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.number().required(),
    desc: Joi.string().required(),
});

export default {create}