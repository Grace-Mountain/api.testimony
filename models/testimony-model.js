import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const testimonySchema = new Schema({
    content: { type: String, required: true },
    image: { type: String, required: false },
    approved: { type: Boolean, default: false },
    user: { type: Types.ObjectId, required: true, ref: "User" },
},
    {
        timestamp: { type: Date, default: Date.now },
    }
);

testimonySchema.plugin(toJSON);

export const TestimonyModel = model("Testimony", testimonySchema);
