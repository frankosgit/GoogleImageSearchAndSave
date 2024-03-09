import Joi, { ObjectSchema } from "joi"
import { NextFunction, Response, Request } from "express";
import { Schema } from "mongoose";
import { IUserProfile } from "../models/userProfile";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validationObject = { ...req.body, ...req.params };
            await schema.validateAsync(validationObject)
            next()
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error })
        }
    }
}

export const Schemas = {
    userProfile: {
        create: Joi.object<IUserProfile>({
            auth0Id: Joi.string().required()
        }),
        update: Joi.object<IUserProfile>({
            auth0Id: Joi.string().required(),
            likedImages: Joi.array().items(Joi.object({
                imageId: Joi.string().required(),
                imageURL: Joi.string().required()
            })).required()
        })
    }
}