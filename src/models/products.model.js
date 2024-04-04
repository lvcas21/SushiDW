import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    user: {                                 /* El usuario esta para saber que admin hizo el cambio */
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model("Product", productSchema);