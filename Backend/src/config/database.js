import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log("Database Connected successfully...")
    } catch (error) {
        console.log(`Database connection failed ${error}`)
    }
}