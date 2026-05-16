import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middleware/error.middleware.js";
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" })); // access to json data
app.use(express.urlencoded({ extended: true, limit: "1mb" })); // access to URl data
// app.use("/uploads" , express.static("uploads"))  

app.use(cookieParser()); // Can access user Cookies and send Cookies to user browser


// routes Imports
import userRoute from "./routes/user.route.js"
import onboardingRoute from './routes/onboarding.route.js'
import testRoute from './routes/test.routes.js'
import resumeRoute from "./routes/resume.route.js"

app.use('/api/v1/users' , userRoute);
app.use('/api/v1/onboarding' , onboardingRoute);
app.use('/api/v1/test' , testRoute)
app.use('/api/v1/resume' , resumeRoute)

app.use(errorMiddleware)

export { app };
