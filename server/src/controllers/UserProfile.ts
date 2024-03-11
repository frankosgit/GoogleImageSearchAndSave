import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import userProfile from "../models/userProfile";

const createUserProfile = (req: Request, res: Response, next: NextFunction) => {
    const { auth0Id } = req.body
    const User = new userProfile({
        auth0Id,
    });
    return User
        .save()
        .then((User) => res.status(201).json({ message: "user created succesfully", User }))
        .catch((error) => res.status(500).json({ error }));
}


const readUserProfile = (req: Request, res: Response, next: NextFunction) => {
    const auth0Id  = req.params.auth0Id;
    userProfile.findOne({ auth0Id: auth0Id })
        .then(user => user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' }))
        .catch((error) => res.status(500).json({ error }));
}


const likeImage = (req: Request, res: Response, next: NextFunction) => {
    const { auth0Id } = req.body;
    const { likedImages } = req.body;
    console.log(likedImages)
    userProfile.findOneAndUpdate(
        { auth0Id: auth0Id },
        { $addToSet: { likedImages: { $each: likedImages } } },
        { new: true }
    )
        .then(user => user ? res.status(200).json({ message: "image liked successfully" }) : res.status(404).json({ message: 'not found' }))
        .catch((error) => res.status(500).json({ error }));
}

const unlikeImage = (req: Request, res: Response, next: NextFunction) => {
    const { auth0Id, imageId } = req.body;
    userProfile.findOneAndUpdate(
        { auth0Id: auth0Id },
        { $pull: { likedImages: { imageId: imageId } } },
        { new: true }
    )
        .then(user => user ? res.status(200).json({ message: "image removed successfully" }) : res.status(404).json({ message: 'not found' }))
        .catch((error) => res.status(500).json({ error }));
}


export default { readUserProfile, likeImage, unlikeImage, createUserProfile };