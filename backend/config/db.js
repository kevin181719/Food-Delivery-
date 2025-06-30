import mongoose, { Mongoose } from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://virat:virat18@cluster0.5ebncbk.mongodb.net/food-del').then(()=>console.log("DB connected"));
}