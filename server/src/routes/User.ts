import express from 'express';
import controller from '../controllers/UserProfile'
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import { Schema } from 'mongoose';

const router = express.Router()
router.post('/create', ValidateSchema(Schemas.userProfile.create), controller.createUserProfile);
router.get('/read/:auth0Id', controller.readUserProfile);
router.post('/like/', ValidateSchema(Schemas.userProfile.update), controller.likeImage);
router.post('/unlike/', ValidateSchema(Schemas.userProfile.unlike), controller.unlikeImage);

export = router;
