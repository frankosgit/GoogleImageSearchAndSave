"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userProfile_1 = __importDefault(require("../models/userProfile"));
const createUserProfile = (req, res, next) => {
    const auth0Id = req.params.auth0Id;
    const User = new userProfile_1.default({
        auth0Id,
    });
    return User
        .save()
        .then((User) => res.status(201).json({ message: "user created succesfully", User }))
        .catch((error) => res.status(500).json({ error }));
};
const readUserProfile = (req, res, next) => {
    const auth0Id = req.params.auth0Id;
    return userProfile_1.default.findById(auth0Id)
        .then(user => user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' }))
        .catch((error) => res.status(500).json({ error }));
};
const likeImage = (req, res, next) => {
    const { auth0Id } = req.params;
    const { imageId, imageURL } = req.body;
    userProfile_1.default.findOneAndUpdate({ auth0Id: auth0Id }, { $addToSet: { likedImages: { imageId, imageURL } } }, { new: true })
        .then(user => user ? res.status(200).json({ message: "image liked successfully" }) : res.status(404).json({ message: 'not found' }))
        .catch((error) => res.status(500).json({ error }));
};
const unlikeImage = (req, res, next) => {
    const { auth0Id } = req.params;
    const { imageId } = req.body;
    userProfile_1.default.findOneAndUpdate({ auth0Id: auth0Id }, { $pull: { likedImages: { imageId: imageId } } }, { new: true })
        .then(user => user ? res.status(200).json({ message: "image removed successfully" }) : res.status(404).json({ message: 'not found' }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { readUserProfile, likeImage, unlikeImage, createUserProfile };
