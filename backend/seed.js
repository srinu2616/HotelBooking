import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import User from "./models/User.js";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();
        console.log("Database connected for seeding...");

        // Clear existing data
        await Room.deleteMany({});
        await Hotel.deleteMany({});
        await User.deleteMany({});
        console.log("Cleared existing data.");

        // Create User (Simulating Clerk ID which is a string)
        const userId = "user_" + Math.random().toString(36).substr(2, 9);
        const user = await User.create({
            _id: userId,
            username: "demo_owner",
            email: "owner@nexstay.com",
            image: "https://ui-avatars.com/api/?name=Demo+Owner",
            role: "hotelOwner",
            recentSearchedCities: []
        });
        console.log("User created:", user.username);

        // Create Hotels
        const hotelsData = [
            {
                name: "Grand NexStay Resort",
                address: "123 Palm Ave",
                contact: "+1 555-0101",
                owner: userId, // User ID is string
                city: "Miami"
            },
            {
                name: "Urban City Lofts",
                address: "456 Main St",
                contact: "+1 555-0102",
                owner: userId,
                city: "New York"
            }
        ];

        const createdHotels = await Hotel.insertMany(hotelsData);
        console.log(`${createdHotels.length} Hotels created.`);

        // Create Rooms for each hotel
        const roomsData = [];

        // Rooms for first hotel
        roomsData.push({
            hotel: createdHotels[0]._id, // Hotel ID is ObjectId
            roomType: "Ocean View Suite",
            pricePerNight: 450,
            amenities: ["WiFi", "Pool Access", "King Bed", "Balcony", "Breakfast"],
            images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
            isAvailable: true
        });
        roomsData.push({
            hotel: createdHotels[0]._id,
            roomType: "Standard Room",
            pricePerNight: 200,
            amenities: ["WiFi", "Queen Bed", "TV"],
            images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
            isAvailable: true
        });

        // Rooms for second hotel
        roomsData.push({
            hotel: createdHotels[1]._id,
            roomType: "Penthouse Suite",
            pricePerNight: 850,
            amenities: ["WiFi", "City View", "Jacuzzi", "Private Elevator"],
            images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"],
            isAvailable: true
        });
        roomsData.push({
            hotel: createdHotels[1]._id,
            roomType: "Executive Room",
            pricePerNight: 300,
            amenities: ["WiFi", "Work Desk", "Coffee Machine"],
            images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"],
            isAvailable: true
        });

        await Room.insertMany(roomsData);
        console.log(`${roomsData.length} Rooms created.`);

        console.log("Seeding completed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
