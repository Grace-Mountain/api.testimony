import { testimonyModel } from "../models/testimonymodel.js";

// post a testimony
export const postTestimony = async (req, res, next) => {
    try {
        await testimonyModel.create(req.body);
        res.status(201).json("You have successfully posted a testimony!");
        // Respond to request
    } catch (error) {
        next(error);
    }
}

// get all testimony
export const getAllTestimonies = async (req, res, next) => {
    try {
        const testimonies = await testimonyModel.find();
        res.status(200).json(testimonies);
        // Respond to request
    } catch (error) {
        next(error);
    }
}

// update an existing testimony
export const updateTestimony = async (req, res, next) => {
    try {
        const testimony = await testimonyModel.findOneAndUpdate(req.body);
        res.status(200).json("You have successfully updated a testimony!");
        // Respond to request
    } catch (error) {
        next(error);
    }
}

// delete an existing testimony
export const deleteTestimony = async (req, res, next) => {
    try {
        const testimony = await testimonyModel.findOneAndDelete(req.params);
        res.status(200).json("You have successfully deleted a testimony!");
        // Respond to request
    } catch (error) {
        next(error);
    }
}
