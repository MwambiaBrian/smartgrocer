import 'dotenv/config'

//import module aliases

import validateEnv from './utils/validateEnv'
import App from './app';
import OrderCOntroller from './Controller/order.controller';


validateEnv()

const app = new App([new OrderCOntroller], Number(process.env.PORT))

app.listen()
