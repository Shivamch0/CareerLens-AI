import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./config/database.js";

dotenv.config({
  path: ".env",
});

const Port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(Port, (req, res) => {
      console.log("Server is listening on : ", Port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
