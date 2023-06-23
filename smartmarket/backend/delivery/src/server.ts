import 'dotenv/config'

//import module aliases

import validateEnv from './utils/validateEnv'
import App from './app';
import TransportController from './resources/transport/transport.controller';
import DeliveryController from './resources/delivery/delivery.controller';

validateEnv()

const app = new App([new DeliveryController, new TransportController], Number(process.env.PORT))

app.listen()
