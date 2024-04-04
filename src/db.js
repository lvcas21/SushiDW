import mongoose from "mongoose";

export const connectdb = async () => {

    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/fukusuke");
        console.log("DB connected successfully")

    } catch (error) {
        console.log(error);
    }

};