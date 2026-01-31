import mongoose from "mongoose";
import colors from "colors"

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected:  ${conn.connection.host}`.yellow.bold)
    } catch(error) {
        console.log(`Error: ${error.message}`.red.underline)
        process.exit(1)
    }

    console.log("Mongouri:", process.env.MONGO_URI)
}

export default connectDB