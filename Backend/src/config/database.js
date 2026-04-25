import mongoose from 'mongoose';
import dns from "dns"
import { DB_NAME } from '../constant.js';

dns.setServers(["1.1.1.1" , "8.8.8.8"])

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log("Database Connected successfully...")
    } catch (error) {
        console.log(`Database connection failed ${error}`)
    }
}