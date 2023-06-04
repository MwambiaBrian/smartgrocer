

  // Set up necessary dependencies
  import express from "express"
  import mongoose from "mongoose"
  import userController from "./controller/user"

  const app = express();


 // Set up MongoDB connection
 const { username, password, host, dbport, database } = {
  username: 'devuser',
  password: 'devuserpassword',
  host: 'localhost',
  dbport: '27017',
  database: 'devdb',
};

const mongoURI = `mongodb://${username}:${password}@${host}:${dbport}/${database}`;

const passwordatlas = "bYL3nKvvBZeFh7Ao"
const conn = `mongodb://devuser:devpassword@:27017/?retryWrites=true&w=majority`

const connn = `mongodb+srv://adminuser:${password}@cluster0.retoa9u.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongoURI, {
  // useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false,
})
.then(() => console.log("database connected"))
.catch((err) => console.error(err))


 const port = process.env.PORT || 5000;

 app.use(express.json())
 app.get('/', (req, res) => {
  res.send('Hello World!')
})

 
//Routes
app.use("/auth/api",userController)

  
// Start Express app
  app.listen(port, () => {
    console.log(`users service listening on port ${port}`)
  })
















