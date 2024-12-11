import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

// const connectDB = async () => {
//     try {
//         const connectionString = process.env.MONGODB_URI;  // Ensure this is correct
//         if (!connectionString) {
//             throw new Error('MongoDB URI is not set in the environment variables');
//         }
//         await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('MONGODB CONNECTION FAILED:', err);
//         throw err; // Re-throw to handle it in the main `catch` block
//     }
// };

export default connectDB
