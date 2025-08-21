import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// Define testimony schema
const testimonySchema = new Schema({
    content: { type: String, required: true },
    media: { type: String, required: false },
    approved: { type: Boolean, default: false },
    user: { type: Types.ObjectId, required: true, ref: "User" },
},
    {
        timestamps: true
    }
);

testimonySchema.plugin(toJSON);

export const TestimonyModel = model("Testimony", testimonySchema);