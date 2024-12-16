import { TestimonyModel } from "../models/testimony-model.js";
import { postTestimonyValidator } from "../validators/testimony-validator.js";

// post a testimony
export const postTestimony = async (req, res, next) => {
    try {
        // Validate vendor inputs
        const { error, value } = postTestimonyValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write charging to database
        await TestimonyModel.create({
            ...value,
            user: req.auth.id
        });
        // Respond to request
        res.status(201).json("Charging station was added!");
    } catch (error) {
        next(error);
    }
}

// Get all testimonies
export const getAllTestimonies = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 50, skip = 0 } = req.query;
        // Fetch reservations from database 
        const testimonies = await TestimonyModel
            .find(filter)
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Return a response
        res.status(200).json(testimonies);
    } catch (error) {
        next(error);
    }
}

// delete an existing testimony
export const deleteTestimony = async (req, res, next) => {
    try {
        // Find a reservation by id and delete it
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
        res.status(200).json("Testimony deleted!");
    } catch (error) {
        next(error);
    }
}
