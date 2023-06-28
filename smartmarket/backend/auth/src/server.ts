
  

  

  import 'dotenv/config'

  //import module aliases
  
  import validateEnv from './utils/validateEnv'
  import App from './app';
  import UserController from './controller/user';

  validateEnv()
  
  const app = new App([new UserController], Number(process.env.PORT))
  
  app.listen()
  
  
  
  
  
  
  
   
 


















