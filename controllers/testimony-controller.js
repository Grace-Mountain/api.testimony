import { TestimonyModel } from "../models/testimony-model.js";
import { postTestimonyValidator } from "../validators/testimony-validator.js";

// Post a testimony
export const postTestimony = async (req, res, next) => {
    try {
        // Validate user inputs
        const { error, value } = postTestimonyValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write testimony to database
        await TestimonyModel.create({
            ...value,
            user: req.auth.id
        });
        // Respond to request
        res.status(201).json("Testimony was posted!");
    } catch (error) {
        next(error);
    }
}

// Approve testimony for only admins
export const approveTestimony = async (req, res, next) => {
    try {
        // Check if the user is an admin
        if (req.auth.role !== "admin") {
            return res.status(403).json("You do not have permission to approve this testimony!");
        }
        const testimony = await TestimonyModel.findOneAndUpdate(req.params.id);
        if (!testimony) {
            return res.status(404).json("Testimony not found!");
        }
        if (testimony.approved) {
            return res.status(400).json("Testimony is already approved!");
        }
        testimony.approved = true;
        await testimony.save();
        // Respond to request
        res.status(200).json("Testimony approved!");
    } catch (error) {
        next(error);
    }
}

// Get all testimonies
export const getAllTestimonies = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 50, skip = 0 } = req.query;
        let query = { ...JSON.parse(filter) };
        // Check if the user is an admin
        if (req.auth.role !== "admin") {
            query.approved = true;
        }
        // Fetch testimonies from database 
        const testimonies = await TestimonyModel
            .find(query)
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Respond to request
        res.status(200).json(testimonies);
    } catch (error) {
        next(error);
    }
}

// Get a testimony by ID
export const getTestimonyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        
        // Check if the user is an admin
        if (req.auth.role !== "admin") {
            query.approved = true;
        }
        
        const testimony = await TestimonyModel.findOne(query);
        if (!testimony) {
            return res.status(404).json({
                success: false,
                message: 'Testimony not found.',
            });
        }
        res.status(200).json({
            success: true,
            data: testimony,
        });
    } catch (error) {
        next(error);
    }
}

// Delete an existing testimony
export const deleteTestimony = async (req, res, next) => {
    try {
        // Check if the user is an admin
        if (req.auth.role !== "admin") {
            return res.status(403).json("You do not have permission to delete this testimony!");
        }
        // Find a testimony by id and delete it
        const testimony = await TestimonyModel.
            findOneAndDelete(
                {
                    _id: req.params.id,
                    user: req.auth.id
                }
            );
        if (!testimony) {
            return res.status(404).json("Testimony not found!");
        }
        // Respond to request
        res.status(200).json("Testimony deleted!");
    } catch (error) {
        next(error);
    }
}
