import mongoose from "mongoose"


export const connectDB= async()=>  {
    await mongoose.connect('mongodb+srv://giteshdesai7:9610996364Gd@cluster0.dqwmi.mongodb.net/food-del').then(()=> console.log("DB Connected"));
};