import mongoose from "mongoose";
import colors from "colors"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.yellow.bold);
    } catch (error) {
        console.log(`MongoDB Warning: ${error.message}`.red);
        console.log("Server will continue running. (Collections and API fallbacks active)".yellow);
    }
};

export default connectDB