import  express  from "express";
//import jwt from "jsonwebtoken"
//import cors from 'cors'
//Routes
import authController from "./controllers/auth"
// import stockController from "./Controllers/stock.js";
// import orderController from "./Controllers/order.js";
// import groceryController from "./Controllers/grocery.js";
// import riderController from "./Controllers/rider.js";

//middlewares
//import authenticateToken from "./middlewares/authenticate.js"
//import authorize from "./middlewares/authorize.js"

import cors from 'cors'
const app = express()

const port = process.env.PORT || 9000;
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/auth",authController)
//app.use("/smart/api/inventory", authenticateToken,authorize(['seller']),stockController)
//app.use("/smart/api/grocery",authenticateToken,authorize(['Customer']), groceryController)
//app.use("/smart/api/orders", authenticateToken, authorize(['customer', 'seller', 'rider']), orderController)
//app.use("/smart/api/riders", authenticateToken, authorize(['rider']), riderController)
// Define your API Gateway routes here, for example:
// app.get('/api/users', authenticateToken, (req, res) => {
//   // This route is protected by authentication, only authenticated users can access it
//   // ...
// });

// This function is a middleware function that verifies the authenticity of the token in the request header
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) {
//     return res.sendStatus(401); // Unauthorized
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Forbidden
//     }

//     req.user = user;
//     next();
//   });
// }

app.listen(port, () => {
  console.log(`Gateway  listening on port ${port}`)
})






