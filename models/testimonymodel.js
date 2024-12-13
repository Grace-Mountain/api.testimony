import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const testimonySchema = new Schema({
    content: { type: String, required: true },
    image: { type: String, required: false },
},

    {
        timestamp: { type: Date, default: Date.now },
    }

);

testimonySchema.plugin(toJSON);

export const testimonyModel = model('testimony', testimonySchema);
