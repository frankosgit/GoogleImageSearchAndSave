import express from 'express';
import controller from '../controllers/UserProfile'

const router = express.Router()
router.post('/create/:auth0Id', controller.createUserProfile);
router.get('/get/:auth0Id', controller.readUserProfile);
router.patch('/like/:auth0Id', controller.likeImage);
router.patch('/unlike/:auth0Id', controller.unlikeImage);

export = router;