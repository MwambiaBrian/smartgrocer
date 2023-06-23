import 'dotenv/config'

//import module aliases

import validateEnv from './utils/validateEnv'
import App from './app';
import ProductController from './resources/products/product.controller';
import BusinessController from './resources/business/business.controller';

validateEnv()

const app = new App([new BusinessController, new ProductController], Number(process.env.PORT))

app.listen()







 