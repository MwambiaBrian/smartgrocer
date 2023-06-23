import Joi from 'joi';

const create = Joi.object({
    items: Joi.string().required(),
    businessAddress: Joi.string().required(),
    buyerAddress: Joi.string().required()
   
});

export default {create}