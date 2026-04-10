import dotenv from 'dotenv'
import app from './app.js';
import { connectDB } from './config/database.js';

dotenv.config({
  path : '.env'
})

const PORT = process.env.PORT || 4000;

connectDB()
.then(() => {
  app.listen(PORT , (req , res) => {
    console.log(`Server is listening on port : ${PORT}`)
  })
})
.catch((error) => {
  console.log(`Something went wrong while connecting with database... ${error}`)
})