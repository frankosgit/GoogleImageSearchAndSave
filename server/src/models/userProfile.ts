import mongoose, { Document, Schema } from 'mongoose'

export interface IUserProfile {
    auth0Id: string,
    likedImages?:
    { imageId: string, imageURL: string }[];

}

export interface IUserProfileModel extends IUserProfile, Document { }

const UserProfileSchema: Schema = new Schema(
    {
        auth0Id: { type: String, required: true },
        likedImages: [{
            imageId: { type: String, required: false },
            imageURL: { type: String, required: false }
        }]
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema)