"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const UserProfile_1 = __importDefault(require("../controllers/UserProfile"));
const router = express_1.default.Router();
router.post('/user/create/:auth0Id', UserProfile_1.default.createUserProfile);
router.get('/get/:auth0Id', UserProfile_1.default.readUserProfile);
router.patch('/like/:auth0Id', UserProfile_1.default.likeImage);
router.patch('/unlike/:auth0Id', UserProfile_1.default.unlikeImage);
module.exports = router;
