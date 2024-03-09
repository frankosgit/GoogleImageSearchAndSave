import express from 'express';
import controller from '../controllers/UserProfile'
import { Schemas, ValidateSchema } from '../middleware/validateschema';
import { Schema } from 'mongoose';

const router = express.Router()
router.post('/create/:auth0Id', ValidateSchema(Schemas.userProfile.create), controller.createUserProfile);
router.get('/get/:auth0Id', controller.readUserProfile);
router.patch('/like/:auth0Id', ValidateSchema(Schemas.userProfile.update), controller.likeImage);
router.patch('/unlike/:auth0Id', ValidateSchema(Schemas.userProfile.update), controller.unlikeImage);

export = router;