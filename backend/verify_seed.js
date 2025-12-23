import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import User from "./models/User.js";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";

dotenv.config();

const verifyData = async () => {
    try {
        await connectDB();

        const userCount = await User.countDocuments();
        const hotelCount = await Hotel.countDocuments();
        const roomCount = await Room.countDocuments();

        console.log(`Verification Results:`);
        console.log(`Users: ${userCount}`);
        console.log(`Hotels: ${hotelCount}`);
        console.log(`Rooms: ${roomCount}`);

        if (roomCount > 0 && hotelCount > 0 && userCount > 0) {
            console.log("Data verification PASSED");
        } else {
            console.log("Data verification FAILED");
        }

        process.exit(0);
    } catch (error) {
        console.error("Verification Error:", error);
        process.exit(1);
    }
};

verifyData();
