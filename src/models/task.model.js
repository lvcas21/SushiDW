import mongoose from "mongoose";

const taskschema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model("Task", taskschema);